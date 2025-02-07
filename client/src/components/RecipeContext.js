import React, { createContext, useContext, useState } from 'react';
const RecipeContext = createContext(undefined);
export const RecipeProvider = ({ children }) => {
    const [recipes, setRecipes] = useState([]);
    return (<RecipeContext.Provider value={{ recipes, setRecipes }}>
      {children}
    </RecipeContext.Provider>);
};
export const useRecipes = () => {
    const context = useContext(RecipeContext);
    if (!context) {
        throw new Error('useRecipes must be used within a RecipeProvider');
    }
    return context;
};
export default RecipeContext;
