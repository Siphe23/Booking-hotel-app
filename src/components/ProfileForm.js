import React, { useState } from 'react';
import { auth } from '../Firebase/firebase'; // Ensure the correct Firebase imports
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProfileForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
    username: '', // Only used for signup
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev); // Toggle between login and signup
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Handle login
        await signInWithEmailAndPassword(auth, formDetails.email, formDetails.password);
        alert('Login successful!');
        navigate('/home'); // Navigate to home page after login
      } else {
        // Handle signup
        const userCredential = await createUserWithEmailAndPassword(auth, formDetails.email, formDetails.password);
        const user = userCredential.user;
        alert('Signup successful! Welcome, ' + formDetails.username);
        navigate('/home'); // Navigate to home page after signup
      }

      // Reset form
      setFormDetails({ email: '', password: '', username: '' });
    } catch (error) {
      console.error('Error during ' + (isLogin ? 'login' : 'signup') + ': ', error.message);
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="profile-form">
      <h2>{isLogin ? 'Login' : 'Signup'}</h2>
      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <div>
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              id="username"
              value={formDetails.username}
              onChange={handleChange}
              placeholder="Enter your full name"
              required={!isLogin}
            />
          </div>
        )}
        <div>
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            value={formDetails.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={formDetails.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit">{isLogin ? 'Login' : 'Signup'}</button>
      </form>
      <p>
        {isLogin ? "Don't have an account? " : 'Already have an account? '}
        <button type="button" onClick={toggleForm}>
          {isLogin ? 'Sign Up' : 'Login'}
        </button>
      </p>
    </div>
  );
}

export default ProfileForm;
