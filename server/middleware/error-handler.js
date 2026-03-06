

export default async function ErrorHandler(fastify) {
  fastify.setErrorHandler((error, request, reply) => {
    const statusCode = error.statusCode || 500;
    request.log.error(error);
    reply.code(statusCode).send({
      error: error.message || 'Internal Server Error',
      statusCode,
    });
  });
}