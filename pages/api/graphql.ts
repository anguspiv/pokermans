import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { schema } from '../../src/graphql/schema';
import { createContext } from '../../src/graphql/context';
import { prisma } from '../../src/db/prisma';

const cors = Cors();

const server = new ApolloServer({
  schema,
  context: () => createContext(prisma),
});

const startServer = server.start();

const graphql = cors(async (req, res) => {
  if (req.method === 'OPTIONS') {
    res.end();
    return;
  }

  await startServer;
  await server.createHandler({
    path: '/api/graphql',
  })(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default graphql;
