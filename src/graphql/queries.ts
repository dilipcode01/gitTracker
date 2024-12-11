import { gql } from "@apollo/client"; 

export const GET_REPOSITORIES = gql`
  query GetRepositories {
    getRepositories {
      id
      name
      description
      releaseDate, 
      latestRelease, 
      unseenUpdates
    }
  }
`;
