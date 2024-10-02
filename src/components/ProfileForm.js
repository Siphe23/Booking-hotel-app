// src/components/ProfileForm.js
import React, { useState } from 'react';
import { auth, storage, db } from '../Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';  // Adjust import based on your setup

function ProfileForm() {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: '',
    userType: 'user',  // Default to 'user'
    password: '',
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
      reader.onloadend = () => setImagePreview(reader.result);
      setImageFile(file);
      reader.readAsDataURL(file);
    }
  };

  const handleSignupChange = (e) => {
    const { id, value } = e.target;
    setUserDetails((prev) => ({ ...prev, [id]: value }));
  };

  const handleLoginChange = (e) => {
    const { id, value } = e.target;
    setLoginDetails((prev) => ({ ...prev, [id]: value }));
  };

  // Sign up with Firebase
  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      const user = userCredential.user;

      // Upload profile picture
      let profileImageUrl = '';
      if (imageFile) {
        const imageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(imageRef, imageFile);
        profileImageUrl = await getDownloadURL(imageRef);
      }

      // Save user info in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        username: userDetails.username,
        email: userDetails.email,
        phone: userDetails.phone,
        userType: userDetails.userType,
        profilePicture: profileImageUrl,
      });

      // Dispatch login action with role
      dispatch(login({ role: userDetails.userType }));
      alert('User signed up successfully!');
      // Clear form fields
      setUserDetails({
        username: '',
        email: '',
        phone: '',
        userType: 'user',
        password: ''
      });
      setImagePreview(null);
    } catch (error) {
      console.error('Error signing up: ', error);
      alert('Error during signup');
    }
  };

  // Log in with Firebase
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password);
      dispatch(login({ role: loginDetails.userType }));
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in: ', error);
      alert('Error during login');
    }
  };

  return (
    <div className="profile">
      <h2>Sign up to create an account</h2>
      <form className="signup-form" onSubmit={handleSignupSubmit}>
        <input type="text" id="username" value={userDetails.username} onChange={handleSignupChange} placeholder="Enter your full name" required />
        <input type="email" id="email" value={userDetails.email} onChange={handleSignupChange} placeholder="Enter your email" required />
        <input type="tel" id="phone" value={userDetails.phone} onChange={handleSignupChange} placeholder="Enter your phone number" required />
        <select id="userType" value={userDetails.userType} onChange={handleSignupChange}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && <img src={imagePreview} alt="Profile Preview" />}
        <input type="password" id="password" value={userDetails.password} onChange={handleSignupChange} placeholder="Enter your password" required />
        <button type="submit">Sign Up</button>
      </form>

      <h2>Login</h2>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <input type="email" id="login-email" value={loginDetails.email} onChange={handleLoginChange} placeholder="Enter your email" required />
        <input type="password" id="login-password" value={loginDetails.password} onChange={handleLoginChange} placeholder="Enter your password" required />
        <select id="login-userType" value={loginDetails.userType} onChange={handleLoginChange}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit">Login</button>
      </form>
    </div>
  );
}

export default ProfileForm;
