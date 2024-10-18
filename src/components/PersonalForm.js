// src/components/PersonalForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'; 
import { storage } from '../Firebase/firebase'; // Ensure this import is correct

const PersonalForm = () => {
  const navigate = useNavigate();
  const [formDetails, setFormDetails] = useState({
    name: '',
    surname: '',
    cellphone: '',
    idNumber: '',
    address: '',
    profilePicture: null,
    email: '',
    username: '',
  });
  const [uploading, setUploading] = useState(false); // State to manage upload progress

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormDetails((prevDetails) => ({ ...prevDetails, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Upload profile picture to Firebase Storage
    if (formDetails.profilePicture) {
      try {
        setUploading(true);
        
        // Create a storage reference for the profile picture
        const storageRef = ref(storage, `profilePictures/${formDetails.profilePicture.name}`);

        // Upload the file to Firebase Storage
        await uploadBytes(storageRef, formDetails.profilePicture);

        // Get the uploaded picture's URL
        const profilePicUrl = await getDownloadURL(storageRef);

        // Store the user details in local storage (or backend), including the profile picture URL
        const userDetails = { ...formDetails, profilePicture: profilePicUrl };
        localStorage.setItem('userDetails', JSON.stringify(userDetails));

        setUploading(false);

        // Redirect to the profile page with the user details
        navigate('/profile', { state: { ...userDetails } });

        console.log('Personal Details Submitted:', userDetails);
      } catch (error) {
        console.error('Error uploading profile picture:', error);
        setUploading(false);
      }
    }
  };

  return (
    <div>
      <h2>Sign Up and Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        {/* Form fields */}
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={formDetails.name}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>
        {/* Additional fields for surname, email, etc. */}
        
        <div className="input-group">
          <label htmlFor="profilePicture">Upload Profile Picture</label>
          <input
            type="file"
            id="profilePicture"
            onChange={handleFileChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="submit-button" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default PersonalForm;
