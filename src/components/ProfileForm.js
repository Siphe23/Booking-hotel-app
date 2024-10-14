import React, { useState } from 'react';
import { auth } from '../Firebase/firebase'; 
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom'; 
import '../assets/style.css'; 

const ProfileForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formDetails, setFormDetails] = useState({
    email: '',
    password: '',
    username: '', 
  });
  const [signupMessage, setSignupMessage] = useState(''); // For signup success message
  const navigate = useNavigate(); 

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
  };

  const toggleForm = () => {
    setIsLogin((prev) => !prev); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        // Login logic
        await signInWithEmailAndPassword(auth, formDetails.email, formDetails.password);
        alert('Login successful!');
        navigate('/home'); 
      } else {
        // Signup logic
        await createUserWithEmailAndPassword(auth, formDetails.email, formDetails.password);
        setSignupMessage('Thank you for signing up, you may now log in.');
        setFormDetails({ email: '', password: '', username: '' });
        // After signup, redirect to login page
        setIsLogin(true);
      }
    } catch (error) {
      console.error('Error during ' + (isLogin ? 'login' : 'signup') + ': ', error.message);
      alert('Error: ' + error.message); // Display the Firebase error
    }
  };

  return (
    <>
      <div className='heading'>
        {signupMessage && <p className="signup-success">{signupMessage}</p>} {/* Show signup message if available */}
        Please Login or Signup
      </div>
      <div className="profile-form">
        <h2>{isLogin ? 'Login' : 'Signup'}</h2>
        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div className="input-group">
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
          <div className="input-group">
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
          <div className="input-group">
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
          <button type="submit" className="submit-button">
            {isLogin ? 'Login' : 'Signup'}
          </button>
        </form>
        <p>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <button type="button" className="toggle-button" onClick={toggleForm}>
            {isLogin ? 'Sign Up' : 'Login'}
          </button>
        </p>
      </div>
    </>
  );
};

export default ProfileForm;
