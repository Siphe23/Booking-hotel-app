import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth'; 
import { auth } from '../Firebase/firebase'; // Ensure this path is correct
import '../assets/navbar.css';

function Navbar() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user); // Simplified user authentication check
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate('/'); 
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <nav className="navbar">
      <div className="icon">
        <h1>Hotelhub</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/home"><i className="fas fa-home"></i> Home</Link></li>
        <li><Link to="/ourhotels"><i className="fas fa-hotel"></i> Our Hotels</Link></li>
        <li><Link to="/profile"><i className="fas fa-user"></i> Profile</Link></li>
        <li>
          {isAuthenticated ? (
            <>
              <li><Link to="/paymentForm"><i className="fas fa-credit-card"></i> Pay Now</Link></li>
              <Link to="/booknow" className="btn btn-default">
                <i className="fas fa-book"></i> Book Now
              </Link>
              <button onClick={handleLogout} className="btn btn-default">
                <i className="fas fa-sign-out-alt"></i> Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/profile" className="auth-button">
                <i className="fas fa-sign-in-alt"></i> Login
              </Link>
              <Link to="/profile" className="auth-button">
                <i className="fas fa-user-plus"></i> Signup
              </Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;