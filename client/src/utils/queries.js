import { gql } from '@apollo/client';

export const QUERY_EXERCISE = gql`
  query getExercises($category: ID) {
    exercises(category: $category) {
      _id
      name
      description
      quantity
      image
      demo
      mgroup
      category {
        _id
      }
    }
  }
`;

export const QUERY_CHECKOUT = gql`
  query getCheckout($exercises: [ID]!) {
    checkout(exercises: $exercises) {
      session
    }
  }
`;

export const QUERY_ALL_EXERCISE = gql`
  {
    exercises {
      _id
      name
      description
      quantity
      sets
      weight
      category {
        name
      }
    }
  }
`;

export const QUERY_CATEGORIES = gql`
  {
    categories {
      _id
      name
    }
  }
`;

export const QUERY_USER = gql`
  {
    user {
      firstName
      lastName
      orders {
        _id
        purchaseDate
        exercises {
          _id
          name
          description
          sets
          weight
          quantity
          image
          demo
          mgroup
        }
      }
    }
  }
`;
