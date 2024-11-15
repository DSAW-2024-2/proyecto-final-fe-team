import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface HeaderProps {
    type: string;
}

const Header: React.FC<HeaderProps> = ({
    type,
}) => {

       let text: string= "Busqueda de Viajes";
       let text1: string= "Reservas";

    if(type=="Conductor"){
         text= "Creacion de Viajes";
         text1= "Vehiculo";
    }

    const navigate = useNavigate();

    const handleTrip = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        localStorage.setItem('userRole', 'passenger');
        if (type == "Conductor") {
            navigate('/register-trip');
        }
        else {
            navigate('/search-trip'); 
        }
    }

    const handleChangeRole = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        if (type == "Conductor") {
            localStorage.setItem('userRole', 'passenger');
            navigate('/home');
        }
        else {
            localStorage.setItem('userRole', 'driver');
            navigate('/home-driver');
        }
    }

    const handleHome = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        if (type == "Conductor") {
            navigate('/home-driver');
        }
        else if (type == "Pasajero") {
            navigate('/home');
        }
    }

    const handleVehicleAndReservations = (e: React.MouseEvent<HTMLParagraphElement>) => {
        e.preventDefault();
        if (type == "Conductor") {
            navigate('/vehicle-info');
        }
        else if (type == "Pasajero") {
            navigate('/reservations');
        }
    }

    return (

            <div className="w-full h-16 flex justify-between items-center px-5  mt-0 ">
                <img
                    src="/src/assets/Wheel.png"
                    alt="Background with circles"
                    className="object-cover w-14 h-14 hidden md:flex cursor-pointer transition-transform transform hover:scale-105"
                    onClick={handleHome}
                />
                <FontAwesomeIcon icon={faBars} className='text-blue hover:text-green md:hidden' />
                <p className='hidden md:flex text-blue font-bold hover:text-green' onClick={handleTrip}>{text}</p>
                <p className='hidden md:flex text-blue font-bold hover:text-green' onClick={handleVehicleAndReservations}>{text1}</p>
                <p className='hidden md:flex text-blue font-bold hover:text-green'>Historial de Viajes</p>
                <p className='hidden md:flex text-blue font-bold hover:text-green' onClick={handleChangeRole}>Cambiar de rol</p>
                <div className='flex justify-between items-center '>
                    {type}
                    <div className="w-7 h-7 rounded-full bg-blue ml-3 hover:size-10">
                    </div>
                </div>
            </div>


    );
};

export default Header;
