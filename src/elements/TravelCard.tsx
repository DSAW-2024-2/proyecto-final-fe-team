// TravelCard.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface TravelCardProps {
  id: string;
  name: string;
  rating: number;
  date: string;
  startLocation: string;
  endLocation: string;
  startTime: string;
  endTime: string;
  cost: number;
  affinity: string;
  imageVehicle: string;
}

const TravelCard: React.FC<TravelCardProps> = ({
  id,
  name,
  rating,
  date,
  startLocation,
  endLocation,
  startTime,
  endTime,
  cost,
  affinity,
  imageVehicle,
}) => {
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-blue' : 'text-green'}`}>
        ★
      </span>
    ));
  };

  const handleViewTrip = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/trip/${id}`);
  };

  // Verificar si imageVehicle es una cadena base64 válida
  const isValidBase64 = () => {
    return typeof imageVehicle === 'string' && 
           (imageVehicle.startsWith('data:image') || 
            /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/.test(imageVehicle));
  };

  // Asegurarse de que la cadena base64 tenga el prefijo correcto
  const getImageSrc = () => {
    if (!imageVehicle) return '';
    
    if (imageVehicle.startsWith('data:image')) {
      return imageVehicle;
    } else if (isValidBase64()) {
      return `data:image/jpeg;base64,${imageVehicle}`;
    } else {
      // Fallback para rutas de imagen regulares
      return imageVehicle;
    }
  };

  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden w-80 mx-auto mt-3 border border-gray-200 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg">
      <div className="w-full h-48 overflow-hidden bg-gray-200">
        {!imageError && imageVehicle ? (
          <img
            src={getImageSrc()}
            alt="Vehicle"
            className="w-full h-full object-cover rounded-t-lg shadow-sm hover:opacity-90 transition-opacity"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-200">
            <span className="text-4xl text-gray-400">🚗</span>
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col justify-between w-full">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            <span className="text-2xl text-gray-600">👤</span>
          </div>
          <div>
            <h3 className="text-h1 text-blue">{name}</h3>
            <div className="flex items-center">
              <span className="text-sm text-gray-500">Calificación:</span>
              <div className="ml-1">{renderStars(rating)}</div>
            </div>
          </div>
        </div>
        <div className="flex mb-3 items-center">
          <div className="flex flex-col items-center justify-center mr-4">
            <p className="text-h1 font-bold text-blue">{date.split(" ")[0]}</p>
            <p className="text-h1 text-blue">{date.split(" ")[1]}</p>
          </div>
          <div className="flex flex-col justify-between">
            <div className="flex items-center mb-1">
              <div className="w-3 h-3 border-2 rounded-full border-green mr-2"></div>
              <p className="text-blue text-p">{startLocation}</p>
              <p className="text-gray-600 text-p ml-2">{startTime}</p>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 rounded-full bg-green mr-2"></div>
              <p className="text-blue text-p">{endLocation}</p>
              <p className="text-gray-600 text-p ml-2">{endTime}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-between mr-4 ml-14">
          <p className="text-blue text-sm">Costo: ${cost}</p>
          <p className="text-sm text-blue">Afinidad: {affinity}</p>
        </div>
        <button 
          onClick={handleViewTrip}
          className="mt-4 bg-green hover:bg-blue text-white text-sm font-medium py-2 rounded-3xl transition"
        >
          Ver Viaje
        </button>
      </div>
    </div>
  );
};

export default TravelCard;