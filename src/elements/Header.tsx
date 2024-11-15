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

    return (
        <div className="w-full h-16 flex justify-between items-center px-5 mt-0 relative">
            <img
                src="/src/assets/Wheel.png"
                alt="Background with circles"
                className="object-cover w-14 h-14 hidden md:flex cursor-pointer transition-transform transform hover:scale-105"
                onClick={() => navigate('/home')}
            />
            <FontAwesomeIcon icon={faBars} className='text-blue hover:text-green md:hidden' />
            <p className='hidden md:flex text-blue font-bold hover:text-green'>{text}</p>
            <p className='hidden md:flex text-blue font-bold hover:text-green'>{text1}</p>
            <p className='hidden md:flex text-blue font-bold hover:text-green'>Historial de Viajes</p>
            <p className='hidden md:flex text-blue font-bold hover:text-green'>Cambiar de rol</p>
            <div className='flex justify-between items-center'>
                {type}
                <div
                    className="w-7 h-7 rounded-full bg-blue ml-3 cursor-pointer"
                    onClick={toggleMenu}
                ></div>
                {isMenuOpen && (
                    <div className="fixed top-16 right-5 bg-white shadow-lg rounded-md w-40 py-2 z-50">
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
                            onClick={() => {
                                // Aquí puedes agregar la lógica para cerrar sesión
                                setIsMenuOpen(false);
                            }}
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