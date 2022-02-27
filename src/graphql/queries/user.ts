import { gql } from '@apollo/client';

export const GET_USER = gql`
  query GetUser {
    user {
      id
      email
      name
      profile {
        id
        firstName
      }
    }
  }
`;

export default {
  GET_USER,
};
