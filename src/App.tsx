// import './App.css'
import SignInPage from './components/SignInPage.tsx';
import SignUpPage from './components/SignUpPage.tsx';


const App: React.FC = () => {
	return (
	  <div className="App">
		<SignUpPage/>
		<SignInPage/>
	  </div>
	);
  };

export default App;
