
import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/navbar.css'; 

function Navbar() {
  return (
    <nav className="navbar">
      <div className="icon">
        <h1>HotelHub</h1>
      </div>
      <ul className="nav-links">
        <li><Link to="/home"><i className="fas fa-home"></i> Home</Link></li>
        <li><Link to="/ourhotels"><i className="fas fa-hotel"></i> Our Hotels</Link></li>
        <li><Link to="/about"><i className="fas fa-info-circle"></i> About</Link></li>
        <li><Link to="/profile"><i className="fas fa-user"></i> Profile</Link></li>
        <li>
          <button className="book-now-button">
            <i className="fas fa-book"></i> Book Now
          </button>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;


