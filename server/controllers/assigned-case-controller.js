import * as assignedCaseService from '../services/assigned-case-service.js';

/**
 * POST /api/v1/cases
 * Body: { name, caseType, status }
 */
export async function createAssignedCase(request, reply) {
    try {
        const { name, caseType, status } = request.body;

        if (!name || !caseType || !status) {
            return reply.code(400).send({
                success: false,
                message: 'name, caseType, and status are required',
            });
        }

        const newCase = await assignedCaseService.createAssignedCase({ name, caseType, status });

        return reply.code(201).send({
            success: true,
            message: 'Case created successfully',
            data: newCase,
        });
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to create case',
            error: error.message,
        });
    }
}

/**
 * GET /api/v1/cases
 */
export async function getAllAssignedCases(request, reply) {
    try {
        const cases = await assignedCaseService.getAllAssignedCases();
        return reply.send({
            success: true,
            count: cases.length,
            data: cases,
        });
    } catch (error) {
        request.log.error(error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch cases',
            error: error.message,
        });
    }
}

/**
 * GET /api/v1/cases/:id
 */
export async function getAssignedCaseById(request, reply) {
    try {
        const { id } = request.params;
        const foundCase = await assignedCaseService.getAssignedCaseById(id);
        return reply.send({
            success: true,
            data: foundCase,
        });
    } catch (error) {
        if (error.message.includes('not found')) {
            return reply.code(404).send({
                success: false,
                message: error.message,
            });
        }
        request.log.error(error);
        return reply.code(500).send({
            success: false,
            message: 'Failed to fetch case',
            error: error.message,
        });
    }
}
