import React, { useEffect, useState } from "react";

interface ReservationCardProps {
  date: string;
  vehicle: string;
  plate: string;
  departure: {
    address: string;
    time: string;
  };
  destination: {
    address: string;
    time: string;
  };
  password?: string; // La contraseña es opcional
}

const ReservationCard: React.FC<ReservationCardProps> = ({
  date,
  vehicle,
  plate,
  departure,
  destination,
  password,
}) => {
  const [randomPassword, setRandomPassword] = useState<string>("");

  useEffect(() => {
    if (!password) {
      // Genera una contraseña si no se proporciona
      setRandomPassword(generateRandomPassword());
    }
  }, [password]);

  const generateRandomPassword = (): string => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    return randomNumber.toString();
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-lg md:max-w-2xl mx-auto">
      {/* Header */}
      <div className="md:bg-blue text-white p-4 flex items-center gap-3">
        <span className="text-2xl">🚗</span>
        <h3 className="text-lg font-bold">Reserva</h3>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Date */}
        <div className="mb-4">
          <h4 className="text-blue font-semibold">RESERVA PARA</h4>
          <p className="text-gray-700">{date}</p>
        </div>

        {/* Vehicle */}
        <div className="mb-4">
          <h4 className="text-blue font-semibold">VEHÍCULO</h4>
          <p className="text-gray-700">{vehicle} • {plate}</p>
        </div>

        {/* Departure */}
        <div className="mb-4">
          <h4 className="text-blue font-semibold">PARTIDA</h4>
          <p className="text-gray-700">
            Dirección: {departure.address} <br />
            Hora: {departure.time}
          </p>
        </div>

        {/* Destination */}
        <div className="mb-4">
          <h4 className="text-blue font-semibold">Destino</h4>
          <p className="text-gray-700">
            Dirección: {destination.address} <br />
            Hora: {destination.time}
          </p>
        </div>

        {/* Password */}
        <div className="text-center bg-gray-100 p-4 rounded-lg">
          <h4 className="text-blue-900 font-semibold">Contraseña de Ingreso:</h4>
          <p className="text-xl font-bold text-gray-800">
            {password || randomPassword}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ReservationCard;