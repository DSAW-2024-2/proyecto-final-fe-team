import Header from "../elements/Header";
import TravelCard from "../elements/TravelCard";

import { useState, useEffect } from "react";

function BookingPage() {
  const [trips, setTrips] = useState<any[]>([]);

  useEffect(() => {
    // Fetch trips data from an API or define it here
    const fetchTrips = async () => {
      // Example data
      const data = [
        {
          id: 1,
          driverName: "John Doe",
          tripDate: "2023-10-01",
          origin: "City A",
          destination: "City B",
          departureTime: "08:00",
          arrivalTime: "10:00",
          cost: 20,
          affinity: 90,
          driverVehicle: { carImage: "car.jpg" },
        },
      ];
      setTrips(data);
    };

    fetchTrips();
  }, []);
  return (
    <div className="md:mt-2">

      <Header type="Pasajero" />

      <div className="w-full px-4 md:px-20 flex flex-wrap justify-center md:justify-start gap-4">
        {trips.length === 0 ? (
          <p className="text-gray-500 text-center w-full">No hay viajes disponibles en este momento.</p>
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

export default BookingPage;