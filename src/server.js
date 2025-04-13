import dotenv from 'dotenv';
dotenv.config();
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
    await fastify.listen({ 
      port: process.env.PORT ? Number(process.env.PORT) : 5000,
      host: '0.0.0.0' 
    });
    console.log(`Servidor rodando!`);    
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }

}

startServer();
