import React, { useEffect, useState } from 'react';
const SavedRecipes = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    useEffect(() => {
        const saved = localStorage.getItem('savedRecipes');
        if (saved) {
            setSavedRecipes(JSON.parse(saved));
        }
    }, []);
    const handleClearRecipes = () => {
        localStorage.removeItem('savedRecipes');
        setSavedRecipes([]);
    };
    const handleRemoveRecipe = (id) => {
        const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== id);
        localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
        setSavedRecipes(updatedRecipes);
    };
    if (savedRecipes.length === 0) {
        return (<div className="text-center p-6">
        No recipes have been saved yet!
      </div>);
    }
    return (<div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Saved Recipes</h1>
        <button onClick={handleClearRecipes} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700">
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {savedRecipes.map(recipe => (<div key={recipe.id} className="bg-white rounded-lg shadow overflow-hidden border">
            <div className="relative h-48">
              <img src={recipe.image} alt={recipe.title} className="w-full h-full object-cover"/>
              <button onClick={() => handleRemoveRecipe(recipe.id)} className="absolute top-2 right-2 p-2 bg-red-100 text-red-600 rounded-full hover:bg-red-200" aria-label="Remove recipe">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"/>
                </svg>
              </button>
            </div>

            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">{recipe.title}</h2>
              <p className="text-gray-600 mb-4">{recipe.description}</p>
              
              <div className="space-y-2">
                {recipe.cookTime && (<p className="text-sm text-gray-600">
                    Cook time: {recipe.cookTime} minutes
                  </p>)}
                {recipe.servings && (<p className="text-sm text-gray-600">
                    Servings: {recipe.servings}
                  </p>)}
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold mb-2">Ingredients:</h3>
                <div className="flex flex-wrap gap-2">
                  {recipe.ingredients.map((ingredient, index) => (<span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                      {ingredient}
                    </span>))}
                </div>
              </div>
            </div>
          </div>))}
      </div>
    </div>);
};
export default SavedRecipes;
