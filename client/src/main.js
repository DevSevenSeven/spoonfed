import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import React from 'react';
// Fix import paths
import App from '../app.tsx';
import ErrorPage from './pages/ErrorPage';
import MainPage from './pages/Mainpage';
import RecipeSearch from './components/RecipeSearch';
import SavedRecipes from './pages/SavedRecipes';
import PairingDisplay from './components/PairingDisplay.tsx';
import RecipeDetail from './services/RecipeDetailService.ts';
import UserProfile from './pages/UserProfile'; // Add this import
import Dashboard from './pages/dashboard';
import './styles/style.css';
import './styles/images/Spoonfed.png';
// main.tsx
const router = createBrowserRouter([
    {
        path: '/',
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            {
                index: true,
                element: <MainPage />
            },
            {
                path: 'dashboard',
                element: <Dashboard />
            },
            {
                path: 'recipe-search',
                element: <RecipeSearch />
            },
            {
                path: 'profile',
                element: <UserProfile />
            },
            {
                path: 'saved-recipes',
                element: <SavedRecipes />
            },
            {
                path: 'recipe/:id',
                element: <RecipeDetail />
            },
            {
                path: 'pairing/:recipeId',
                element: <PairingDisplay recipe={{
                        sourceUrl: '',
                        suggestedPairings: [],
                        customPairings: [],
                        id: '',
                        title: '',
                        description: '',
                        foodGroup: '',
                        ingredients: [],
                        instructions: [],
                        searchMode: false
                    }}/>
            }
        ]
    }
]);
// Create root and render
const rootElement = document.getElementById('root');
if (rootElement) {
    ReactDOM.createRoot(rootElement).render(<React.StrictMode>
      <RouterProvider router={router}/>
    </React.StrictMode>);
}
export default router;
