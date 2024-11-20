import React, { useEffect, useState } from "react";
import TravelCard from "../elements/TravelCard.tsx";
import SmallTravelCard from "../elements/SmallTravelCard.tsx";
import Header from "../elements/Header.tsx";
import SmallTravelCardText from "../elements/SmallTravelCardText.tsx";

// Definimos el tipo para los viajes
type Trip = {
  id: string;
  driverName: string;
  driverVehicle?: {
    rating?: number;
  };
  tripDate: string | Date;
  origin: string;
  destination: string;
  departureTime: string;
  arrivalTime: string;
  cost: number;
  affinity?: string;
};

function HomePage() {
  const [trips, setTrips] = useState<Trip[]>([]); // Definimos el tipo del estado
  const userName = localStorage.getItem("userName") || "Usuario"; // Obtener nombre de usuario desde localStorage

  useEffect(() => {
    const fetchTrips = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/trips`);
        const data = await response.json();

        if (data.success && Array.isArray(data.data)) {
          const now = new Date();

          const upcomingTrips = data.data.filter((trip: Trip) => {
            const tripDate = trip.tripDate instanceof Date ? trip.tripDate : new Date(trip.tripDate);
            if (isNaN(tripDate.getTime())) {
              console.warn("Fecha inválida en trip:", trip);
              return false;
            }

            // Excluir viajes creados por el usuario actual y que sean en el futuro
            return tripDate > now && trip.driverName !== userName;
          });

          setTrips(upcomingTrips);
        } else {
          console.error("Formato de respuesta inválido", data);
        }
      } catch (error) {
        console.error("Error al conectar con la API:", error);
      }
    };

    fetchTrips();
  }, [userName]); // Dependencia añadida para asegurarse de usar el valor actualizado de userName

  return (
    <div className="min-h-screen flex flex-col md:flex-row md:mt-2 items-center flex-wrap gap-4">
      <Header type="Pasajero" />
      <div className="w-full md:hidden">
        <p className="text-h1 text-blue font-bold w-full md:pl-20">Bienvenido {userName},</p>
        <p className="text-h2 text-blue font-bold w-full md:pl-20">Tu próximo viaje: </p>
        <div className="flex w-full h-min md:justify-start">
          <SmallTravelCard
            name="Laura Pérez"
            date="23 Sept"
            startLocation="Calle 45 Norte"
            endLocation="Universidad"
            startTime="9:00 AM"
            endTime="11:15 AM"
            cost={7000}
          />
        </div>
      </div>

      <div className="md:flex w-full justify-between space-x-4 mx-20 hidden">
        <div className="flex justify-between w-3/5 bg-green rounded-xl py-6 pr-11">
          <div className="flex flex-col justify-end mb-4">
            <p className="text-h1 text-blue font-bold w-full md:pl-20">Bienvenido {userName},</p>
            <p className="text-h2 text-blue w-full md:pl-20">¡Ten un lindo día!</p>
          </div>
          <img
            src="/assets/logoCircle.png"
            alt="Background with circles"
            className="object-cover w-2/6 hidden md:flex"
          />
        </div>

        <div className="flex flex-col w-2/5 bg-blue rounded-xl pt-9 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg">
          <p className="text-h2 text-white font-bold w-full md:pl-20">Tu próximo viaje: </p>
          <SmallTravelCardText
            name="Laura Pérez"
            date="23 Sept"
            startLocation="Calle 45 Norte"
            endLocation="Universidad"
            startTime="9:00 AM"
            endTime="11:15 AM"
            cost={7000}
            color="white"
          />
        </div>
      </div>

      <p className="text-h2 text-blue font-bold w-full md:pl-20 mt-5">Todos los viajes disponibles</p>

      {trips.length > 0 ? (
        trips.map((trip: Trip) => (
          <TravelCard
            key={trip.id}
            name={trip.driverName}
            rating={trip.driverVehicle?.rating || 0}
            date={(() => {
              const tripDate = trip.tripDate instanceof Date ? trip.tripDate : new Date(trip.tripDate);
              return tripDate
                .toLocaleDateString("es-ES", { month: "short", day: "numeric" })
                .replace(/^\w/, (c) => c.toUpperCase());
            })()}
            startLocation={trip.origin}
            endLocation={trip.destination}
            startTime={trip.departureTime}
            endTime={trip.arrivalTime}
            cost={trip.cost}
            affinity={trip.affinity || "N/A"}
            imageVehicle="https://via.placeholder.com/150"
          />
        ))
      ) : (
        <p className="text-blue md:pl-20 mt-5">No hay viajes disponibles en este momento.</p>
      )}
    </div>
  );
}

export default HomePage;