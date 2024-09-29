import React from 'react';
import '../assets/footer.css'; // Adjust the path as needed

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="contact-info">
          <h4>Contact Us</h4>
          <p>Email: info@hotelhub.com</p>
          <p>Phone: +27 123 456 789</p>
        </div>

        <div className="socials">
          <h4>Follow Us</h4>
          <img src="facebook-icon.png" alt="Facebook" />
          <img src="twitter-icon.png" alt="Twitter" />
        </div>

        <div className="newsletter">
          <h4>Subscribe to our Newsletter</h4>
          <form>
            <input type="email" placeholder="Enter your email" />
            <button type="submit">Subscribe</button>
          </form>
        </div>
      </div>

            <div className="bottom-footer">
                <ul className="footer-nav">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/ourhotels">Our Hotels</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
                <p>© 2024 Your Company Name. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
