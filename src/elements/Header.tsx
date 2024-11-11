import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';

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

    return (

            <div className="w-full h-16 flex justify-between items-center px-5  mt-0 ">
                <img
                    src="/src/assets/Wheel.png"
                    alt="Background with circles"
                    className="object-cover w-14 h-14 hidden md:flex cursor-pointer transition-transform transform hover:scale-105"
                />
                <FontAwesomeIcon icon={faBars} className='text-blue hover:text-green md:hidden' />
                <p className='hidden md:flex text-blue font-bold hover:text-green'>{text}</p>
                <p className='hidden md:flex text-blue font-bold hover:text-green'>{text1}</p>
                <p className='hidden md:flex text-blue font-bold hover:text-green'>Historial de Viajes</p>
                <p className='hidden md:flex text-blue font-bold hover:text-green'>Cambiar de rol</p>
                <div className='flex justify-between items-center '>
                    {type}
                    <div className="w-7 h-7 rounded-full bg-blue ml-3 hover:size-10">
                    </div>
                </div>
            </div>


    );
};

export default Header;
