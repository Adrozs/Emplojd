import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
    const { isLoggedIn } = useAuth();

    return isLoggedIn ? children : <Navigate to="/signin" replace />;
};

export default ProtectedRoute;