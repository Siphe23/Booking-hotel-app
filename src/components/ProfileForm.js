import React, { useState } from 'react';
import { auth, storage, db } from '../Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice';

function ProfileForm() {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    phone: '',
    userType: 'user',
    password: ''
  });
  const [loginDetails, setLoginDetails] = useState({
    email: '',
    password: '',
    userType: 'user',
  });
  const [loading, setLoading] = useState(false); // Loading state

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      setImageFile(file);
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e, isLoginForm = false) => {
    const { id, value } = e.target;
    if (isLoginForm) {
      setLoginDetails((prev) => ({ ...prev, [id]: value }));
    } else {
      setUserDetails((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userDetails.email, userDetails.password);
      const user = userCredential.user;

      let profileImageUrl = '';
      if (imageFile) {
        const imageRef = ref(storage, `profilePictures/${user.uid}`);
        await uploadBytes(imageRef, imageFile);
        profileImageUrl = await getDownloadURL(imageRef);
      }

      await setDoc(doc(db, 'users', user.uid), {
        username: userDetails.username,
        email: userDetails.email,
        phone: userDetails.phone,
        userType: userDetails.userType,
        profilePicture: profileImageUrl,
      });

      alert('User signed up successfully!');
      dispatch(login({ role: userDetails.userType }));

      setUserDetails({ username: '', email: '', phone: '', userType: 'user', password: '' });
      setImagePreview(null);
      setImageFile(null);
    } catch (error) {
      console.error('Error signing up: ', error);
      alert('Error during signup: ' + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading

    try {
      await signInWithEmailAndPassword(auth, loginDetails.email, loginDetails.password);
      dispatch(login({ role: loginDetails.userType }));
      alert('Login successful!');
    } catch (error) {
      console.error('Error logging in: ', error.message);
      alert('Error during login: ' + error.message);
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="profile">
      <h2>Sign up to create an account</h2>
      <form className="signup-form" onSubmit={handleSignupSubmit}>
        {/* Signup Form Fields */}
        <input type="text" id="username" value={userDetails.username} onChange={(e) => handleChange(e)} required />
        <input type="email" id="email" value={userDetails.email} onChange={(e) => handleChange(e)} required />
        <input type="tel" id="phone" value={userDetails.phone} onChange={(e) => handleChange(e)} required />
        <select id="userType" value={userDetails.userType} onChange={(e) => handleChange(e)}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <input type="file" id="profile-picture" accept="image/*" onChange={handleImageUpload} />
        {imagePreview && <img src={imagePreview} alt="Profile Preview" />}
        <input type="password" id="password" value={userDetails.password} onChange={(e) => handleChange(e)} required />
        <button type="submit" disabled={loading}>{loading ? 'Signing Up...' : 'Sign Up'}</button>
      </form>

      <h2>Welcome Back!</h2>
      <form className="login-form" onSubmit={handleLoginSubmit}>
        <input type="email" id="login-email" value={loginDetails.email} onChange={(e) => handleChange(e, true)} required />
        <input type="password" id="login-password" value={loginDetails.password} onChange={(e) => handleChange(e, true)} required />
        <select id="login-user-type" value={loginDetails.userType} onChange={(e) => handleChange(e, true)}>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
        <button type="submit" disabled={loading}>{loading ? 'Logging In...' : 'Login'}</button>
      </form>
    </div>
  );
};

export default ProfileForm;
