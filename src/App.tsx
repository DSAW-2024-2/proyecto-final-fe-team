// import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignInPage from './components/SignInPage.tsx';
import SignUpPage from './components/SignUpPage.tsx';
import StartPage from './components/StartPage.tsx';
import HomePage from './components/HomePage.tsx';
import ProtectedRoute from './components/ProtectedRoute.tsx';
import PublicRoute from './components/PublicRoute.tsx';
import RolPage from './components/RolPage.tsx';
import { isTokenValid } from './utils/auth.ts';
import HomePageDriver from './components/HomePageDriver.tsx';
import Profile from './components/Profile.tsx';
import SuccessPage from './components/SuccessPage.tsx';


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
		  <Route path="/profile" element={<Profile/>}/>
		  <Route path="/success" element={<SuccessPage/>}/>


  
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
      		: <Navigate to="/start" replace />
  			} 
			/>
		</Routes>
	  </Router>
	);
  };

export default App;
