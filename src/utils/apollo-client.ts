import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { createUploadLink } from 'apollo-upload-client';
import { getSession } from 'next-auth/react';
import { ContextSetter, setContext } from '@apollo/client/link/context';
import { AuthSession } from '../../pages/api/auth/[...nextauth]';

const uri = `/api/graphql`;

const httpLink = createUploadLink({ uri, credentials: 'include' });

const contextSetter: ContextSetter = async (operation, { headers }) => {
  const session = (await getSession()) as AuthSession;

  const modifiedHeader = {
    headers: {
      ...headers,
      authorization: session?.accessToken ? `Bearer ${session.accessToken}` : '',
    },
  };

  return modifiedHeader;
};

const authLink = setContext(contextSetter);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: from([authLink, httpLink]),
});

export default client;
