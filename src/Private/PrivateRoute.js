import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children, role }) => {
    const auth = useSelector((state) => state.auth);

    if (!auth.isAuthenticated) {
        return <Navigate to="/user-login" />;
    }

    if (role && auth.userRole !== role) {
        return <Navigate to="/" />; // Redirect if not the right role
    }

    return children; // If authenticated and has the right role, render the children
};

export default PrivateRoute;
