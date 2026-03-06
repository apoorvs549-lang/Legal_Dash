import * as authController from '../controllers/auth-controller.js';
import { authenticate } from '../middleware/auth-middleware.js';

async function AuthRoutes(fastify) {
    fastify.post('/signup', authController.signup);
    fastify.post('/login', authController.login);
    fastify.post('/logout', { preHandler: [authenticate] }, authController.logout);

    // Protected route – requires a valid token cookie
    fastify.get('/me', { preHandler: [authenticate] }, authController.me);
}

export default AuthRoutes;
