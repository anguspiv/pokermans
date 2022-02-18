import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { getToken } from 'next-auth/jwt';
import { schema } from '../../src/graphql/schema';
import { createContext } from '../../src/graphql/context';

const secret = process.env.NEXTAUTH_SECRET;

const cors = Cors();

const server = new ApolloServer({
  schema,
  context: createContext,
});

const startServer = server.start();

let apolloHandler;

const getHandler = async () => {
  if (!apolloHandler) {
    await startServer;

    apolloHandler = server.createHandler({
      path: '/api/graphql',
    });
  }

  return apolloHandler;
};

const graphql = async (req, res) => {
  const handler = await getHandler();

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return null;
  }

  const token = getToken({ req, secret });

  if (!token) {
    res.status(401).send('unauthorized');
    return null;
  }

  return handler(req, res);
};

export const config = {
  api: {
    bodyParser: false,
  },
};

export default cors(graphql);
