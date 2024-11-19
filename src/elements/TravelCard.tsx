
import React from 'react';

interface TravelCardProps {
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
  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }).map((_, i) => (
      <span key={i} className={`text-xl ${i < rating ? 'text-blue' : 'text-green'}`}>
        ★
      </span>
    ));
  };



  return (
    <div className="flex flex-col bg-white shadow-md rounded-lg overflow-hidden w-80 mx-auto mt-3 border border-gray-200 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg">
      <img src={imageVehicle} alt="Vehicle" className="w-full h-40 object-cover rounded-t-lg" />
      <div className="p-4 flex flex-col justify-between w-full">
        <div className="flex items-center mb-3">
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center mr-3">
            <span className="text-4xl w-12 h-12 text-blue flex  justify-center items-center ml-0.5">👤</span>
          </div>
          <div>
            <h3 className="text-h1 text-blue">{name}</h3>
            <div className="flex items-center ">
              <span className="text-sm text-gray-500">Calificación:</span>
              <div className="ml-1">{renderStars(rating)}</div>
            </div>
          </div>
        </div>
        <div className="flex mb-3 items-center">
          <div className="flex flex-col items-center justify-center mr-4">
            <p className="text-h1 font-bold text-blue">{date.split(" ")[0]}</p>
            <p className="text-h1 text-blue">
              {date.split(" ")[1]?.replace(/^\w/, (c) => c.toUpperCase())}
            </p>
          </div>
          <div className="flex flex-col justify-between ">
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
        <button className="mt-4 bg-green hover:bg-blue text-white text-sm font-medium py-2 rounded-3xl transition">
          Ver Viaje
        </button>
      </div>
    </div>

  );
};

export default TravelCard;
