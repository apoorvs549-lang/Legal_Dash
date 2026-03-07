import * as assignedCaseController from '../controllers/assigned-case-controller.js';

async function ActivityFeedRoutes(fastify) {
    fastify.post('/', assignedCaseController.createAssignedCase);
    fastify.get('/', assignedCaseController.getAllAssignedCases);
    fastify.get('/:id', assignedCaseController.getAssignedCaseById);
    fastify.delete('/:id', assignedCaseController.deleteAssignedCase);
}

export default ActivityFeedRoutes;
