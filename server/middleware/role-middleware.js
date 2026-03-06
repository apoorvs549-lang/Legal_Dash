/**
 * Factory that returns a Fastify preHandler.
 * Usage:  { preHandler: [authenticate, requireRole(['admin', 'lawyer'])] }
 *
 * @param {string[]} allowedRoles – roles that may access the route
 */
export function requireRole(allowedRoles) {
    return async function (request, reply) {
        const userRole = request.user?.role;

        if (!userRole || !allowedRoles.includes(userRole)) {
            return reply.code(403).send({
                success: false,
                message: 'Access denied – insufficient permissions',
            });
        }
    };
}
