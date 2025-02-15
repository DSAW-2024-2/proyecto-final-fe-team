import React, { useState } from 'react';
import Header from "../elements/Header.tsx";
import SearchMethod from '../elements/SearchMethod.tsx';
import SearchDateTime from '../elements/SearchDateTime.tsx';
import SearchPrice from '../elements/SearchPrice.tsx';
import SearchLocation from '../elements/SearchLocation.tsx';

const SearchTrip: React.FC = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const options = [
    { id: 1, label: 'Fecha ', component: <SearchDateTime /> },
    { id: 2, label: 'Partida y Destino', component: <SearchLocation/> },
    { id: 3, label: 'Precio', component: <SearchPrice /> }, // Reuse SearchLocation for price
    { id: 4, label: 'Métodos de Pago', component: <SearchMethod /> },
  ];

  // Function to handle option click
  const handleOptionClick = (id: number) => {
    const option = options.find((opt) => opt.id === id);
    if (option) {
      setSelectedOption(option.label);
    }
  };

  // Function to handle going back to options
  const handleBackClick = () => {
    setSelectedOption(null);
  };

  return (
    <div className="flex flex-col items-center min-h-screen md:mt-2">
      <Header type="Pasajero" />
      <div className="flex flex-col p-6 w-full justify-center items-center">
        {/* Header Content */}
        <h1 className="text-2xl font-bold md:mt-24 text-blue mb-4">
          ¿Cómo vas a hacer tu búsqueda hoy?
        </h1>
        <p className="text-gray-600 mb-6">
          Encuentra lo que necesitas rápido
        </p>

        {/* Display Options or Selected Component */}
        <div className="w-full max-w-md space-y-4">
          {selectedOption === null ? (
            options.map((option) => (
              <button
                key={option.id}
                onClick={() => handleOptionClick(option.id)}
                className="w-full py-3 px-4 bg-white text-blue text-center border rounded-2xl shadow hover:bg-blue hover:text-white transition duration-200"
              >
                {option.label}
              </button>
            ))
          ) : (
            <div>
              {/* Back Button */}
              <button
                onClick={handleBackClick}
                className="mb-4 px-4 py-2 bg-gray-200 text-blue rounded-lg shadow hover:bg-gray-300 transition duration-200"
              >
                Atrás
              </button>
              {/* Render the selected component */}
              {options.find((opt) => opt.label === selectedOption)?.component}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchTrip;