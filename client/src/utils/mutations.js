import { gql } from '@apollo/client';

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
// export const ADD_RECIPE = gql`
//   mutation addRecipe($recipeId: ID!) {
//     addRecipe(favoriteRecipeId: $_id) {
//       _id   
//     }
//   }
// `;


// DELETE FAVORITE RECIPE
// export const DELETE_RECIPE = gql`
//   mutation deleteRecipe($recipeId: ID!) {
//     deleteRecipe(recipeId: $recipeId) {
//       success
//       message
//     }
//   }
// `;


// UPDATE FAVORITE RECIPE 
// export const UPDATE_RECIPE = gql`
//   mutation updateRecipe($recipeId: ID!, $name: String, $ingredients: [String], $instructions: String) {
//     updateRecipe(recipeId: $recipeId, name: $name, ingredients: $ingredients, instructions: $instructions) {
//       _id
//       name
//       ingredients
//       instructions
//     }
//   }
// `;

export const ADD_THOUGHT = gql`
  mutation addThought($thoughtText: String!, $thoughtAuthor: String!) {
    addThought(thoughtText: $thoughtText, thoughtAuthor: $thoughtAuthor) {
      _id
      thoughtText
      thoughtAuthor
      createdAt
      comments {
        _id
        commentText
      }
    }
  }
`;


export const ADD_COMMENT = gql`
  mutation addComment(
    $thoughtId: ID!
    $commentText: String!
    $commentAuthor: String!
  ) {
    addComment(
      thoughtId: $thoughtId
      commentText: $commentText
      commentAuthor: $commentAuthor
    ) {
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
