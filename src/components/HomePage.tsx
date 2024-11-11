
import TravelCard from '../elements/TravelCard.tsx';
import SmallTravelCard from '../elements/SmallTravelCard.tsx';
import Header from '../elements/Header.tsx';
import SmallTravelCardText from '../elements/SmallTravelCardText.tsx';


function HomePage() {
  
  const userName = localStorage.getItem('userName') || 'Usuario';
  
  return (


    <div className="min-h-screen flex flex-col md:flex-row md:mt-2 items-center flex-wrap gap-4">
      <Header
        type="Pasajero"
      />
      <div className='w-full md:hidden'>
        <p className='text-h1 text-blue font-bold w-full md:pl-20'>Bienvenido {userName},</p>
        <p className='text-h2 text-blue font-bold w-full md:pl-20'>Tu proximo viaje: </p>
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

      <div className='md:flex w-full justify-between space-x-4 mx-20 hidden '>
        <div className='flex justify-between w-3/5 bg-green rounded-xl py-6 pr-11'>
          <div className='flex flex-col justify-end mb-4 '>
            <p className='text-h1 text-blue font-bold w-full md:pl-20'>Bienvenido {userName},</p>
            <p className='text-h2 text-blue  w-full md:pl-20'>¡Ten un lindo dia!</p>
            
          </div>
          <img
              src="/src/assets/logoCircle.png"
              alt="Background with circles"
              className="object-cover w-2/6 hidden md:flex"
            />
        </div>

        <div className='flex flex-col w-2/5 bg-blue rounded-xl pt-9 cursor-pointer transition-transform transform hover:scale-105 hover:shadow-lg'>
        <p className='text-h2 text-white font-bold w-full md:pl-20'>Tu proximo viaje: </p>
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



      <p className='text-h2 text-blue font-bold w-full md:pl-20 mt-5'>Todos los viajes disponibles </p>


      <TravelCard
        name="Mariana Restrepo"
        rating={2}
        date="19 Sept"
        startLocation="Calle 25 N68c-50"
        endLocation="Universidad"
        startTime="6:00 AM"
        endTime="9:00 AM"
        cost={8000}
        affinity="2/6"
        imageVehicle="https://via.placeholder.com/150"
      />

      <TravelCard
        name="Carlos López"
        rating={4}
        date="20 Sept"
        startLocation="Av. Siempre Viva 123"
        endLocation="Universidad"
        startTime="7:30 AM"
        endTime="8:45 AM"
        cost={10000}
        affinity="4/6"
        imageVehicle="https://via.placeholder.com/150"
      />

      <TravelCard
        name="Ana María Torres"
        rating={3}
        date="21 Sept"
        startLocation="Calle 10 Sur"
        endLocation="Universidad"
        startTime="8:15 AM"
        endTime="10:00 AM"
        cost={9000}
        affinity="3/5"
        imageVehicle="https://via.placeholder.com/150"
      />

      <TravelCard
        name="Jorge Ramirez"
        rating={5}
        date="22 Sept"
        startLocation="Carrera 50 #10-20"
        endLocation="Universidad"
        startTime="5:00 AM"
        endTime="7:30 AM"
        cost={15000}
        affinity="5/5"
        imageVehicle="https://via.placeholder.com/150"
      />

      <TravelCard

        name="Laura Pérez"
        rating={1}
        date="23 Sept"
        startLocation="Calle 45 Norte"
        endLocation="Universidad"
        startTime="9:00 AM"
        endTime="11:15 AM"
        cost={7000}
        affinity="1/6"
        imageVehicle="https://via.placeholder.com/150"
      />

    </div>
  );
}

export default HomePage;