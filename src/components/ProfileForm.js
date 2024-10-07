// src/components/ProfileForm.js
import React, { useState } from 'react';
import { auth, storage, db } from '../Firebase/firebase'; // Ensure the correct Firebase imports
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'; // Adjust import based on your setup

function ProfileForm() {
  const dispatch = useDispatch(); // For dispatching login actions
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null); // Store the uploaded image file
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: '',
    userType: 'user', // Default to 'user'
    password: ''
  });

  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    userType: 'user',
  });

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Preview the image
      };
      setImageFile(file); // Save the file for Firebase upload
      reader.readAsDataURL(file);
    }
  };

  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
  };

  // Function to handle signup with Firebase
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        userDetails.email,
        userDetails.password
      );
      const user = userCredential.user;

      // Upload profile picture if provided
      let profileImageUrl = '';
      if (imageFile) {
        const imageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(imageRef, imageFile);
        profileImageUrl = await getDownloadURL(imageRef);
      }

      // Save user details in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: userDetails.username,
        email: userDetails.email,
        phone: userDetails.phone,
        userType: userDetails.userType,
        profilePicture: profileImageUrl,
      });

      alert('User signed up successfully!');
      // Dispatch login action with user role
      dispatch(login({ role: userDetails.userType }));

      // Reset form fields
      setUserDetails({
        username: '',
        email: '',
        phone: '',
        userType: 'user',
        password: ''
      });
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error signing up: ', error);
      alert('Error during signup: ' + error.message);
    }
  };

  // Function to handle login with Firebase
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      // Sign in with Firebase Authentication
      await signInWithEmailAndPassword(
        auth,
        loginDetails.email,
        loginDetails.password
      );

      // Dispatch login action with user role
      dispatch(login({ role: loginDetails.userType }));
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in: ', error.message);
      alert('Error during login: ' + error.message);
    }
  };

  return (
    <div className="profile">
      <h2>Sign up to create an account</h2>
      <form className="signup-form" onSubmit={handleSignupSubmit}>
        <div>
          <label htmlFor="username">User Name</label>
          <input
            type="text"
            id="username"
            value={userDetails.username}
            onChange={handleSignupChange}
            placeholder="Enter your full name"
            required
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={userDetails.email}
            onChange={handleSignupChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="phone">Phone Number</label>
          <input
            type="tel"
            id="phone"
            value={userDetails.phone}
            onChange={handleSignupChange}
            placeholder="Enter your phone number"
            required
          />
        </div>

        <div>
          <label htmlFor="userType">User Type</label>
          <select id="userType" value={userDetails.userType} onChange={handleSignupChange}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <div>
          <label htmlFor="profile-picture">Profile Picture</label>
          <input
            type="file"
            id="profile-picture"
            accept="image/*"
            onChange={handleImageUpload}
          />
        </div>

        {imagePreview && (
          <div className="image-preview">
            <img src={imagePreview} alt="Profile Preview" className="preview-image" />
          </div>
        )}

        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={userDetails.password}
            onChange={handleSignupChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <button type="submit">Sign Up</button>
      </form>

      <h2>Welcome Back!</h2>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <div>
          <label htmlFor="login-email">Email Address</label>
          <input
            type="email"
            id="login-email"
            value={loginDetails.email}
            onChange={handleLoginChange}
            placeholder="Enter your email"
            required
          />
        </div>

        <div>
          <label htmlFor="login-password">Password</label>
          <input
            type="password"
            id="login-password"
            value={loginDetails.password}
            onChange={handleLoginChange}
            placeholder="Enter your password"
            required
          />
        </div>

        <div>
          <label htmlFor="login-user-type">User Type</label>
          <select id="login-user-type" value={loginDetails.userType} onChange={handleLoginChange}>
            <option value="admin">Admin</option>
            <option value="user">User</option>
          </select>
        </div>

        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default ProfileForm;


