import React, { useState, useEffect } from 'react';
import UserSavedRecipes from '../components/UserSavedRecipes';
import '../styles/userprofile.css'



interface UserPreferences {
  dietaryRestrictions: string[];
  favoritesCuisines: string[];
  cookingSkillLevel: string;
}

interface UserProfile {
  name: string;
  email: string;
  bio: string;
  preferences: UserPreferences;
}

const DEFAULT_PREFERENCES: UserPreferences = {
  dietaryRestrictions: [],
  favoritesCuisines: [],
  cookingSkillLevel: 'intermediate'
};

const UserProfilePage: React.FC = () => {
  const userId = localStorage.getItem('userId');
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    email: '',
    bio: '',
    preferences: DEFAULT_PREFERENCES
  });

  useEffect(() => {
    // Load saved profile data
    const savedProfile = localStorage.getItem(`userProfile_${userId}`);
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
  }, [userId]);

  const handleSaveProfile = () => {
    localStorage.setItem(`userProfile_${userId}`, JSON.stringify(profile));
    setIsEditing(false);
  };

  const handlePreferenceChange = (
    category: keyof UserPreferences,
    value: string | string[]
  ) => {
    setProfile(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: value
      }
    }));
  };

  return (
    <><img
      src="./"
      alt='Insert profile image'
    ></img><div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-center mb-4">
                <h5 className="text-2xl font-bold">Your personalized cookbook!</h5>
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="text-blue-500 hover:text-blue-700"
                >
                  {isEditing ? 'Cancel' : 'Edit'}
                </button>
              </div>

              {isEditing ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Name</label>
                    <input
                      type="text"
                      value={profile.name}
                      onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Email</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Bio</label>
                    <textarea
                      value={profile.bio}
                      onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500" />

                  </div>
                  <button
                    onClick={handleSaveProfile}
                    className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  >
                    Save Changes
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Name</h3>
                    <p className="mt-1">{profile.name || 'Not set'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Email</h3>
                    <p className="mt-1">{profile.email || 'Not set'}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Bio</h3>
                    <p className="mt-1">{profile.bio || 'No bio added yet'}</p>
                  </div>
                </div>
              )}
            </div>

            {/* Cooking Preferences Section */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h2 className="text-2xl font-bold mb-4">Cooking Preferences</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Cooking Skill Level</label>
                  <select
                    value={profile.preferences.cookingSkillLevel}
                    onChange={(e) => handlePreferenceChange('cookingSkillLevel', e.target.value)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="beginner">Beginner</option>
                    <option value="intermediate">Intermediate</option>
                    <option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Dietary Restrictions</label>
                  <div className="mt-2 space-y-2">
                    {['Vegetarian', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Nut-Free'].map((restriction) => (
                      <label key={restriction} className="inline-flex items-center mr-4">
                        <input
                          type="checkbox"
                          checked={profile.preferences.dietaryRestrictions.includes(restriction)}
                          onChange={(e) => {
                            const newRestrictions = e.target.checked
                              ? [...profile.preferences.dietaryRestrictions, restriction]
                              : profile.preferences.dietaryRestrictions.filter(r => r !== restriction);
                            handlePreferenceChange('dietaryRestrictions', newRestrictions);
                          } }
                          className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
                        <span className="ml-2 text-sm text-gray-600">{restriction}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Saved Recipes Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-2xl font-bold mb-6">My Saved Recipes</h2>
              {userId ? (
                <UserSavedRecipes userId={userId} />
              ) : (
                <p className="text-gray-500">Please log in to see your saved recipes</p>
              )}
            </div>
          </div>
        </div>
      </div></>
  );
};

export default UserProfilePage;