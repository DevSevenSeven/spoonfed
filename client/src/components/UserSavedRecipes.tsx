import React, { useState, useEffect } from 'react';
import RecipeCard from './Recipecard';
import { Recipe } from '../interfaces/recipe';

const FOOD_GROUPS = [
  'All',
  'Vegetables',
  'Fruits',
  'Grains',
  'Protein',
  'Dairy',
  'Other'
] as const;

interface UserSavedRecipesProps {
  userId: string;
}

const UserSavedRecipes: React.FC<UserSavedRecipesProps> = ({ userId }) => {
  const [savedRecipes, setSavedRecipes] = useState<Recipe[]>([]);
  const [selectedFoodGroup, setSelectedFoodGroup] = useState<string>('All');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadSavedRecipes();
  }, [userId]);

  const loadSavedRecipes = async () => {
    try {
      setIsLoading(true);
      // First try to get recipes from API
      const response = await fetch(`/api/users/${userId}/saved-recipes`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch saved recipes');
      }

      const data = await response.json();
      setSavedRecipes(data);

      // Backup to localStorage
      localStorage.setItem(`savedRecipes_${userId}`, JSON.stringify(data));
      setIsLoading(false);
    } catch (error) {
      console.error('Failed to load saved recipes:', error);
      // Fallback to localStorage if API fails
      const saved = localStorage.getItem(`savedRecipes_${userId}`);
      if (saved) {
        setSavedRecipes(JSON.parse(saved));
      }
      setError('Failed to load saved recipes from server');
      setIsLoading(false);
    }
  };

  const handleSaveRecipe = async (recipe: Recipe) => {
    try {
      const response = await fetch(`/api/users/${userId}/saved-recipes`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ recipe })
      });

      if (!response.ok) {
        throw new Error('Failed to save recipe');
      }

      // Update local state
      const updatedRecipes = [...savedRecipes, recipe];
      setSavedRecipes(updatedRecipes);
      localStorage.setItem(`savedRecipes_${userId}`, JSON.stringify(updatedRecipes));
    } catch (error) {
      console.error('Failed to save recipe:', error);
      setError('Failed to save recipe');
    }
  };

  const handleDeleteRecipe = async (recipeId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/saved-recipes/${recipeId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (!response.ok) {
        throw new Error('Failed to delete recipe');
      }

      // Update local state
      const updatedRecipes = savedRecipes.filter(recipe => recipe.id !== recipeId);
      setSavedRecipes(updatedRecipes);
      localStorage.setItem(`savedRecipes_${userId}`, JSON.stringify(updatedRecipes));
    } catch (error) {
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
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">My Saved Recipes</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 text-red-800 rounded-lg">
          <p>{error}</p>
        </div>
      )}

      <div className="mb-6">
        <label htmlFor="foodGroup" className="block text-sm font-medium text-gray-700 mb-2">
          Filter by Food Group
        </label>
        <select
          id="foodGroup"
          value={selectedFoodGroup}
          onChange={(e) => setSelectedFoodGroup(e.target.value)}
          className="w-full md:w-64 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {FOOD_GROUPS.map((group) => (
            <option key={group} value={group}>{group}</option>
          ))}
        </select>
      </div>

      {getFilteredRecipes().length === 0 ? (
        <p className="text-gray-500 text-center">No saved recipes found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {getFilteredRecipes().map((recipe) => (
            <RecipeCard
              key={recipe.id}
              recipe={recipe}
              recipeId={recipe.id}
              onSave={handleSaveRecipe} 
              onDelete={handleDeleteRecipe}
              isSaved={true}
              showSaveDelete={true}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default UserSavedRecipes;