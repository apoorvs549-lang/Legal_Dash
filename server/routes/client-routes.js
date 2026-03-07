import * as clientController from '../controllers/client-controller.js';

async function ClientRoutes(fastify) {
    fastify.post('/', clientController.createClient);
    fastify.get('/', clientController.getAllClients);
    fastify.get('/:id', clientController.getClientById);
    fastify.put('/:id/take', clientController.takeClientCase);
}

export default ClientRoutes;
