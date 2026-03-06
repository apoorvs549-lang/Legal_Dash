import { verifyToken } from '../services/auth-service.js';

/**
 * Fastify preHandler hook – checks for a valid JWT in the `token` cookie.
 * Attaches `request.user` ({ id, email }) on success.
 */
export async function authenticate(request, reply) {
    try {
        const token = request.cookies?.token;

        if (!token) {
            return reply.code(401).send({
                success: false,
                message: 'Not authenticated – please log in',
            });
        }

        const decoded = verifyToken(token);
        request.user = { id: decoded.id, email: decoded.email, role: decoded.role };
    } catch (err) {
        return reply.code(401).send({
            success: false,
            message: 'Invalid or expired token – please log in again',
        });
    }
}
