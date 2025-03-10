import React from "react";
import Header from "../elements/Header";
import ReservationCard from "../elements/ReservationCard";

const SearchTrip: React.FC = () => {
  return (
    <div className="flex flex-col items-center min-h-screen">
      <Header type="Pasajero" />
      <div className="min-h-screen bg-blue-200 flex items-center justify-center p-4">
        
        <ReservationCard
          date="15 Septiembre 2024"
          vehicle="2021 Audi Q3"
          plate="VER 457"
          departure={{
            address: "Carrera 7",
            time: "7:00 am",
          }}
          destination={{
            address: "Universidad",
            time: "9:00 am",
          }}
        />
      </div>
    </div>
  );
};

export default SearchTrip;