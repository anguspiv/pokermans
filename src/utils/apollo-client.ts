import { ApolloClient, InMemoryCache } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { getBaseUrl } from '@utils/getBaseUrl';
import logger from '@utils/logger';

const BASE_URL = getBaseUrl();
const uri = `${BASE_URL}/api/graphql`;

logger.info(`Base URL: ${BASE_URL}\n GraphQL uri: ${uri}`);

const client = new ApolloClient({
  uri,
  cache: new InMemoryCache(),
  link: createUploadLink({ uri }),
});

export default client;
