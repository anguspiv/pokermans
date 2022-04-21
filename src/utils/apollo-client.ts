import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';

const client = new ApolloClient({
  uri: '/api/graphql',
  cache: new InMemoryCache(),
  link: createUploadLink({
    uri: '/api/graphql',
  }),
});

export default client;
