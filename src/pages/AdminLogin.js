import React, { useState } from 'react';
import { auth } from '../Firebase/firebase'; // Ensure the correct Firebase imports
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { login } from '../redux/authSlice'; // Adjust import based on your setup

function AdminLogin() {
    const dispatch = useDispatch(); // For dispatching login actions
    const [loginDetails, setLoginDetails] = useState({
        email: '',
        password: '',
    });

    const handleLoginChange = (e) => {
        const { id, value } = e.target;
        setLoginDetails((prevDetails) => ({ ...prevDetails, [id]: value }));
    };

    // Function to handle admin login with Firebase
    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        try {
            // Sign in with Firebase Authentication
            await signInWithEmailAndPassword(
                auth,
                loginDetails.email,
                loginDetails.password
            );

            // Dispatch login action with user role as 'admin'
            dispatch(login({ role: 'admin' }));

            alert('Admin login successful!');
        } catch (error) {
            console.error('Error logging in: ', error);
            alert('Error during admin login');
        }
    };

    return (
        <div className="admin-login">
            <h2>Admin Login</h2>
            <form className="login-form" onSubmit={handleLoginSubmit}>
                <div>
                    <label htmlFor="login-email">Email Address</label>
                    <input
                        type="email"
                        id="login-email"
                        value={loginDetails.email}
                        onChange={handleLoginChange}
                        placeholder="Enter your email"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="login-password">Password</label>
                    <input
                        type="password"
                        id="login-password"
                        value={loginDetails.password}
                        onChange={handleLoginChange}
                        placeholder="Enter your password"
                        required
                    />
                </div>

                <button type="submit">Login</button>
            </form>
        </div>
    );
}

export default AdminLogin;
