import React from 'react';
import { Navigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

const ProtectedRoute = ({ children }) => {
  const { authenticated, isAdmin, loading } = useAuth(); 

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!authenticated || !isAdmin) {
    return <Navigate to="/ErrorPage" />;
  }

  return children;
};

export default ProtectedRoute;
