import { Navigate, Outlet } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';

const PublicRoute = () => {
  
  if (isTokenValid()) {
    return <Navigate to="/rol" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;