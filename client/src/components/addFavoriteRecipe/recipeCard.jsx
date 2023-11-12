/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { useMutation } from '@apollo/client';
import { ADD_FAVORITE_RECIPE } from '../../utils/mutations';

export function RecipeCard({ recipe }) {
  const userId = 'yourUserId'; // Replace with the actual user ID
  const recipeId = recipe.id;

  const [addFavoriteRecipe, { loading }] = useMutation(ADD_FAVORITE_RECIPE);

  const handleFavoriteClick = () => {
    addFavoriteRecipe({
      variables: { userId, recipeId },
    })
      .then((response) => {
        const { success, message, favoriteRecipe } = response.data.addFavoriteRecipe;
        if (success) {
          console.log(`Recipe "${favoriteRecipe.name}" added to favorites!`);
        } else {
          console.error(`Error adding recipe to favorites: ${message}`);
        }
      })
      .catch((error) => {
        console.error('Error adding recipe to favorites:', error);
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
        <button onClick={handleFavoriteClick} disabled={loading}>
          {loading ? 'Adding to Favorites...' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}


// const RecipeCard = ({ recipeId, userId, name}) => {
//   const [addFavoriteRecipe, { loading }] = useMutation(ADD_FAVORITE_RECIPE);
//   const handleFavoriteClick = () => {
//     addFavoriteRecipe({
//       variables: { userId, recipeId },
//     })
//       .then((response) => {
//         const { success, message, favoriteRecipe } = response.data.addFavoriteRecipe;
//         if (success) {
//           console.log(`Recipe "${favoriteRecipe.name}" added to favorites!`);
        
//         } else {
//           console.error(`Error adding recipe to favorites: ${message}`);
//         }
//       })
//       .catch((error) => {
//         console.error('Error adding recipe to favorites:', error);
//       });
//   };
//   return (
//     <div>
//       <h3>{name}</h3>
//       <button onClick={handleFavoriteClick} disabled={loading}>
//         {loading ? 'Adding to Favorites...' : 'Add to Favorites'}
//       </button>
//     </div>
//   );
// };
// export default RecipeCard;