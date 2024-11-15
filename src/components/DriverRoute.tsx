import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const DriverRoute: React.FC = () => {
    const userRole = localStorage.getItem('userRole');
    
    if (userRole !== 'driver') {
        return <Navigate to="/home" replace />;
    }

    return <Outlet />;
};

export default DriverRoute;