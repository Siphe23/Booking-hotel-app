import React from 'react';
import { Link } from 'react-router-dom';
import '../assets/navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="icon">
        <h1>Hotelhub</h1> {/* Apply h1 inside the icon div */}
      </div>
      <ul className="nav-links">
        <li><Link to="/home"><i className="fas fa-home"></i> Home</Link></li>
        <li><Link to="/ourhotels"><i className="fas fa-hotel"></i> Our Hotels</Link></li>
        <li><Link to="/profile"><i className="fas fa-user"></i> Profile</Link></li>
        <li>
          {/* Use Link with button styling */}
          <Link to="/booknow" className="book-now-button">
            <i className="fas fa-book"></i> Book Now
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;

