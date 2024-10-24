// import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './components/SignInPage.tsx';
import SignUpPage from './components/SignUpPage.tsx';
import LoadingFirstPage from './components/LoadingFirstPage.tsx';
import StartPage from './components/StartPage.tsx';


const App: React.FC = () => {
	return (
	  <Router>
		<Routes>
		  <Route path="/" element={<StartPage />} />
		  <Route path="/register" element={<SignUpPage />} />
		  <Route path="/login" element={<SignInPage />} />
		</Routes>
	  </Router>
	);
  };

export default App;
