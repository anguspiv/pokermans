import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      userId
      firstName
      lastName
      nickname
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      id
    }
  }
`;

export default {
  GET_PROFILE,
  UPDATE_PROFILE,
};
