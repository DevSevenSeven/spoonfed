import { useState } from 'react';
import React from 'react';
const ProfilePicture = () => {
    const [image, setImage] = useState('');
    const handleImageUpload = (e) => {
        const files = e.target.files;
        if (files && files[0]) {
            setImage(URL.createObjectURL(files[0]));
        }
    };
    return (<div>
      <img src={image || '/path/to/default/image.jpg'} alt="Profile" className="w-32 h-32 rounded-full object-cover"/>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="mt-4"/>
    </div>);
};
export default ProfilePicture;
