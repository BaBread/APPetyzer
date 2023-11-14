import { gql } from '@apollo/client';

// QUERY USER 
export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      favorites {
        _id
        AddedAt
      }
    }
  }
`;

// GET All RECIPES 
export const QUERY_FAVORITE_RECIPES = gql`
  query getFavoriteRecipes($recipeIds: [ID]!) {
    favoriteRecipes(filter: { _id: { $in: $recipeIds } }) {
      _id
    }
  }
`;

