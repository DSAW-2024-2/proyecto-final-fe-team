import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage.tsx';
import SignUpPage from './components/SignUpPage.tsx';
import StartPage from './components/StartPage.tsx';
import HomePage from './components/HomePage.tsx'
import HomePageDriver from './components/HomePageDriver.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PublicRoute from './components/PublicRoute.tsx';
import RolPage from './components/RolPage.tsx';
import CarRegistrationPage from './components/CarRegistrationPage.tsx'
import { isTokenValid } from './utils/auth.ts';

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
          <Route path="/rol" element={<RolPage />} />
          <Route path="/register-car" element={<CarRegistrationPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/homeDriver" element={<HomePageDriver />} />
        </Route>

        {/* Ruta por defecto */}
        <Route 
          path="/" 
          element={
            isTokenValid() 
              ? <Navigate to="/rol" replace /> 
              : <Navigate to="/start" replace />
          } 
        />

        {/* Ruta para manejar rutas no encontradas */}
        <Route path="*" element={<Navigate to="/rol" replace />} />
      </Routes>
    </Router>
  );
};

export default App;