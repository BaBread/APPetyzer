// import { useQuery } from '@apollo/client';
import { gql } from "@apollo/client";

// LOGIN_USER
export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// ADD_USER
export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// ADD FAVORITE RECIPE
export const ADD_RECIPE = gql`
  mutation addRecipe($idMeal: String!) {
    addRecipe(idMeal: $idMeal) {
      _id
    }
  }
`;

// DELETE FAVORITE RECIPE
export const DELETE_RECIPE = gql`
  mutation DeleteRecipe($idMeal: ID!) {
    deleteRecipe(idMeal: $idMeal) {
      favorites
      _id
    }
  }
`;
