import { gql } from '@apollo/client';

export const GET_PROFILE = gql`
  query GetProfile($input: ProfileInput) {
    profile(input: $input) {
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

export const SEARCH_PLAYERS = gql`
  query SearchPlayers($searchTerm: String, $sort: String) {
    profiles(searchTerm: $searchTerm, sort: $sort) {
      id
      firstName
      nickname
      lastName
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
  SEARCH_PLAYERS,
};
