import { gql, ApolloServer } from 'apollo-server-micro';
import Cors from 'micro-cors';

const cors = Cors();

const typeDefs = gql`
  type User {
    id: ID!
  }

  type Query {
    getUser: User
  }
`;

const resolvers = {
  Query: {
    getUser: () => ({ id: '1' }),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startServer = server.start();

export default cors(async (req, res) => {
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
