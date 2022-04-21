import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query GetProfile {
    profile {
      id
      userId
      firstName
      lastName
      nickname
      bio
      avatar {
        filename
        filepath
        title
        description
      }
    }
  }
`;

export const UPDATE_PROFILE = gql`
  mutation UpdateProfile($input: ProfileInput!) {
    updateProfile(input: $input) {
      id
      userId
      firstName
      lastName
      nickname
      bio
      avatar {
        filename
        filepath
        title
        description
      }
    }
  }
`;

export default {
  GET_PROFILE,
  UPDATE_PROFILE,
};
