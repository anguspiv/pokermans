import { ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';
import { RequestHandler } from 'micro';
import { withSentry } from '@sentry/nextjs';
import { createContext } from '@graphql/context';
import schema from '../../schema';

const cors = Cors();

const server = new ApolloServer({
  schema,
  context: createContext,
});

const startServer = server.start();

let apolloHandler: RequestHandler;

const getHandler = async () => {
  if (!apolloHandler) {
    await startServer;

    apolloHandler = server.createHandler({
      path: '/api/graphql',
    });
  }

  return apolloHandler;
};

const graphql = cors(async (req, res) => {
  const handler = await getHandler();

  if (req.method === 'OPTIONS') {
    res.end();
    return null;
  }

  return handler(req, res);
});

export const config = {
  api: {
    bodyParser: false,
  },
};

export default withSentry(graphql);
