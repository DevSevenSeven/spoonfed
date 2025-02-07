// PairingDisplay.tsx
import React from 'react';
const PairingDisplay = ({ recipe }) => {
    const getSuggestedPairings = () => {
        const pairings = {
            wines: [],
            cocktails: [],
            nonAlcoholic: [],
            desserts: [],
        };
        // Determine pairings based on food group
        switch (recipe.foodGroup?.toLowerCase()) {
            case 'protein':
                pairings.wines = ['Cabernet Sauvignon', 'Malbec', 'Syrah'];
                pairings.cocktails = ['Old Fashioned', 'Manhattan', 'Whiskey Sour'];
                pairings.nonAlcoholic = ['Sparkling Water with Lime', 'Iced Black Tea', 'Pomegranate Juice'];
                pairings.desserts = ['Dark Chocolate Mousse', 'Berry Cheesecake', 'Crème Brûlée'];
                break;
            case 'pasta':
            case 'grains':
                pairings.wines = ['Pinot Grigio', 'Chardonnay', 'Light Rosé'];
                pairings.cocktails = ['Aperol Spritz', 'Bellini', 'Prosecco Cocktail'];
                pairings.nonAlcoholic = ['Italian Soda', 'Lemon Spritzer', 'Herb-Infused Water'];
                pairings.desserts = ['Tiramisu', 'Cannoli', 'Lemon Sorbet'];
                break;
            case 'vegetables':
                pairings.wines = ['Sauvignon Blanc', 'Grüner Veltliner', 'Dry Riesling'];
                pairings.cocktails = ['Cucumber Gin & Tonic', 'Bloody Mary', 'Garden Spritz'];
                pairings.nonAlcoholic = ['Green Juice', 'Cucumber Water', 'Herbal Tea'];
                pairings.desserts = ['Carrot Cake', 'Zucchini Bread', 'Fruit Tart'];
                break;
            case 'dairy':
                pairings.wines = ['Champagne', 'Prosecco', 'Cava'];
                pairings.cocktails = ['White Russian', 'Mudslide', 'Cream Liqueur'];
                pairings.nonAlcoholic = ['Horchata', 'Vanilla Bean Steamer', 'Golden Milk'];
                pairings.desserts = ['Panna Cotta', 'Ice Cream Sundae', 'Rice Pudding'];
                break;
            case 'fruits':
                pairings.wines = ['Moscato', 'Sweet Riesling', 'Ice Wine'];
                pairings.cocktails = ['Sangria', 'Fruit Mojito', 'Mimosa'];
                pairings.nonAlcoholic = ['Fruit Smoothie', 'Lemonade', 'Tropical Iced Tea'];
                pairings.desserts = ['Fruit Cobbler', 'Apple Pie', 'Berry Pavlova'];
                break;
            default:
                pairings.wines = ['House Red', 'House White', 'Rosé'];
                pairings.cocktails = ['Classic Martini', 'Moscow Mule', 'Margarita'];
                pairings.nonAlcoholic = ['Sparkling Water', 'Iced Tea', 'Fresh Lemonade'];
                pairings.desserts = ['Chocolate Cake', 'Vanilla Bean Ice Cream', 'Fresh Fruit Plate'];
        }
        return pairings;
    };
    const pairings = getSuggestedPairings();
    return (<div className="mt-4 p-4 bg-cream rounded-lg border border-dark-cream">
      <h3 className="text-lg font-semibold text-primary-teal mb-3">Perfect Pairings</h3>
      
      {/* Wine Pairings */}
      {pairings.wines.length > 0 && (<div className="mb-4">
          <h4 className="font-medium text-primary-orange mb-2">Wine Selections:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {pairings.wines.map((wine, index) => (<li key={index} className="text-gray-700">{wine}</li>))}
          </ul>
        </div>)}
      
      {/* Cocktail Pairings */}
      {pairings.cocktails.length > 0 && (<div className="mb-4">
          <h4 className="font-medium text-primary-orange mb-2">Cocktail Options:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {pairings.cocktails.map((cocktail, index) => (<li key={index} className="text-gray-700">{cocktail}</li>))}
          </ul>
        </div>)}

      {/* Non-Alcoholic Pairings */}
      {pairings.nonAlcoholic.length > 0 && (<div className="mb-4">
          <h4 className="font-medium text-primary-orange mb-2">Non-Alcoholic Beverages:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {pairings.nonAlcoholic.map((drink, index) => (<li key={index} className="text-gray-700">{drink}</li>))}
          </ul>
        </div>)}

      {/* Dessert Pairings */}
      {pairings.desserts.length > 0 && (<div className="mb-4">
          <h4 className="font-medium text-primary-orange mb-2">Sweet Endings:</h4>
          <ul className="list-disc pl-5 space-y-1">
            {pairings.desserts.map((dessert, index) => (<li key={index} className="text-gray-700">{dessert}</li>))}
          </ul>
        </div>)}

      {/* If no pairings available */}
      {pairings.wines.length === 0 && pairings.cocktails.length === 0 &&
            pairings.nonAlcoholic.length === 0 && pairings.desserts.length === 0 && (<p className="text-gray-600">No pairing suggestions available for this recipe.</p>)}
      
      <div className="mt-4 text-sm text-gray-600">
        <p className="italic">
          Tip: These pairings are suggested based on complementary flavors. Feel free to mix and match to find your perfect combination!
        </p>
      </div>
    </div>);
};
export default PairingDisplay;
