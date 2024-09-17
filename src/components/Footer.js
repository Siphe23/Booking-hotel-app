import React from 'react';
import '../assets/footer.css';

function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="contact-info">
                    <h4>Contact us:</h4>
                    <p>0987 199 7665</p>
                    <p>nattfhub@gmail.com</p>
                </div>

                <div className="socials">
                    <h4>Socials:</h4>
                    <a href="#"><img src="facebook-icon.png" alt="Facebook" /></a>
                    <a href="#"><img src="mail-icon.png" alt="Mail" /></a>
                    <a href="#"><img src="linkedin-icon.png" alt="LinkedIn" /></a>
                </div>

                <div className="newsletter">
                    <h4>Search for news letter</h4>
                    <form>
                        <input type="text" placeholder="Enter your email" />
                        <button type="submit">Search</button>
                    </form>
                </div>
            </div>

            <div className="bottom-footer">
                <ul className="footer-nav">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/ourhotels">Our Hotel</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/profile">Profile</a></li>
                </ul>
                <p>© 2024 Your Company Name. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
