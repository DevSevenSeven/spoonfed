// RecipeList.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
const RecipeList = ({ recipes }) => {
    const navigate = useNavigate();
    const handleRecipeClick = (recipeId) => {
        navigate(`/recipe/${recipeId}`);
    };
    if (recipes.length === 0) {
        return (<div className="text-center p-4">
        No recipes found.
      </div>);
    }
    return (<div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {recipes.map((recipe) => (<div className="col" key={recipe.id}>
          <div onClick={() => handleRecipeClick(recipe.id)} className="card h-100 shadow-sm" style={{ cursor: 'pointer' }}>
            {recipe.imageUrl && (<img src={recipe.imageUrl} alt={recipe.title} className="card-img-top" style={{ height: '200px', objectFit: 'cover' }}/>)}
            <div className="card-body">
              <h3 className="card-title h5 fw-bold">{recipe.title}</h3>
              <p className="card-text text-muted">
                {recipe.ingredients.slice(0, 3).join(', ')}
                {recipe.ingredients.length > 3 ? '...' : ''}
              </p>
            </div>
          </div>
        </div>))}
    </div>);
};
export default RecipeList;
