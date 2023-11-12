/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */

import React from 'react';
import { useMutation } from '@apollo/client';
import { DELETE_RECIPE } from '../../utils/mutations'; // Import the path to your mutation

export function RecipeCard({ recipe }) {
  const userId = ''; // Replace with the actual user ID
  const recipeId = recipe.id;

  const [deleteRecipe, { loading }] = useMutation(DELETE_RECIPE);

  const handleDeleteClick = () => {
    deleteRecipe({
      variables: { recipeId },
    })
      .then((response) => {
        const { success, message } = response.data.deleteRecipe;
        if (success) {
          console.log(`Recipe with ID "${recipeId}" deleted successfully.`);
        } else {
          console.error(`Error deleting recipe: ${message}`);
        }
      })
      .catch((error) => {
        console.error('Error deleting recipe:', error);
      });
  };

  return (
    <div>
      <h2>{recipe.title}</h2>
      <ul>
        {recipe.ingredients.map((ingredient, index) => (
          <li key={index}>{ingredient}</li>
        ))}
      </ul>
      <p>{recipe.instructions}</p>
      <div>
        <button onClick={handleDeleteClick} disabled={loading}>
          {loading ? 'Deleting Recipe...' : 'Delete Recipe'}
        </button>
      </div>
    </div>
  );
}



// import React from 'react';
// import { useMutation } from '@apollo/client';
// import { DELETE_RECIPE } from '../../utils/mutations'; // Import your GraphQL mutation query

// export function DeleteRecipeButton({ userId, recipeId }) {
//   const [deleteRecipe, { loading }] = useMutation(DELETE_RECIPE);

//   const handleDeleteClick = () => {
//     deleteRecipe({
//       variables: { recipeId },
//     })
//       .then((response) => {
//         const { success, message } = response.data.deleteRecipe;
//         if (success) {
//           console.log(`Recipe with ID "${recipeId}" deleted successfully.`);
//         } else {
//           console.error(`Error deleting recipe: ${message}`);
//         }
//       })
//       .catch((error) => {
//         console.error('Error deleting recipe:', error);
//       });
//   };
//   return (
//     <div>
//       <button onClick={handleDeleteClick} disabled={loading}>
//         {loading ? 'Deleting Recipe...' : 'Delete Recipe'}
//       </button>
//     </div>
//   );
// }





