import * as clientController from '../controllers/client-controller.js';

async function ClientRoutes(fastify) {
    fastify.post('/', clientController.createClient);
    fastify.get('/', clientController.getAllClients);
    fastify.get('/:id', clientController.getClientById);
}

export default ClientRoutes;
