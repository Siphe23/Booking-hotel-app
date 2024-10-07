import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; 
import '../assets/navbar.css';

function Navbar() {
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth); 

  const handleBookNow = () => {
    navigate('/booknow');
  };

  return (
    <nav className="navbar">
      <div className="icon">
        <h1>HotelHub</h1>
      </div>
      <ul className="nav-links">
        {/* Links for Admin Users */}
        {auth.isAuthenticated && auth.userRole === 'admin' && (
          <>
            <li><Link to="/admin-home"><i className="fas fa-home"></i> Home Admin</Link></li>
            <li><Link to="/admin-dashboard"><i className="fas fa-cog"></i> Admin Dashboard</Link></li>
            <li><Link to="/admin-login"><i className="fas fa-user"></i> Admin Login</Link></li>
          </>
        )}

        {/* Links for Regular Users */}
        {auth.isAuthenticated && auth.userRole === 'user' && (
          <>
            <li><Link to="/home"><i className="fas fa-home"></i> Home</Link></li>
            <li><Link to="/ourhotels"><i className="fas fa-hotel"></i> Our Hotels</Link></li>
            <li><Link to="/profile"><i className="fas fa-user"></i> Profile</Link></li>
            <li>
              <button className="book-now-button" onClick={handleBookNow}>
                <i className="fas fa-book"></i> Book Now
              </button>
            </li>
          </>
        )}

        {/* Admin Login for Non-authenticated Users */}
        {!auth.isAuthenticated && (
          <li><Link to="/admin-login"><i className="fas fa-user"></i> Admin Login</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;