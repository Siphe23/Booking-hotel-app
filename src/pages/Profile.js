import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../assets/Profile.css'; 

function Profile() {
  const [imagePreview, setImagePreview] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Navbar />

      <h1 className="page-heading">Login or Register</h1>
      <div className="profile-container">
        <div className="form-container">
          <div className="form">
            <h2>Sign up to create account</h2>

            <form>
              <label htmlFor="username">User Name</label>
              <input type="text" id="username" placeholder="Enter your full name" />

              <label htmlFor="email">Email Address</label>
              <input type="email" id="email" placeholder="Enter your email" />

              <label htmlFor="phone">Phone Number</label>
              <input type="tel" id="phone" placeholder="Enter your phone number" />
              
              <label htmlFor="user-type">User Type</label>
              <select id="user-type" name='users'>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>

              <label htmlFor="profile-picture">Profile Picture</label>
              <input 
                type="file" 
                id="profile-picture" 
                accept="image/*" 
                onChange={handleImageUpload} 
              />

              {imagePreview && (
                <div className="image-preview">
                  <img src={imagePreview} alt="Profile Preview" className="preview-image" />
                </div>
              )}

              <button type="submit">Create Account</button>
            </form>
          </div>

          <div className="form">
            <h2>Welcome Back!</h2>
            <form>
              <label htmlFor="login-email">Email Address</label>
              <input type="email" id="login-email" placeholder="Enter your email" />
              <label htmlFor="user-type">User Type</label>
              <select id="user-type" name='users'>
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
              <label htmlFor="login-password">Password</label>
              <input type="password" id="login-password" placeholder="Enter your password" />

              <button type="submit">Login</button>
            </form>
            <p>Don't have an account? <a href="#">Sign up here</a></p>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Profile;
