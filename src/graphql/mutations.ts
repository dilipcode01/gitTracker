import { gql } from "@apollo/client";


export const CREATE_REPOSITORY = gql`
  mutation addRepository($url: String!) {
    addRepository(url: $url) {
      name
      description
      latestRelease
    }
  }
`;

export const MARK_AS_SEEN = gql`
  mutation markAsSeen($id: ID!) {
    markAsSeen(id: $id) 
  }
`;