import { gql } from "@apollo/client";

export const GET_REPOSITORIES = gql`
  query (
    $orderBy: AllRepositoriesOrderBy!
    $orderDirection: OrderDirection!
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          id
          name
          ownerAvatarUrl
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          url
        }
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query getAuthorizedUser($includeReviews: Boolean = false) {
    authorizedUser {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            text
            rating
            createdAt
            repository {
              fullName
            }
          }
          # cursor
        }
        # pageInfo {
        # page info fields...
        #  }
      }
    }
  }
`;

export const GET_REPOSITORY = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      name
      ownerAvatarUrl
      description
      language
      stargazersCount
      forksCount
      reviewCount
      ratingAverage
      url
    }
  }
`;

export const GET_REVIEWS = gql`
  query ($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

export const CREATE_REVIEW = gql`
  mutation ($review: CreateReviewInput!) {
    createReview(review: $review) {
      user {
        username
      }
      repositoryId
    }
  }
`;

export const CREATE_USER = gql`
  mutation ($user: CreateUserInput!) {
    createUser(user: $user) {
      id
      username
    }
  }
`;
