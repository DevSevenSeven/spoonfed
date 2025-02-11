import React, { useState, ChangeEvent, FormEvent } from 'react';
import RecipeCard from '../components/Recipecard';
import { searchRecipes } from '../services/RecipeService';
import { Recipe } from '../interfaces/recipe';

const availableIngredients = [
  'Chicken', 'Rice', 'Tomatoes', 'Onions', 'Garlic',
  'Bell Peppers', 'Pasta', 'Ground Beef', 'Potatoes',
  'Carrots', 'Apples',
];

const Dashboard: React.FC = () => {
  const [currentIngredient, setCurrentIngredient] = useState<string>('');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleIngredientChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCurrentIngredient(e.target.value);
  };

  const handleAddIngredient = (e: FormEvent) => {
    e.preventDefault();
    if (currentIngredient.trim() && !selectedIngredients.includes(currentIngredient.trim())) {
      setSelectedIngredients([...selectedIngredients, currentIngredient.trim()]);
      setCurrentIngredient('');
    }
  };

  const handleRemoveIngredient = (ingredientToRemove: string) => {
    setSelectedIngredients(selectedIngredients.filter(ing => ing !== ingredientToRemove));
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const recipesData = await searchRecipes(selectedIngredients);
      setRecipes(recipesData);
    } catch (error) {
      console.error('Failed to search recipes:', error);
      setError('Failed to search recipes');
      setRecipes([]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      const userId = localStorage.getItem('userId');
      const token = localStorage.getItem('token');
  
      if (!userId) {
        setError('Please log in to save recipes');
        return;
      }
  
      // Determine food group
      const recipeWithFoodGroup = {
        ...recipe,
        foodGroup: determineFoodGroup(recipe.ingredients)
      };
  
      // API call to save recipe to user profile
      const response = await fetch('/api/user/save-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId,
          recipe: recipeWithFoodGroup
        })
      });
  
      const responseData = await response.json();
  
      if (!response.ok) {
        throw new Error(responseData.message || 'Failed to save recipe');
      }
  
      // Success handling
      setError('Recipe saved successfully!');
      setTimeout(() => setError(null), 2000);
  
    } catch (error) {
      console.error('Failed to save recipe:', error);
      setError(error instanceof Error ? error.message : 'Failed to save recipe');
      setTimeout(() => setError(null), 2000);
    }
  };

  const determineFoodGroup = (ingredients: string[]): string => {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-primary-teal">Recipe Search</h1>
      
      {error && (
        <div className={`mb-4 p-4 rounded-lg ${
          error.includes('successfully') 
            ? 'bg-green-100 text-green-800' 
            : 'bg-red-100 text-red-800'
        }`}>
          <p>{error}</p>
        </div>
      )}

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4 text-primary-teal">Add Ingredients:</h2>
        <form onSubmit={handleAddIngredient} className="mb-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={currentIngredient}
              onChange={handleIngredientChange}
              placeholder="Enter an ingredient"
              className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-teal"
              list="ingredients-list"
            />
            <datalist id="ingredients-list">
              {availableIngredients.map((ingredient) => (
                <option key={ingredient} value={ingredient} />
              ))}
            </datalist>
            <button
              type="submit"
              className="button"
            >
              Add
            </button>
          </div>
        </form>

        {selectedIngredients.length > 0 && (
          <div className="mt-4">
            <h2 className="text-xl font-semibold mb-2 text-primary-teal">Selected Ingredients:</h2>
            <div className="flex flex-wrap gap-2">
              {selectedIngredients.map((ingredient, index) => (
                <span
                  key={index}
                  className="ingredient-tag"
                >
                  {ingredient}
                  <button
                    onClick={() => handleRemoveIngredient(ingredient)}
                    className="ml-2 focus:outline-none"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>

            <button
              onClick={handleSearch}
              className="button mt-4"
            >
              Search Recipes
            </button>
          </div>
        )}
      </div>

      {isLoading ? (
        <div className="flex justify-center">
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="recipe-grid">
          {recipes.slice(0, 6).map((recipe) => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe}
              recipeId={recipe.id}
              onSave={() => handleSaveRecipe(recipe)}
              onDelete={() => {}}  // Not needed in search view
              isSaved={false}
              showSaveDelete={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;