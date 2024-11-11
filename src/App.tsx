// import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage.tsx';
import SignUpPage from './components/SignUpPage.tsx';
import StartPage from './components/StartPage.tsx';
import HomePage from './components/HomePage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import { isTokenValid } from './utils/auth.ts';
import HomePageDriver from './components/HomePageDriver.tsx';


const App: React.FC = () => {
	return (
	  <Router>
		<Routes>
		  {/* Rutas públicas */}
		  <Route path="/start" element={<StartPage />} />
		  <Route path="/login" element={<SignInPage />} />
		  <Route path="/register" element={<SignUpPage />} />
		  <Route path="/home" element={<HomePage />} />
		  <Route path="/homeDriver" element={<HomePageDriver/>}/>
  
		  {/* Rutas protegidas */}
		  <Route element={<ProtectedRoute />}>
			{/* <Route path="/home" element={<HomePage />} /> */}
			{/* Aquí puedes agregar más rutas protegidas */}
		  </Route>
  
		  {/* Redirigir ruta raíz */}
		  <Route 
  			path="/" 
  			element={
    		isTokenValid() 
      		? <Navigate to="/home" replace /> 
      		: <Navigate to="/login" replace />
  			} 
			/>
		</Routes>
	  </Router>
	);
  };

export default App;
