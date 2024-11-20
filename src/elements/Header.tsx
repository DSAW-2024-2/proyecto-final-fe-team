import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    type: string;
}

const Header: React.FC<HeaderProps> = ({ type }) => {
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    let text: string = "Busqueda de Viajes";
    let text1: string = "Reservas";
    if (type === "Conductor") {
        text = "Creacion de Viajes";
        text1 = "Vehiculo";
    }

    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState);
    };

    const handleTrip = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        localStorage.setItem('userRole', 'passenger');
        if (type === "Conductor") {
            navigate('/register-trip');
        } else {
            navigate('/search-trip');
        }
    };

    const handleChangeRole = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        if (type === "Conductor") {
            localStorage.setItem('userRole', 'passenger');
            navigate('/home');
        } else {
            localStorage.setItem('userRole', 'driver');
            navigate('/home-driver');
        }
    };

    const handleHome = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        if (type === "Conductor") {
            navigate('/home-driver');
        } else if (type === "Pasajero") {
            navigate('/home');
        }
    };

    const handleVehicleAndReservations = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        if (type === "Conductor") {
            navigate('/vehicle-info');
        } else if (type === "Pasajero") {
            navigate('/reservations');
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        navigate('/login');
        setIsMenuOpen(false);
    };

    return (
        <div className="w-full h-16 flex justify-between items-center px-5 mt-0 relative bg-white ">
            {/* Logo */}
            <img
                src="/assets/Wheel.png"
                alt="Logo"
                className="object-cover w-14 h-14 hidden md:flex cursor-pointer transition-transform transform hover:scale-105"
                onClick={handleHome}
            />
            {/* Menú hamburguesa */}
            <FontAwesomeIcon
                icon={faBars}
                className="text-blue hover:text-green md:hidden cursor-pointer"
                onClick={toggleMenu}
            />
            {/* Menú desktop */}
            <div className="hidden md:flex justify-between w-3/4 gap-5">
                <p className="text-blue font-bold hover:text-green cursor-pointer" onClick={handleTrip}>
                    {text}
                </p>
                <p className="text-blue font-bold hover:text-green cursor-pointer" onClick={handleVehicleAndReservations}>
                    {text1}
                </p>
                <p className="text-blue font-bold hover:text-green cursor-pointer" onClick={handleChangeRole}>
                    Cambiar de rol
                </p>
            </div>
            {/* Menú y usuario */}
            <div className="flex justify-between items-center">
                {type}
                <div
                    className="w-7 h-7 rounded-full bg-blue ml-3 cursor-pointer hover:scale-110 transition-transform"
                    onClick={toggleMenu}
                ></div>
                {isMenuOpen && (
                    <div className="fixed top-16 right-5 bg-white shadow-lg rounded-md w-40 py-2 z-50">
                        <p
                            onClick={handleHome}
                            className="px-4 py-2 text-blue hover:bg-gray-100 cursor-pointer"
                        >
                            Home
                        </p>
                        <p
                            onClick={() => {
                                navigate('/profile');
                                setIsMenuOpen(false);
                            }}
                            className="px-4 py-2 text-blue hover:bg-gray-100 cursor-pointer"
                        >
                            Ver Perfil
                        </p>
                        <p
                            onClick={handleTrip}
                            className="px-4 py-2 text-blue hover:bg-gray-100 cursor-pointer md:hidden"
                        >
                            {text}
                        </p>
                        <p
                            onClick={handleVehicleAndReservations}
                            className="px-4 py-2 text-blue hover:bg-gray-100 cursor-pointer md:hidden"
                        >
                            {text1}
                        </p>
                        <p
                            onClick={handleChangeRole}
                            className="px-4 py-2 text-blue hover:bg-gray-100 cursor-pointer  md:hidden"
                        >
                            Cambiar de rol
                        </p>
                        <p
                            onClick={handleLogout}
                            className="px-4 py-2 text-blue hover:bg-gray-100 cursor-pointer"
                        >
                            Cerrar Sesión
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Header;