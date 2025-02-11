import type React from 'react';
import User from '../interfaces/User';
import { ImCross } from 'react-icons/im';
import { CgPlayListAdd } from 'react-icons/cg';

type UserCardProps = {
  currentUser: User;
  addToSavedRecipes?: (() => void) | null;
  onSavedRecipes?: boolean | null;
  onUserProfile? : boolean | null;
  removeFromStorage?:
    | ((
        e: React.MouseEvent<SVGSVGElement, MouseEvent>,
        currentlyOnWatchList: boolean | null | undefined,
        currentlyOnSeenItList: boolean | null | undefined,
        name: string | null
      ) => void)
    | null;
};

const UserCard = ({
  currentUser,
  addToSavedRecipes,
  onSavedRecipes,
  onUserProfile,
  removeFromStorage,
}: UserCardProps) => {
  return (
    <>
      {currentUser?.Name ? (
        <section className='userCard'>
          <figure>
            <img src={`${currentUser.Avatar}`} alt={`${currentUser.Name}`} />
          </figure>
          <article className='details'>
            <h2>{currentUser.Name}</h2>
            <p>
              <strong>City:</strong> {currentUser.City}
            </p>
            <p>
              <strong>State:</strong> {currentUser.State}
            </p>
          </article>
          {onSavedRecipes || onUserProfile ?(
            <aside className='icons'>
              <ImCross
                style={{ fontSize: '40px', cursor: 'pointer' }}
                onClick={(e: React.MouseEvent<SVGSVGElement, MouseEvent>) =>
                  removeFromStorage?.(
                    e,
                    onUserProfile,
                    onSavedRecipes,
                    currentUser.Name
                  )
                }
              />
            </aside>
          ) : (
            <aside className='icons'>
              <CgPlayListAdd
                style={{ fontSize: '50px', cursor: 'pointer' }}
                onClick={() => addToSavedRecipes?.()}
              />
            </aside>
            
          )}
        </section>
      ) : (
        <h1 style={{ margin: '16px 0' }}> User please search for a recipe.</h1>
      )}
    </>
  );
};

export default UserCard;