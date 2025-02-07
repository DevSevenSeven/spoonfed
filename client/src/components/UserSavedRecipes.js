// components/UserSavedRecipes.tsx
import React, { useState, useEffect } from 'react';
import RecipeCard from './Recipecard';
const FOOD_GROUPS = [
    'All',
    'Vegetables',
    'Fruits',
    'Grains',
    'Protein',
    'Dairy',
    'Other'
];
const UserSavedRecipes = ({ userId }) => {
    const [savedRecipes, setSavedRecipes] = useState([]);
    const [selectedFoodGroup, setSelectedFoodGroup] = useState('All');
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        loadSavedRecipes();
    }, [userId]);
    const loadSavedRecipes = async () => {
        try {
            setIsLoading(true);
            // Get saved recipes from localStorage using userId
            const saved = localStorage.getItem(`savedRecipes_${userId}`);
            if (saved) {
                setSavedRecipes(JSON.parse(saved));
            }
            setIsLoading(false);
        }
        catch (error) {
            console.error('Failed to load saved recipes:', error);
            setError('Failed to load saved recipes');
            setIsLoading(false);
        }
    };
    const handleDeleteRecipe = async (recipeId) => {
        try {
            const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
            localStorage.setItem(`savedRecipes_${userId}`, JSON.stringify(updatedRecipes));
            setSavedRecipes(updatedRecipes);
        }
        catch (error) {
            console.error('Failed to delete recipe:', error);
            setError('Failed to delete recipe');
        }
    };
    const getFilteredRecipes = () => {
        if (selectedFoodGroup === 'All') {
            return savedRecipes;
        }
        return savedRecipes.filter(recipe => recipe.foodGroup === selectedFoodGroup);
    };
    if (isLoading) {
        return (<div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>);
    }
    return (<div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Saved Recipes</h2>
      
      {error && (<div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <p>{error}</p>
        </div>)}

      <div className="mb-6">
        <label htmlFor="foodGroup" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Food Group
        </label>
        <select id="foodGroup" value={selectedFoodGroup} onChange={(e) => setSelectedFoodGroup(e.target.value)} className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500">
          {FOOD_GROUPS.map((group) => (<option key={group} value={group}>{group}</option>))}
        </select>
      </div>

      {getFilteredRecipes().length === 0 ? (<p className="text-gray-500 text-center">No saved recipes found</p>) : (<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredRecipes().map((recipe) => (<RecipeCard key={recipe.id} recipe={recipe} recipeId={recipe.id} onSave={() => { }} onDelete={handleDeleteRecipe} isSaved={true} showSaveDelete={true}/>))}
        </div>)}
    </div>);
};
export default UserSavedRecipes;
