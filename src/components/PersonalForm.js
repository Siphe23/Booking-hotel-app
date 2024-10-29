import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../Firebase/firebase';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

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
  });
  const [uploading, setUploading] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
  };

  const handleFileChange = (e) => {
    setFormDetails((prevDetails) => ({ ...prevDetails, profilePicture: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setUploading(true);
      const storageRef = ref(storage, `profilePictures/${formDetails.profilePicture.name}`);
      await uploadBytes(storageRef, formDetails.profilePicture);
      const profilePicUrl = await getDownloadURL(storageRef);
      const userDetails = { ...formDetails, profilePicture: profilePicUrl };
      localStorage.setItem('userDetails', JSON.stringify(userDetails));
      setUploading(false);
      navigate('/profile', { state: { ...userDetails } });
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      setUploading(false);
    }
  };

  return (
    <div>
      <Navbar />
      <h2>Complete Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" value={formDetails.name} onChange={handleChange} required />
        </div>
        <div className="input-group">
          <label htmlFor="profilePicture">Upload Profile Picture</label>
          <input type="file" id="profilePicture" onChange={handleFileChange} accept="image/*" required />
        </div>
        <button type="submit" className="submit-button" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Submit'}
        </button>
      </form>
      <Footer />
    </div>
  );
};

export default PersonalForm;
