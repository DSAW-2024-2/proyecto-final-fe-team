import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PassengerRoute: React.FC = () => {
    const userRole = localStorage.getItem('userRole');
    
    if (userRole !== 'passenger') {
        return <Navigate to="/home-driver" replace />;
    }

    return <Outlet />;
};

export default PassengerRoute;