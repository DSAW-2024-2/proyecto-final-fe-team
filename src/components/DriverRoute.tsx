// DriverRoute.tsx
import React, { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const DriverRoute: React.FC = () => {
    const [hasVehicle, setHasVehicle] = useState<boolean | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const userRole = localStorage.getItem('userRole');
    
    useEffect(() => {
        const checkVehicle = async () => {
            try {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                const token = localStorage.getItem('token');
                
                const response = await fetch(`${API_URL}/api/vehicles/my-car`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                setHasVehicle(response.ok);
            } catch (error) {
                setHasVehicle(false);
            } finally {
                setIsLoading(false);
            }
        };

        if (userRole === 'driver') {
            checkVehicle();
        }
    }, [userRole]);

    if (userRole !== 'driver') {
        return <Navigate to="/home" replace />;
    }

    if (isLoading) {
        return null; // O un componente de carga
    }

    if (hasVehicle === false) {
        return <Navigate to="/register-car" replace />;
    }

    return <Outlet />;
};

export default DriverRoute;