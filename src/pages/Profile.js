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
              <label>User Name</label>
              <input type="text" placeholder="Enter your full name" />

              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" />

              <label>Phone Number</label>
              <input type="tel" placeholder="Enter your phone number" />

              <label>Profile Picture</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} />

            
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
              <label>Email Address</label>
              <input type="email" placeholder="Enter your email" />

              <label>Password</label>
              <input type="password" placeholder="Enter your password" />

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
