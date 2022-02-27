import { ApolloClient } from '@apollo/client';
import client from './apollo-client';

describe('apollo-client', () => {
  it('should be an ApolloClient', () => {
    expect.assertions(1);
    expect(client).toBeInstanceOf(ApolloClient);
  });
});
