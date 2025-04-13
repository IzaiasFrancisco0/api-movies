import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const filmesRouter = async (fastify, options) => {

  fastify.post('/filme', async (request, reply) => {
    const { image, name, description } = request.body;

    if (!image || image.trim() === '') {
      reply.status(400).send({ error: "A URL da imagem é obrigatória" });
      return;
    }

    if (!name || name.trim() === '') {
      reply.status(400).send({ error: "O nome do filme é obrigatório" });
      return;
    }

    if (!description || description.trim() === '') {
      reply.status(400).send({ error: "A descrição do filme é obrigatória" });
      return;
    }

    try {
      const filme = await prisma.filme.create({
        data: { image, name, description },
      });
      reply.send(filme);
    } catch (err) {
      reply.status(500).send(err);
    }
  });

  fastify.get('/filmes', async (request, reply) => {
    try {
      const filmes = await prisma.filme.findMany();
      reply.send(filmes);
    } catch (err) {
      reply.status(500).send({ error: 'Erro ao recuperar filmes', details: err });
    }
  });

  fastify.delete('/filme/:id', async (request, reply) => {
    const { id } = request.params;

    try {
      const deleteMovie = await prisma.filme.delete({
        where: { id },
      });

      reply.status(200).send({ message: 'Filme deletado com sucesso!!', deleteMovie });
    } catch (err) {
      reply.status(500).send({ error: 'Erro ao deletar o filme', detail: err });
    }
  });
};

export default filmesRouter;
