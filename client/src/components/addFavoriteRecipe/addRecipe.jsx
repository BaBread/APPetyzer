/* eslint-disable react/jsx-no-undef */
/* eslint-disable react/prop-types */
export function RecipeCard({ recipe }) {
    const userId = 'yourUserId'; // Replace with the actual user ID
    const recipeId = recipe.id;
  
    return (
      <div>
        <h2>{recipe.title}</h2>
        <ul>
          {recipe.ingredients.map((ingredient, index) => (
            <li key={index}>{ingredient}</li>
          ))}
        </ul>
        <p>{recipe.instructions}</p>
        <AddToFavoriteButton userId={userId} recipeId={recipeId} />
      </div>
    );
  }
  
 