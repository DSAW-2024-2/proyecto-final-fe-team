// import './App.css'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignInPage from './components/SignInPage.tsx';
import SignUpPage from './components/SignUpPage.tsx';
import LoadingFirstPage from './LoadingFirstPage.tsx';


const App: React.FC = () => {
	return (
	  <Router>
		<Routes>
		  <Route path="/" element={<LoadingFirstPage />} />
		  <Route path="/register" element={<SignUpPage />} />
		  <Route path="/login" element={<SignInPage />} />
		</Routes>
	  </Router>
	);
  };

export default App;
