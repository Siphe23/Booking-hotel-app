import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Actions/authActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { storage, auth, db } from '../Firebase/firebase'; 
import { ref, uploadString } from 'firebase/storage';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import '../assets/Profile.css';

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

function Profile() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    userType: 'user',
    phoneNumber: '',
    image: null,
  });
  const [showSignup, setShowSignup] = useState(false);
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth?.error || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("Signing up with:", formData);

    if (!formData.email || !formData.password) {
      alert("Please fill in both fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      // Upload image if provided
      if (formData.image) {
        const storageRef = ref(storage, `images/${user.uid}`);
        await uploadString(storageRef, formData.image, 'data_url');
      }

      // Add user data to Firestore
      await db.collection('users').doc(user.uid).set({
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        role: formData.userType,
      });

      dispatch(login(formData.email, formData.password, formData.userType));
      resetForm();
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.code === 'auth/email-already-in-use') {
        alert("This email is already in use. Please log in instead.");
        setShowSignup(false); // Switch to login form
      } else {
        alert(error.message); // For other errors
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Logging in with:", formData); // Log formData for debugging

    if (!formData.email || !formData.password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      dispatch(login(formData.email, formData.password, formData.userType));
      resetForm();
    } catch (error) {
      console.error("Error logging in:", error);
      alert(error.message);
    }
  };

  const resetForm = () => {
    setFormData({
      email: '',
      password: '',
      userType: 'user',
      phoneNumber: '',
      image: null,
    });
  };

  const handleSignupToggle = () => {
    setShowSignup((prev) => !prev);
    resetForm(); // Reset form when toggling
  };

  return (
    <>
      <Navbar />
      <h1 className="page-heading">{showSignup ? "Sign Up" : "Login"}</h1>
      <div className="profile-container">
        <div className="form-container">
          <div className="form">
            {errorMessage && <p className="error">{errorMessage}</p>}
            {showSignup ? (
              <form onSubmit={handleSignup}>
                <label htmlFor="signup-email">Email Address</label>
                <input
                  type="email"
                  id="signup-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

                <label htmlFor="signup-password">Password</label>
                <input
                  type="password"
                  id="signup-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />

                <label htmlFor="signup-phone">Phone Number</label>
                <input
                  type="tel"
                  id="signup-phone"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />

                <label>Image:</label>
                <input 
                  type="file" 
                  id="image" 
                  name="image" 
                  accept="image/*" 
                  onChange={handleImageChange} 
                />
                {formData.image && (
                  <img src={formData.image} alt="Preview" className="image-preview" />
                )}

                <label htmlFor="signup-user-type">User Type</label>
                <select
                  id="signup-user-type"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <button type="submit">Sign Up</button>
                <p>Already have an account? <a href="#" onClick={handleSignupToggle}>Login here</a></p>
              </form>
            ) : (
              <form onSubmit={handleLogin}>
                <label htmlFor="login-email">Email Address</label>
                <input
                  type="email"
                  id="login-email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />

                <label htmlFor="login-password">Password</label>
                <input
                  type="password"
                  id="login-password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                />

                <label htmlFor="user-type">User Type</label>
                <select
                  id="user-type"
                  name="userType"
                  value={formData.userType}
                  onChange={handleChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>

                <button type="submit">Login</button>
                <p>Don't have an account? <a href="#" onClick={handleSignupToggle}>Sign up here</a></p>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
