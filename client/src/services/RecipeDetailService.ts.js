import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PairingDisplay from '../components/PairingDisplay';
const RecipeDetail = () => {
    const { id } = useParams();
    const [recipe, setRecipe] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    useEffect(() => {
        const fetchRecipe = async () => {
            if (!id) {
                setError('Recipe ID is missing');
                setLoading(false);
                return;
            }
            try {
                setLoading(true);
                const response = await fetch(`/api/recipes/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to fetch recipe');
                }
                const data = await response.json();
                setRecipe(data);
            }
            catch (err) {
                setError(err instanceof Error ? err.message : 'An error occurred');
            }
            finally {
                setLoading(false);
            }
        };
        fetchRecipe();
    }, [id]);
    if (loading) {
        return <div className="p-4">Loading...</div>;
    }
    if (error || !recipe) {
        return <div className="p-4 text-red-600">{error || 'Recipe not found'}</div>;
    }
    return (<div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{recipe.title}</h1>
        
        {recipe.image && (<img src={recipe.image} alt={recipe.title} className="w-full max-w-2xl h-64 object-cover rounded-lg mb-6"/>)}
        
        {recipe.description && (<p className="text-gray-700 mb-6">{recipe.description}</p>)}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
            <ul className="list-disc pl-5 space-y-2">
              {recipe.ingredients.map((ingredient, index) => (<li key={index} className="text-gray-700">{ingredient}</li>))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4">Instructions</h2>
            <ol className="list-decimal pl-5 space-y-2">
              {recipe.instructions.map((step, index) => (<li key={index} className="text-gray-700">{step}</li>))}
            </ol>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Recommended Pairings</h2>
        <PairingDisplay recipe={recipe}/>
      </div>
    </div>);
};
export default RecipeDetail;
