import * as auditController from '../controllers/audit-controller.js';
import { authenticate } from '../middleware/auth-middleware.js';
import { requireRole } from '../middleware/role-middleware.js';

export default async function auditRoutes(fastify) {
  fastify.get('/audit-logs', { preHandler: [authenticate, requireRole(['admin', 'lawyer'])] }, auditController.getAuditLogs);
  fastify.post('/audit-logs', { preHandler: [authenticate, requireRole(['admin', 'lawyer'])] }, auditController.createAuditLog);
  fastify.get('/dashboard/stats', auditController.getDashboardStats);
}