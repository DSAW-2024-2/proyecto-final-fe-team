// import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage.tsx';
import SignUpPage from './components/SignUpPage.tsx';
import StartPage from './components/StartPage.tsx';
import HomePage from './components/HomePage.tsx'
import ProtectedRoute from './components/ProtectedRoute.tsx';
import RolPage from './components/RolPage.tsx';
import { isTokenValid } from './utils/auth.ts';


const App: React.FC = () => {
	return (
	  <Router>
		<Routes>
		  {/* Rutas públicas */}
		  <Route path="/start" element={<StartPage />} />
		  <Route path="/login" element={<SignInPage />} />
		  <Route path="/register" element={<SignUpPage />} />
  
		  {/* Rutas protegidas */}

		  <Route element={<ProtectedRoute />}>
		  	<Route path="/rol" element={<RolPage />} />
			<Route path="/home" element={<HomePage />} />
			{/* Aquí puedes agregar más rutas protegidas */}
		  </Route>
  
		  {/* Redirigir ruta raíz */}
		  <Route 
  			path="/" 
  			element={
    		isTokenValid() 
      		? <Navigate to="/home" replace /> 
      		: <Navigate to="/start" replace />
  			} 
			/>
		</Routes>
	  </Router>
	);
  };

export default App;
