import type React from 'react';
import type User from '../interfaces/User';
import UserCard from './UserCard';


interface RecipeToAddSavedeProps {
  userProfile: User[];
  removeFromStorage:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyOnUserProfile: boolean | null | undefined,
        currentlyOnSaveRecipes: boolean | null | undefined,
        name: string | null
      ) => void)
    | null;
}

const RecipesToAddSaved = ({
  userProfile,
  removeFromStorage,
}: RecipeToAddSavedeProps) => {
  console.log(userProfile);

  return (
    <>
      <ul>
        {userProfile.map((user) => (
          <UserCard
            currentUser={user}
            key={user.Name}
            onUserProfile={true}
            removeFromStorage={removeFromStorage}
          />
        ))}
      </ul>
    </>
  );
};

export default RecipesToAddSaved;
