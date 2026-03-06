import * as documentController from '../controllers/document-controller.js';

async function DocumentRoutes(fastify) {
    fastify.post('/upload', documentController.uploadDocument);
    fastify.get('/', documentController.getAllDocuments);
    fastify.get('/:id', documentController.getDocumentById);
}

export default DocumentRoutes;