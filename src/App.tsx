import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage.tsx';
import SignUpPage from './components/SignUpPage.tsx';
import StartPage from './components/StartPage.tsx';
import HomePage from './components/HomePage.tsx';
import HomePageDriver from './components/HomePageDriver.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PublicRoute from './components/PublicRoute.tsx';
import DriverRoute from './components/DriverRoute.tsx';
import PassengerRoute from './components/PassengerRoute.tsx';
import RolPage from './components/RolPage.tsx';
import CarRegistrationPage from './components/CarRegistrationPage.tsx'
import TripRegistrationPage from './components/TripRegistrationPage.tsx'
import TripInfoPage from './components/TripInfoPage.tsx'
import VehicleInfoPage from './components/VehicleInfoPage.tsx';
import Profile from './components/Profile.tsx';
import SuccessPage from './components/SuccessPage.tsx';
import { isTokenValid } from './utils/auth.ts';
import SearchTrip from './components/SearchTrip.tsx';
import Ticket from './components/Ticket.tsx'


const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Rutas públicas */}
        <Route element={<PublicRoute />}>
          <Route path="/start" element={<StartPage />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/register" element={<SignUpPage />} />
        </Route>

        {/* Rutas protegidas */}
        <Route element={<ProtectedRoute />}>
          {/* Ruta de selección de rol */}
          <Route path="/rol" element={<RolPage />} />
          
          {/* Rutas para pasajeros */}
          <Route element={<PassengerRoute />}>
            <Route path="/home" element={<HomePage />} />
            <Route path="/search-trip" element={<SearchTrip/>} />
            <Route path="/ticket" element={<Ticket/>} />
          </Route>

          {/* Rutas para conductores */}
          <Route element={<DriverRoute />}>
            <Route path="/home-driver" element={<HomePageDriver />} />
            <Route path="/register-car" element={<CarRegistrationPage />} />
            <Route path="/register-trip" element={<TripRegistrationPage />} />
            <Route path="/vehicle-info" element={<VehicleInfoPage />} />
          </Route>

          {/* Rutas comunes protegidas */}
          <Route path="/profile" element={<Profile />} />
          <Route path="/success" element={<SuccessPage />} />
          <Route path="/trip/:tripId" element={<TripInfoPage />} />
        </Route>

        {/* Redirigir ruta raíz */}
        <Route 
          path="/" 
          element={
            isTokenValid() 
              ? <Navigate to="/rol" replace /> 
              : <Navigate to="/start" replace />
          } 
        />
      </Routes>
    </Router>
  );
};

export default App;