// src/components/UserProfile.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const UserProfile = () => {
  const { state: userDetails } = useLocation();

  return (
    <div>
      <h1>{userDetails.name}'s Profile</h1>
      <img 
        src={userDetails.profilePicture} 
        alt={`${userDetails.name}'s profile`} 
        style={{ width: '150px', borderRadius: '50%' }} 
      />
      <p><strong>Email:</strong> {userDetails.email}</p>
      <p><strong>Username:</strong> {userDetails.username}</p>
      <p><strong>Cellphone:</strong> {userDetails.cellphone}</p>
      {/* Display other details */}
    </div>
  );
};

export default UserProfile;
