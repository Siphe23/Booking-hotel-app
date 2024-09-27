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
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="facebook-icon.png" alt="Facebook" />
                    </a>
                    <a href="mailto:nattfhub@gmail.com">
                        <img src="mail-icon.png" alt="Mail" />
                    </a>
                    <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <img src="linkedin-icon.png" alt="LinkedIn" />
                    </a>
                </div>

                <div className="newsletter">
                    <h4>Subscribe to our newsletter</h4>
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
                    <li><a href="/login"></a>Login</li>
                    <li><a href="/register">Register</a></li>
                </ul>
                <p>© 2024 Your Company Name. All Rights Reserved.</p>
            </div>
        </footer>
    );
}

export default Footer;
