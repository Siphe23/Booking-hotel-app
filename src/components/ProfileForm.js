import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../Actions/authActions';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth, db } from '../Firebase/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import '../assets/profile.css';

const isValidEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

function Profile() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    phoneNumber: '',
  });
  const [showSignup, setShowSignup] = useState(true);
  const dispatch = useDispatch();
  const errorMessage = useSelector((state) => state.auth?.error || null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password || !formData.phoneNumber) {
      alert("Please fill in all fields.");
      return;
    }

    if (!isValidEmail(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
      const user = userCredential.user;

      await setDoc(doc(db, 'users', user.uid), {
        email: formData.email,
        phoneNumber: formData.phoneNumber,
      });

      dispatch(login(formData.email, formData.password));
      resetForm();
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.code === 'auth/email-already-in-use') {
        alert("This email is already in use. Please log in instead.");
        setShowSignup(false);
      } else {
        alert(error.message);
      }
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      alert("Please fill in both fields.");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, formData.email, formData.password);
      dispatch(login(formData.email, formData.password));
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
      phoneNumber: '',
    });
  };

  const handleSignupToggle = () => {
    setShowSignup((prev) => !prev);
    resetForm();
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

