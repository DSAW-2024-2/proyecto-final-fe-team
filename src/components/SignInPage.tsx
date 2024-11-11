import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import BackgroundAnimation from '../elements/BackgroundAnimation';

interface LoginFormData {
  email: string;
  password: string;
}

interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  message: string;
  user: {
    name: string;
  };
}

const SignInPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: '',
    password: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'https://proyecto-final-fe-team-qg0gyszj9-gabrielabejarano09s-projects.vercel.app/login';

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSignUp = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    navigate('/register');
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData),
        credentials: 'include'
      });

      const data: LoginResponse = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Error al iniciar sesión');
      }

      localStorage.setItem('token', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('userName', data.user.name);
      navigate('/rol');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en el login');
    } finally {
      setIsLoading(false);
    }
  };


       // <img 
       //   src="/src/assets/Background.jpg" 
        //  alt="Background with circles" 
        //  className="h-screen w-screen object-cover"
        
        ///>



  return (
    <div className="h-screen flex">
      <div className="hidden lg:flex w-1/2 bg-blue items-center justify-center relative">
        <BackgroundAnimation/>
      </div>

      <div className="w-full lg:w-1/2 flex items-center justify-center">
        <div className="w-full max-w-sm px-6 py-12">
          <div className="text-center">
            <FontAwesomeIcon 
              icon={faRightToBracket} 
              style={{ color: '#152E52' }} 
              className="mb-2 text-3xl" 
            />
            <h2 className="text-2xl font-bold mb-2.5 text-blue">
              Iniciar Sesión
            </h2>
            <p className="text-blue mb-6">
              Usa tu ID universitario y contraseña para ingresar
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label 
                htmlFor="email" 
                className="block font-medium text-blue"
              >
                Correo Institucional
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"
              />
            </div>

            <div>
              <label 
                htmlFor="password" 
                className="block font-medium text-blue"
              >
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full h-11 bg-green text-white rounded-3xl font-semibold shadow-sm hover:bg-blue disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
            </button>
          </form>

          <p className="mt-6 text-center text-gray-500">
            ¿No tienes una cuenta?
            <a 
              href="" 
              className="text-green hover:text-blue ml-1" 
              onClick={handleSignUp}
            >
              Regístrate aquí
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignInPage;