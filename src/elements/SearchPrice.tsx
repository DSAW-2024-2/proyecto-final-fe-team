import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign } from '@fortawesome/free-solid-svg-icons';
import TravelCard from './TravelCard';

const SearchPrice: React.FC = () => {
  const [cost, setCost] = useState<string>(''); // Estado para el costo
  const [allTrips, setAllTrips] = useState<any[]>([]); // Todos los viajes
  const [filteredTrips, setFilteredTrips] = useState<any[]>([]); // Resultados filtrados

  // Cargar todos los viajes al inicio
  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setAllTrips(data.data);
        setFilteredTrips(data.data); // Inicialmente muestra todos los viajes
      } catch (error) {
        console.error('Error fetching trips:', error);
      }
    };

    fetchTrips();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar el costo ingresado
    const numericCost = Number(cost);
    if (isNaN(numericCost)) {
      alert('Por favor, introduce un costo válido.');
      return;
    }

    // Filtrar viajes basados en el costo exacto ingresado
    const trips = allTrips.filter((trip) => {
      return trip.cost === numericCost; // Comparar estrictamente con el mismo tipo
    });

    setFilteredTrips(trips);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-4 w-full max-w-md mx-auto bg-gray-100 rounded-lg shadow-md"
      >
        <p className="text-lg font-semibold text-blue">Filtrar por costo</p>

        {/* Cost Input */}
        <div className="flex items-center space-x-2">
          <FontAwesomeIcon icon={faDollarSign} className="text-blue" />
          <input
            type="number"
            placeholder="Costo exacto"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            className="flex-grow p-2 border rounded-lg focus:ring-2 focus:ring-blue focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue text-white py-3 rounded-3xl hover:bg-green transition duration-200"
        >
          Buscar
        </button>
      </form>

      {/* Mostrar resultados filtrados */}
      <div className="mt-6 space-y-4">
        {filteredTrips.map((trip) => (
          <TravelCard
            key={trip.id}
            name={trip.driverName}
            rating={trip.driverVehicle?.rating || 0}
            date={(() => {
              const tripDate = trip.tripDate instanceof Date ? trip.tripDate : new Date(trip.tripDate);
              const formattedDate = tripDate.toLocaleDateString('es-ES', { month: 'short', day: 'numeric' });
              
              // Capitalizar manualmente la primera letra
              return formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
            })()}
            startLocation={trip.origin}
            endLocation={trip.destination}
            startTime={trip.departureTime}
            endTime={trip.arrivalTime}
            cost={trip.cost}
            affinity={trip.affinity || 'N/A'}
            imageVehicle="https://via.placeholder.com/150"
          />
        ))}
      </div>
    </div>
  );
};

export default SearchPrice;