import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($username: String!) {
    user(username: $username) {
      _id
      username
      email
      thoughts {
        _id
        thoughtText
        AddedAt
      }
    }
  }
`;
// QUERY USER 
// export const QUERY_USER = gql`
//   query user($username: String!) {
//     user(username: $username) {
//       _id
//       username
//       email
//       favorites {
//         _id
//         AddedAt
//       }
//     }
//   }
// `;


export const QUERY_THOUGHTS = gql`
  query getThoughts {
    thoughts {
      _id
      thoughtText
      thoughtAuthor
      createdAt
    }
  }
`;

// GET All RECIPES 
// export const QUERY_FAVORITE_RECIPES = gql`
// query getFavoriteRecipes($recipeIds: [ID]!) {
//   favoriteRecipes(filter: { _id: { $in: $recipeIds } }) {
//     _id
//   }
// }
// `;


export const QUERY_SINGLE_THOUGHT = gql`
  query getSingleThought($thoughtId: ID!) {
    thought(thoughtId: $thoughtId) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
        createdAt
      }
    }
  }
`;
