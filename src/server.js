import Fastify from 'fastify';
import cors from '@fastify/cors';
import helmet from '@fastify/helmet';
import filmesRouter from './routes/filmesRouter.js';

async function startServer() {
  const fastify = Fastify({ logger: true });

  await fastify.register(cors);
  await fastify.register(helmet);

  fastify.register(filmesRouter);

  try {
    await fastify.listen({ port: 5000 });
    console.log(`Servidor rodando em http://localhost:5000`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

}

startServer();
