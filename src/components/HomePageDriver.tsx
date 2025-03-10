
import { useState, useEffect } from 'react';
import TravelCard from '../elements/TravelCard';
import SmallTravelCard from '../elements/SmallTravelCard';
import Header from '../elements/Header';
import SmallTravelCardText from '../elements/SmallTravelCardText';

interface Trip {
  id: string;
  driverId: string;
  driverName: string;
  driverVehicle: {
    plate: string;
    color: string;
    brand: string;
    model: string;
    availableSeats: number;
    carImage: string;
  };
  tripDate: string;
  origin: string;
  destination: string;
  arrivalTime: string;
  departureTime: string;
  cost: number;
  paymentMethods: string[];
  routeTag: string;
  affinity: string;
  description: string;
  status: string;
  passengers: string[];
  availableSeats: number;
}

function HomePageDriver() {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [nextTrip, setNextTrip] = useState<Trip | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const userName = localStorage.getItem('userName') || 'Usuario';

  useEffect(() => {
    fetchTrips();
  }, []);

  const fetchTrips = async () => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
      const token = localStorage.getItem('token');

      if (!token) {
        throw new Error('No hay sesión activa');
      }

      const tokenParts = token.split('.');
      const payload = JSON.parse(atob(tokenParts[1]));
      const currentUserId = payload.id;

      const response = await fetch(`${API_URL}/api/trips`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        credentials: 'include'
      });

      if (!response.ok) {
        throw new Error('Error al obtener los viajes');
      }

      const data = await response.json();
      
      if (!data.data || !Array.isArray(data.data)) {
        throw new Error('Formato de datos inválido');
      }

      const userTrips = data.data.filter((trip: Trip) => trip.driverId === currentUserId);
      const sortedTrips = userTrips.sort((a: Trip, b: Trip) => {
        return new Date(a.tripDate).getTime() - new Date(b.tripDate).getTime();
      });

      setTrips(sortedTrips);

      const now = new Date();
      const nextTrip = sortedTrips.find((trip: Trip) => new Date(trip.tripDate) > now);
      setNextTrip(nextTrip || null);

    } catch (error) {
      console.error('Error fetching trips:', error);
      setError(error instanceof Error ? error.message : 'Error desconocido');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-blue">Cargando viajes...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:mt-2 items-center flex-wrap gap-4">
      <Header type="Conductor" />

      <div className='w-full md:hidden px-4'>
        <p className='text-h1 text-blue font-bold w-full'>Bienvenido {userName},</p>
        <p className='text-h2 text-blue font-bold w-full'>Tu próximo viaje: </p>
        <div className="flex w-full h-min justify-center md:justify-start">
          {nextTrip && (
            <SmallTravelCard
              name={nextTrip.driverName}
              date={new Date(nextTrip.tripDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
              startLocation={nextTrip.origin}
              endLocation={nextTrip.destination}
              startTime={nextTrip.departureTime}
              endTime={nextTrip.arrivalTime}
              cost={nextTrip.cost}
            />
          )}
        </div>
      </div>

      <div className='md:flex w-full justify-between space-x-4 mx-4 md:mx-20 hidden'>
        <div className='flex justify-between w-3/5 bg-blue rounded-xl py-6 pr-11'>
          <div className='flex flex-col justify-end mb-4'>
            <p className='text-h1 text-white font-bold w-full pl-8 md:pl-20'>Bienvenido {userName},</p>
            <p className='text-h2 text-white w-full pl-8 md:pl-20'>¡Ten un lindo día!</p>
          </div>
          <img
            src="/Logo-home.png"
            alt="Background with circles"
            className="object-cover w-2/6 hidden md:flex"
          />
        </div>

        <div className='flex flex-col w-2/5 bg-green rounded-xl justify-center cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg'>
          <p className='text-h2 text-blue font-bold w-full pl-8 md:pl-20'>Tu próximo viaje: </p>
          {nextTrip && (
            <SmallTravelCardText
              name={nextTrip.driverName}
              date={new Date(nextTrip.tripDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
              startLocation={nextTrip.origin}
              endLocation={nextTrip.destination}
              startTime={nextTrip.departureTime}
              endTime={nextTrip.arrivalTime}
              cost={nextTrip.cost}
              color="blue"
            />
          )}
        </div>
      </div>

      <p className='text-h2 text-blue font-bold w-full pl-4 md:pl-20 mt-5'>
        Todos tus viajes
      </p>

      <div className="w-full px-4 md:px-20 flex flex-wrap justify-center md:justify-start gap-4">
        {trips.length === 0 ? (
          <div className="text-center w-full">
            <p className="text-gray-500 mb-4">No tienes viajes programados.</p>
            <button 
              onClick={() => window.location.href = '/register-trip'}
              className="bg-green hover:bg-blue text-white font-bold py-2 px-4 rounded-full transition-colors"
            >
              Crear nuevo viaje
            </button>
          </div>
        ) : (
          trips.map((trip) => (
            <TravelCard
              key={trip.id}
              id={trip.id}
              name={trip.driverName}
              rating={4}
              date={new Date(trip.tripDate).toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}
              startLocation={trip.origin}
              endLocation={trip.destination}
              startTime={trip.departureTime}
              endTime={trip.arrivalTime}
              cost={trip.cost}
              affinity={trip.affinity}
              imageVehicle={trip.driverVehicle.carImage}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default HomePageDriver;