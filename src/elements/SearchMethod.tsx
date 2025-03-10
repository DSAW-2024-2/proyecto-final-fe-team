import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard } from '@fortawesome/free-solid-svg-icons';
import TravelCard from './TravelCard';

interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
}

const SearchMethod: React.FC = () => {
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: 'nequi', name: 'Nequi', enabled: false },
    { id: 'daviplata', name: 'Daviplata', enabled: false },
    { id: 'efectivo', name: 'Efectivo', enabled: false },
  ]);
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

  // Alternar el estado 'enabled' de un método de pago
  const handlePaymentMethodToggle = (id: string) => {
    setPaymentMethods((prevMethods) =>
      prevMethods.map((method) =>
        method.id === id ? { ...method, enabled: !method.enabled } : method
      )
    );
  };

  // Filtrar viajes por los métodos de pago seleccionados
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const selectedMethods = paymentMethods
      .filter((method) => method.enabled)
      .map((method) => method.name.toLowerCase());

    if (selectedMethods.length === 0) {
      setFilteredTrips(allTrips); // Si no se selecciona ningún método, mostrar todos los viajes
      return;
    }

    const trips = allTrips.filter((trip) => {
      const tripMethods = trip.paymentMethods.map((method: string) =>
        method.toLowerCase()
      );
      return selectedMethods.some((method) => tripMethods.includes(method));
    });

    setFilteredTrips(trips);
  };

  return (
    <div className="space-y-6">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-4 w-full max-w-md mx-auto bg-gray-100 rounded-lg shadow-md"
      >
        <p className="text-lg font-semibold text-blue">
          Selecciona los métodos de pago que quieres buscar
        </p>
        <div className="space-y-3">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              type="button"
              onClick={() => handlePaymentMethodToggle(method.id)}
              className={`w-full p-3 rounded-3xl flex items-center justify-between transition duration-200 ${
                method.enabled
                  ? 'bg-blue text-white'
                  : 'bg-white text-blue border border-gray-300'
              }`}
            >
              <span>{method.name}</span>
              <FontAwesomeIcon icon={faCreditCard} />
            </button>
          ))}
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

export default SearchMethod;