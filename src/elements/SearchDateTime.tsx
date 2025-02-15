import React, { useState, useEffect } from 'react';
import TravelCard from './TravelCard';

const SearchDateTime: React.FC = () => {
  const [date, setDate] = useState({ day: '15', month: '09', year: '2024' }); // Mes en formato '09'
  const [allTrips, setAllTrips] = useState<any[]>([]);
  const [filteredTrips, setFilteredTrips] = useState<any[]>([]);

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

  // Manejar cambios en el formulario
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setDate((prevDate) => ({
      ...prevDate,
      [name]: value,
    }));
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();

    // Construir la fecha seleccionada basada en año, mes y día
    const selectedDate = new Date(Number(date.year), Number(date.month) - 1, Number(date.day));

    // Filtrar viajes basados en la fecha completa
    const trips = allTrips.filter((trip) => {
      const tripDate = new Date(trip.tripDate);

      // Comparar solo el año, mes y día
      return (
        tripDate.getFullYear() === selectedDate.getFullYear() &&
        tripDate.getMonth() === selectedDate.getMonth() &&
        tripDate.getDate() === selectedDate.getDate()
      );
    });

    setFilteredTrips(trips);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleFilter}
        className="space-y-6 p-4 bg-gray-100 rounded-lg shadow-md w-full max-w-md mx-auto"
      >
        <p className="text-lg font-semibold text-blue-600">Selecciona la Fecha</p>
        <div className="flex space-x-4">
          {/* Día */}
          <input
            type="number"
            name="day"
            value={date.day}
            onChange={handleInputChange}
            className="w-16 p-2 border text-center text-blue focus:outline-none focus:ring-2 focus:ring-blue"
          />
          {/* Mes */}
          <input
            type="number"
            name="month"
            value={date.month}
            onChange={handleInputChange}
            className="w-16 p-2 border text-center text-blue focus:outline-none focus:ring-2 focus:ring-blue"
            placeholder="MM"
          />
          {/* Año */}
          <input
            type="number"
            name="year"
            value={date.year}
            onChange={handleInputChange}
            className="w-20 p-2 border text-center text-blue focus:outline-none focus:ring-2 focus:ring-blue"
            placeholder="YYYY"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200"
        >
          Filtrar
        </button>
      </form>

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

export default SearchDateTime;