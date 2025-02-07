import React, { useState } from 'react';
import RecipeCard from '../components/Recipecard';
import { searchRecipes } from '../services/RecipeService';
const availableIngredients = [
    'Chicken', 'Rice', 'Tomatoes', 'Onions', 'Garlic',
    'Bell Peppers', 'Pasta', 'Ground Beef', 'Potatoes',
    'Carrots', 'Apples',
];
const Dashboard = () => {
    const [currentIngredient, setCurrentIngredient] = useState('');
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [recipes, setRecipes] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const handleIngredientChange = (e) => {
        setCurrentIngredient(e.target.value);
    };
    const handleAddIngredient = (e) => {
        e.preventDefault();
        if (currentIngredient.trim() && !selectedIngredients.includes(currentIngredient.trim())) {
            setSelectedIngredients([...selectedIngredients, currentIngredient.trim()]);
            setCurrentIngredient('');
        }
    };
    const handleRemoveIngredient = (ingredientToRemove) => {
        setSelectedIngredients(selectedIngredients.filter(ing => ing !== ingredientToRemove));
    };
    const handleSearch = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const recipesData = await searchRecipes(selectedIngredients);
            setRecipes(recipesData);
        }
        catch (error) {
            console.error('Failed to search recipes:', error);
            setError('Failed to search recipes');
            setRecipes([]);
        }
        finally {
            setIsLoading(false);
        }
    };
    const handleSaveRecipe = async (recipe) => {
        try {
            const userId = localStorage.getItem('userId');
            if (!userId) {
                setError('Please log in to save recipes');
                return;
            }
            const savedRecipes = JSON.parse(localStorage.getItem(`savedRecipes_${userId}`) || '[]');
            if (!savedRecipes.some((saved) => saved.id === recipe.id)) {
                const recipeWithFoodGroup = {
                    ...recipe,
                    foodGroup: determineFoodGroup(recipe.ingredients)
                };
                const updatedRecipes = [...savedRecipes, recipeWithFoodGroup];
                localStorage.setItem(`savedRecipes_${userId}`, JSON.stringify(updatedRecipes));
                setError('Recipe saved successfully!');
                setTimeout(() => setError(null), 2000);
            }
        }
        catch (error) {
            console.error('Failed to save recipe:', error);
            setError('Failed to save recipe');
        }
    };
    const determineFoodGroup = (ingredients) => {
        const lowerIngredients = ingredients.map(i => i.toLowerCase());
        if (lowerIngredients.some(i => ['chicken', 'beef', 'fish', 'pork', 'meat'].some(meat => i.includes(meat)))) {
            return 'Protein';
        }
        if (lowerIngredients.some(i => ['milk', 'cheese', 'yogurt', 'cream'].some(dairy => i.includes(dairy)))) {
            return 'Dairy';
        }
        if (lowerIngredients.some(i => ['apple', 'banana', 'orange', 'berry', 'fruit'].some(fruit => i.includes(fruit)))) {
            return 'Fruits';
        }
        if (lowerIngredients.some(i => ['carrot', 'broccoli', 'spinach', 'vegetable'].some(veg => i.includes(veg)))) {
            return 'Vegetables';
        }
        if (lowerIngredients.some(i => ['rice', 'pasta', 'bread', 'wheat', 'grain'].some(grain => i.includes(grain)))) {
            return 'Grains';
        }
        return 'Other';
    };
    return (<div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary-teal">Recipe Search</h1>
      
      {error && (<div className={`mb-4 p-4 rounded-lg ${error.includes('successfully')
                ? 'bg-green-100 text-green-800'
                : 'bg-red-100 text-red-800'}`}>
          <p>{error}</p>
        </div>)}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-primary-teal">Add Ingredients:</h2>
        <form onSubmit={handleAddIngredient} className="mb-4">
          <div className="flex gap-2">
            <input type="text" value={currentIngredient} onChange={handleIngredientChange} placeholder="Enter an ingredient" className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-teal" list="ingredients-list"/>
            <datalist id="ingredients-list">
              {availableIngredients.map((ingredient) => (<option key={ingredient} value={ingredient}/>))}
            </datalist>
            <button type="submit" className="button">
              Add
            </button>
          </div>
        </form>

        {selectedIngredients.length > 0 && (<div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-primary-teal">Selected Ingredients:</h2>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient, index) => (<span key={index} className="ingredient-tag">
                  {ingredient}
                  <button onClick={() => handleRemoveIngredient(ingredient)} className="ml-2 focus:outline-none">
                    ×
                  </button>
                </span>))}
            </div>

            <button onClick={handleSearch} className="button mt-4">
              Search Recipes
            </button>
          </div>)}
      </div>

      {isLoading ? (<div className="flex justify-center">
          <div className="loading-spinner"></div>
        </div>) : (<div className="recipe-grid">
          {recipes.map((recipe) => (<RecipeCard key={recipe.id} recipe={recipe} recipeId={recipe.id} onSave={() => handleSaveRecipe(recipe)} onDelete={() => { }} // Not needed in search view
             isSaved={false} showSaveDelete={true}/>))}
        </div>)}
    </div>);
};
export default Dashboard;
