import type React from 'react';
import { useEffect, useState } from 'react';
import RecipesToAddSaved from '../components/RecipesToAddSaved';
import type User from '../interfaces/User';

const UserPage = () => {
  const [userProfile, setUserProfile] = useState<User[]>([]);

  const removeFromStorage = (
    e: React.MouseEvent<SVGSVGElement, MouseEvent>,
    currentlyOnUserProfile: boolean | null | undefined,
    currentlyOnSaveRecipes: boolean | null | undefined,
    name: string | null
  ) => {
    e.preventDefault();
    if (currentlyOnUserProfile) {
      let parsedUserProfile: User[] = [];

      const storedUserProfile = localStorage.getItem('userProfile');
      if (typeof storedUserProfile === 'string') {
        parsedUserProfile = JSON.parse(storedUserProfile);
      }
      parsedUserProfile = parsedUserProfile.filter(
        (user) => user.Name !== name
      );
      setUserProfile(parsedUserProfile);
      localStorage.setItem('userProfile', JSON.stringify(parsedUserProfile));
    } else if (currentlyOnSaveRecipes) {
      let parsedAlreadySavedRecipes: User[] = [];
      const storedAlreadySavedRecipes = localStorage.getItem('alreadySavedRecipes');
      if (typeof storedAlreadySavedRecipes === 'string') {
        parsedAlreadySavedRecipes = JSON.parse(storedAlreadySavedRecipes);
      }

      parsedAlreadySavedRecipes = parsedAlreadySavedRecipes.filter(
        (user) => user.Name !== name
      );
      localStorage.setItem(
        'alreadySavedRecipes',
        JSON.stringify(parsedAlreadySavedRecipes)
      );
    }
  };

  useEffect(() => {
    const parsedUserProfile = JSON.parse(
      localStorage.getItem('userProfile') as string
    );
    setUserProfile(parsedUserProfile);
  }, []);

  return (
    <>
      <h1 className='pageHeader'>Watch List</h1>
      {(!userProfile?.length || userProfile?.length === 0) ? (
        <h1 style={{ margin: '16px 0' }}>Add recipes to user page.</h1>
      ) : (
        <RecipesToAddSaved
          userProfile={userProfile}
          removeFromStorage={removeFromStorage}
        />
      )}
    </>
  );
};

export default UserPage;
