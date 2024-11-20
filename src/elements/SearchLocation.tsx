import React, { useState, useEffect } from 'react';
import TravelCard from './TravelCard';

const SearchLocation: React.FC = () => {
  const [origin, setOrigin] = useState<string>(''); // Estado para "Origen"
  const [destination, setDestination] = useState<string>(''); // Estado para "Destino"
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

    // Filtrar viajes basados en origen y destino
    const trips = allTrips.filter((trip) => {
      const matchesOrigin = origin ? trip.origin.toLowerCase().includes(origin.toLowerCase()) : true;
      const matchesDestination = destination
        ? trip.destination.toLowerCase().includes(destination.toLowerCase())
        : true;
      return matchesOrigin && matchesDestination;
    });

    setFilteredTrips(trips);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-4 w-full max-w-md mx-auto bg-gray-100 rounded-lg shadow-md"
      >
        <p className="text-lg font-semibold text-blue">Selecciona el Origen y Destino</p>
        <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
          {/* Origen Input */}
          <div className="flex items-center space-x-2">
            <span className="text-blue">Origen</span>
            <div className="w-3 h-3 border-2 rounded-full border-green"></div>
            <input
              type="text"
              placeholder="Origen"
              value={origin}
              onChange={(e) => setOrigin(e.target.value)}
              className="flex-grow p-2 border rounded-3xl focus:ring-2 focus:ring-green focus:outline-none"
            />
          </div>

          {/* Destino Input */}
          <div className="flex items-center space-x-2">
            <span className="text-blue">Destino</span>
            <div className="w-3 h-3 rounded-full bg-green"></div>
            <input
              type="text"
              placeholder="Destino"
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              className="flex-grow p-2 border rounded-3xl focus:ring-2 focus:ring-green focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue text-white py-3 rounded-3xl hover:bg-blue-600 transition duration-200"
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

export default SearchLocation;