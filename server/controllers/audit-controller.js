import { z } from 'zod';
import * as auditService from '../services/audit-service.js';

const querySchema = z.object({
    page: z.coerce.number().min(1).default(1),
    limit: z.coerce.number().min(1).max(100).default(20),
    lawyerId: z.string().uuid().optional(),
    clientId: z.string().uuid().optional(),
    caseType: z.enum(['CIVIL', 'CRIMINAL', 'CORPORATE', 'FAMILY', 'INTELLECTUAL_PROPERTY', 'REAL_ESTATE']).optional(),
    severity: z.enum(['INFO', 'WARNING', 'CRITICAL']).optional(),
    sortBy: z.string().optional(),
    order: z.enum(['ASC', 'DESC']).default('DESC'),
});

const createSchema = z.object({
    action: z.enum([
        'CREATE_CASE', 'UPDATE_CASE', 'CLOSE_CASE', 'REOPEN_CASE',
        'ADD_DOCUMENT', 'UPDATE_DOCUMENT', 'DELETE_DOCUMENT',
        'ADD_NOTE', 'UPDATE_NOTE', 'DELETE_NOTE',
        'ASSIGN_LAWYER', 'SCHEDULE_HEARING', 'FILE_MOTION',
    ]),
    severity: z.enum(['INFO', 'WARNING', 'CRITICAL']).default('INFO'),
    currentBottleneck: z.string().optional(),
    velocityScore: z.number().min(0).max(100),
    metadata: z.record(z.unknown()).optional(),
    lawyerId: z.string().uuid(),
    clientId: z.string().uuid(),
    caseId: z.string().uuid(),
});

export const getAuditLogs = async (request, reply) => {
    const parsed = querySchema.safeParse(request.query);
    if (!parsed.success) return reply.code(400).send({ error: 'Invalid query params', details: parsed.error.flatten() });

    const result = await auditService.getAuditLogs(parsed.data);
    return reply.send(result);
};

export const createAuditLog = async (request, reply) => {
    const parsed = createSchema.safeParse(request.body);
    if (!parsed.success) return reply.code(400).send({ error: 'Validation failed', details: parsed.error.flatten() });

    const log = await auditService.createAuditLog(parsed.data);
    return reply.code(201).send(log);
};

export const getDashboardStats = async (_request, reply) => {
    const stats = await auditService.getDashboardStats();
    return reply.send(stats);
};