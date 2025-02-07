import React, { useState, useEffect } from 'react';
const FOOD_GROUPS = [
    'Vegetables',
    'Fruits',
    'Grains',
    'Protein',
    'Dairy',
    'Other'
];
// SavedRecipes component
const SavedRecipes = ({ recipes, onDelete, onSelect, selectedFoodGroup }) => {
    const filteredRecipes = selectedFoodGroup === 'All'
        ? recipes
        : recipes.filter(recipe => recipe.foodGroup === selectedFoodGroup);
    return (<div className="border rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">Saved Recipes</h2>
      {filteredRecipes.length === 0 ? (<p className="text-gray-500">No saved recipes found</p>) : (<div className="grid grid-cols-1 gap-4">
          {filteredRecipes.map((recipe) => (<div key={recipe.id} className="border rounded p-4 flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{recipe.title}</h3>
                <p className="text-sm text-gray-600">Food Group: {recipe.foodGroup}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => onSelect(recipe)} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">
                  View
                </button>
                <button onClick={() => onDelete(recipe.id)} className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>))}
        </div>)}
    </div>);
};
// SingleRecipeView component
const SingleRecipeView = ({ recipe, onSave, isSaved }) => {
    return (<div className="max-w-2xl mx-auto">
      <div className="border rounded-lg p-6 shadow-lg">
        {recipe.imageUrl && (<img src={recipe.imageUrl} alt={recipe.title} className="w-full h-64 object-cover rounded-lg mb-6"/>)}
        <h2 className="text-2xl font-bold mb-4">{recipe.title}</h2>
        <p className="text-gray-600 mb-4">Food Group: {recipe.foodGroup}</p>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Ingredients:</h3>
          <ul className="list-disc pl-5">
            {recipe.ingredients.map((ingredient, index) => (<li key={index} className="mb-1">{ingredient}</li>))}
          </ul>
        </div>
        <div className="mb-6">
          <h3 className="text-lg font-semibold mb-2">Instructions:</h3>
          <p className="whitespace-pre-line">{recipe.instructions}</p>
        </div>
        <button onClick={onSave} disabled={isSaved} className={`w-full px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500
            ${isSaved
            ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
            : 'bg-green-500 text-white hover:bg-green-600'}`}>
          {isSaved ? 'Recipe Saved' : 'Save Recipe'}
        </button>
      </div>
    </div>);
};
// Main RecipeSearch component
const RecipeSearch = () => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [error, setError] = useState(null);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [showSaved, setShowSaved] = useState(false);
    const [selectedFoodGroup, setSelectedFoodGroup] = useState('All');
    // Load saved recipes on component mount
    useEffect(() => {
        const loadSavedRecipes = () => {
            try {
                const saved = localStorage.getItem('savedRecipes');
                if (saved) {
                    setSavedRecipes(JSON.parse(saved));
                }
            }
            catch (error) {
                console.error('Failed to load saved recipes:', error);
                setError('Failed to load saved recipes');
            }
        };
        loadSavedRecipes();
    }, []);
    const handleSave = () => {
        if (currentRecipe) {
            try {
                const updatedRecipes = [...savedRecipes, currentRecipe];
                localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
                setSavedRecipes(updatedRecipes);
                setError(null);
            }
            catch (error) {
                console.error('Failed to save recipe:', error);
                setError('Failed to save recipe');
            }
        }
    };
    const handleDelete = (recipeId) => {
        try {
            const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
            localStorage.setItem('savedRecipes', JSON.stringify(updatedRecipes));
            setSavedRecipes(updatedRecipes);
            setError(null);
        }
        catch (error) {
            console.error('Failed to delete recipe:', error);
            setError('Failed to delete recipe');
        }
    };
    return (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Spoon Fed</h1>
      
      {error && (<div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <p>{error}</p>
        </div>)}

      <div className="flex gap-4 mb-8">
        <button onClick={() => setShowSaved(false)} className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
            ${!showSaved ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Search Recipes
        </button>
        <button onClick={() => setShowSaved(true)} className={`flex-1 px-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500
            ${showSaved ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'}`}>
          Saved Recipes
        </button>
      </div>

      {showSaved ? (<div>
          <div className="mb-4">
            <label htmlFor="foodGroup" className="block text-sm font-medium text-gray-700 mb-2">
              Filter by Food Group
            </label>
            <select id="foodGroup" value={selectedFoodGroup} onChange={(e) => setSelectedFoodGroup(e.target.value)} className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
              <option value="All">All Food Groups</option>
              {FOOD_GROUPS.map((group) => (<option key={group} value={group}>{group}</option>))}
            </select>
          </div>
          <SavedRecipes recipes={savedRecipes} onDelete={handleDelete} onSelect={setCurrentRecipe} selectedFoodGroup={selectedFoodGroup}/>
        </div>) : currentRecipe ? (<SingleRecipeView recipe={currentRecipe} onSave={handleSave} isSaved={savedRecipes.some(r => r.id === currentRecipe.id)}/>) : (<div className="text-center text-gray-600">
          Use the search bar above to find recipes
        </div>)}
    </div>);
};
export default RecipeSearch;
