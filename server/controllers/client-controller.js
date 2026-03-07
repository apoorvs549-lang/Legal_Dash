import { z } from 'zod';
import * as clientService from '../services/client-service.js';

const createClientSchema = z.object({
    name: z.string().min(1, 'Client name is required').max(255),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    phone: z.string().optional(),
    dob: z.string().optional(),
    address: z.string().optional(),
    caseType: z.enum([
        'Personal Injury', 'Family Law', 'Criminal Defense', 'Employment Law',
        'Real Estate', 'Estate Planning', 'Business Litigation', 'Immigration', 'Other',
    ], { errorMap: () => ({ message: 'Invalid case type' }) }),
    caseDescription: z.string().optional(),
    incidentDate: z.string().optional(),
    opposingParty: z.string().optional(),
    status: z.enum(['Active', 'Review', 'Closed']).default('Active'),
});

/**
 * POST /api/v1/clients
 */
export async function createClient(request, reply) {
    try {
        const parsed = createClientSchema.safeParse(request.body);
        if (!parsed.success) {
            return reply.code(400).send({
                success: false,
                message: 'Validation failed',
                errors: parsed.error.flatten().fieldErrors,
            });
        }

        const client = await clientService.createClient(parsed.data);

        return reply.code(201).send({
            success: true,
            message: 'Client created successfully',
            data: client,
        });
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to create client',
            error: error.message,
        });
    }
}

/**
 * GET /api/v1/clients
 */
export async function getAllClients(request, reply) {
    try {
        const clients = await clientService.getAllClients();
        return reply.send({
            success: true,
            count: clients.length,
            data: clients,
        });
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch clients',
            error: error.message,
        });
    }
}

/**
 * GET /api/v1/clients/:id
 */
export async function getClientById(request, reply) {
    try {
        const { id } = request.params;
        const client = await clientService.getClientById(id);
        return reply.send({ success: true, data: client });
    } catch (error) {
        if (error.message.includes('not found')) {
            return reply.code(404).send({ success: false, message: error.message });
        }
        request.log.error(error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch client',
            error: error.message,
        });
    }
}

/**
 * PUT /api/v1/clients/:id/take
 */
export async function takeClientCase(request, reply) {
    try {
        const { id } = request.params;
        const client = await clientService.takeClientCase(id);
        return reply.send({ success: true, message: 'Case taken successfully', data: client });
    } catch (error) {
        if (error.message.includes('not found')) {
            return reply.code(404).send({ success: false, message: error.message });
        }
        request.log.error(error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to take client case',
            error: error.message,
        });
    }
}
