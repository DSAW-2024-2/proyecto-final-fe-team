import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';

interface ProtectedRouteProps {
  redirectPath?: string;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  redirectPath = '/start'
}) => {
  const isAuthenticated = isTokenValid();

  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  if (onclick && !isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;