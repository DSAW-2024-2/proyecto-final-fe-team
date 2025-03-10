import React from 'react';
import { useNavigate } from 'react-router-dom';

const SuccessPage: React.FC = () => {

    const navigate = useNavigate();

    const handleNext = () => {
        navigate('/home-driver');
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-green relative overflow-hidden">
            {/* Ícono de éxito */}
            <div className="flex items-center justify-center w-16 h-16 md:w-20 md:h-20 bg-white rounded-full mb-4 md:mb-6">
                <svg className="w-8 h-8 md:w-10 md:h-10 text-teal-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a1 1 0 01-.7-.29l-4-4a1 1 0 111.4-1.42L10 15.59l7.3-7.3a1 1 0 011.4 1.42l-8 8A1 1 0 0110 18z" clipRule="evenodd" />
                </svg>
            </div>

            {/* Mensaje de Éxito */}
            <h1 className="text-white text-xl md:text-2xl font-bold mb-2">¡Éxito!</h1>
            <p className="text-white text-base md:text-lg mb-6 md:mb-10 text-center px-4 md:px-0">¡Haz creado un nuevo viaje!</p>

            {/* Botón de Siguiente */}
            <button
                onClick={handleNext}
                className="px-4 py-2 md:px-6 md:py-3 bg-white text-green-500 font-semibold rounded-full shadow-lg hover:bg-gray-100 focus:outline-none"
            >
                Siguiente
            </button>

            {/* Elementos decorativos */}
            <div className="absolute top-5 left-5 w-16 h-16 md:w-24 md:h-24 rounded-full bg-white opacity-20"></div>
            <div className="absolute top-1/4 left-5 w-20 h-20 md:w-32 md:h-32 border-2 border-blue-500 rounded-full opacity-30"></div>
            <div className="absolute top-2/4 left-0 transform rotate-45 w-40 h-40 md:w-72 md:h-72 rounded-full bg-transparent border-2 border-white opacity-20"></div>
            <div className="absolute top-10 right-5 w-16 h-16 md:w-20 md:h-20 bg-blue-500 rounded-full opacity-20"></div>
            <div className="absolute top-1/4 right-10 w-20 h-20 md:w-32 md:h-32 border-2 border-white rounded-full opacity-30"></div>
            <div className="absolute top-2/4 right-5 transform rotate-45 w-40 h-40 md:w-72 md:h-72 rounded-full bg-transparent border-2 border-white opacity-20"></div>
        </div>

    );
};

export default SuccessPage;