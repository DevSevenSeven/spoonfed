import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import "../styles/Ingredientpage.css";

interface Recipe {
  title: string;
  ingredients: string[];
  instructions: string[];
}

const IngredientsPage: React.FC = () => {
  // Complete ingredient list
  const allIngredients = [
    // Proteins
    'Chicken', 'Beef', 'Pork', 'Turkey', 'Lamb', 
    'Salmon', 'Tuna', 'Shrimp', 'Tofu', 'Eggs', 
    'Tempeh', 'Seitan', 'Ground Beef', 'Chicken Breast',

    // Vegetables
    'Tomatoes', 'Onions', 'Garlic', 'Bell Peppers', 'Spinach', 
    'Broccoli', 'Carrots', 'Zucchini', 'Eggplant', 'Mushrooms', 
    'Cucumber', 'Lettuce', 'Kale', 'Cauliflower', 'Asparagus', 
    'Green Beans', 'Sweet Potato', 'Potato', 'Corn', 'Peas',

    // Fruits
    'Apples', 'Bananas', 'Oranges', 'Lemons', 'Limes', 
    'Strawberries', 'Blueberries', 'Raspberries', 'Avocado', 
    'Mango', 'Pineapple', 'Grapes', 'Kiwi', 'Peach',

    // Grains and Starches
    'Rice', 'Pasta', 'Bread', 'Quinoa', 'Couscous', 
    'Noodles', 'Tortillas', 'Oats', 'Bulgur', 'Barley',

    // Dairy and Alternatives
    'Milk', 'Cheese', 'Yogurt', 'Butter', 'Cream', 
    'Sour Cream', 'Almond Milk', 'Coconut Milk',

    // Herbs and Spices
    'Basil', 'Oregano', 'Thyme', 'Rosemary', 'Parsley', 
    'Cilantro', 'Mint', 'Dill', 'Cumin', 'Paprika', 
    'Cinnamon', 'Ginger', 'Turmeric', 'Chili Powder',

    // Legumes
    'Black Beans', 'Kidney Beans', 'Chickpeas', 'Lentils', 
    'Green Beans', 'Edamame', 'Pinto Beans',

    // Nuts and Seeds
    'Almonds', 'Walnuts', 'Pecans', 'Cashews', 'Peanuts', 
    'Sunflower Seeds', 'Chia Seeds', 'Pumpkin Seeds',

    // Condiments and Sauces
    'Olive Oil', 'Soy Sauce', 'Honey', 'Maple Syrup', 'Mustard', 
    'Ketchup', 'Vinegar', 'Hot Sauce', 'Mayonnaise', 'Salsa',

    // Baking Ingredients
    'Flour', 'Sugar', 'Baking Powder', 'Baking Soda', 'Cocoa Powder', 
    'Vanilla Extract', 'Chocolate Chips',

    // International Ingredients
    'Coconut', 'Kimchi', 'Miso', 'Saffron', 'Tahini', 
    'Curry Paste', 'Harissa', 'Seaweed', 'Wasabi'
  ];

  // Ingredient Categories
  const ingredientCategories = {
    Proteins: ['Chicken', 'Beef', 'Pork', 'Turkey', 'Lamb', 'Salmon', 'Tuna', 'Shrimp', 'Tofu', 'Eggs'],
    Vegetables: ['Tomatoes', 'Onions', 'Garlic', 'Bell Peppers', 'Spinach', 'Broccoli', 'Carrots', 'Zucchini'],
    Fruits: ['Apples', 'Bananas', 'Oranges', 'Lemons', 'Strawberries', 'Blueberries', 'Avocado'],
    Grains: ['Rice', 'Pasta', 'Bread', 'Quinoa', 'Oats', 'Tortillas'],
    DairyAndAlternatives: ['Milk', 'Cheese', 'Yogurt', 'Butter', 'Almond Milk'],
    HerbsAndSpices: ['Basil', 'Oregano', 'Thyme', 'Rosemary', 'Cumin', 'Paprika'],
    Legumes: ['Black Beans', 'Kidney Beans', 'Chickpeas', 'Lentils'],
    NutsAndSeeds: ['Almonds', 'Walnuts', 'Pecans', 'Cashews', 'Sunflower Seeds'],
    CondimentsAndSauces: ['Olive Oil', 'Soy Sauce', 'Honey', 'Mustard', 'Ketchup'],
    InternationalIngredients: ['Coconut', 'Kimchi', 'Miso', 'Curry Paste', 'Harissa']
  };

  // Hooks and State
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIngredients, setSelectedIngredients] = useState<Set<string>>(new Set());
  const [generatedRecipe, setGeneratedRecipe] = useState<Recipe | null>(null);

  // Handle ingredient interaction
  const handleIngredientInteraction = (ingredient: string, mode: 'navigate' | 'select' = 'navigate') => {
    if (mode === 'navigate') {
      navigate(`/ingredient/${ingredient.toLowerCase().replace(/\s+/g, '-')}`, {
        state: { ingredient }
      });
    } else {
      setSelectedIngredients(prev => {
        const newSet = new Set(prev);
        if (newSet.has(ingredient)) {
          newSet.delete(ingredient);
        } else {
          newSet.add(ingredient);
        }
        return newSet;
      });
    }
  };

  // Filter ingredients based on search term
  const filteredIngredients = useMemo(() => {
    return allIngredients.filter(ingredient => 
      ingredient.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  // Generate Recipe
  const handleGenerateRecipe = async () => {
    if (selectedIngredients.size === 0) {
      alert("Please select ingredients!");
      return;
    }

    try {
      const response = await fetch('/api/generate-recipe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({
          ingredients: Array.from(selectedIngredients)
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate recipe');
      }

      const recipe: Recipe = await response.json();
      setGeneratedRecipe(recipe);
    } catch (err) {
      console.error("Error generating recipe:", err);
      alert('Failed to generate recipe, please try again!');
    }
  };

  return (
    <div className="ingredients-page">
      <div className="ingredients-container">
        <h1 className="page-title">Ingredients Library</h1>

        {/* Search Section */}
        <div className="search-container">
          <input
            type="text"
            placeholder="Search ingredients..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-bar"
          />
          
          <div className="search-actions">
            <span className="selected-count">
              Selected: {selectedIngredients.size}
            </span>
            <button
              onClick={handleGenerateRecipe}
              disabled={selectedIngredients.size === 0}
              className="generate-button"
            >
              Generate Recipe
            </button>
          </div>
        </div>

        {/* Main Ingredients Grid */}
        <div className="ingredients-grid">
          {filteredIngredients.map((ingredient, index) => (
            <div
              key={index}
              className={`ingredient-card ${selectedIngredients.has(ingredient) ? 'selected' : ''}`}
            >
              <div 
                className="ingredient-name"
                onClick={() => handleIngredientInteraction(ingredient, 'navigate')}
              >
                {ingredient}
              </div>
              <button 
                className="ingredient-select-btn"
                onClick={() => handleIngredientInteraction(ingredient, 'select')}
              >
                {selectedIngredients.has(ingredient) ? '✓' : '+'}
              </button>
            </div>
          ))}
        </div>

        {/* Generated Recipe Display */}
        {generatedRecipe && (
          <div className="generated-recipe">
            <h2 className="recipe-title">{generatedRecipe.title}</h2>
            <div className="recipe-section">
              <h3>Ingredients:</h3>
              <ul>
                {generatedRecipe.ingredients.map((ingredient, index) => (
                  <li key={index}>{ingredient}</li>
                ))}
              </ul>
            </div>
            <div className="recipe-section">
              <h3>Instructions:</h3>
              <ol>
                {generatedRecipe.instructions.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}

        {/* Ingredient Categories */}
        {Object.entries(ingredientCategories).map(([category, ingredients]) => (
          <div key={category} className="category-section">
            <h2 className="category-title">
              {category.replace(/([A-Z])/g, ' $1').trim()}
            </h2>
            <div className="ingredients-grid">
              {ingredients.map((ingredient, index) => (
                <div
                  key={index}
                  className={`ingredient-card ${selectedIngredients.has(ingredient) ? 'selected' : ''}`}
                >
                  <div 
                    className="ingredient-name"
                    onClick={() => handleIngredientInteraction(ingredient, 'navigate')}
                  >
                    {ingredient}
                  </div>
                  <button 
                    className="ingredient-select-btn"
                    onClick={() => handleIngredientInteraction(ingredient, 'select')}
                  >
                    {selectedIngredients.has(ingredient) ? '✓' : '+'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default IngredientsPage;