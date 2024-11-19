import React, { useState, useEffect } from 'react';
import Header from '../elements/Header';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

interface UserData {
  id: string;
  idUni: string;
  email: string;
  phone: string;
  name: string;
}

const Profile: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [tempUserData, setTempUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No se encontró token de autenticación');

      const response = await fetch(`${API_URL}/api/users/me`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
      }

      const { data } = await response.json();
      setUserData(data);
      setTempUserData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!tempUserData) return;
    
    const { name, value } = e.target;
    setTempUserData(prev => prev ? {
      ...prev,
      [name]: value
    } : null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempUserData || !userData) return;

    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No se encontró token de autenticación');

      const response = await fetch(`${API_URL}/api/users/me`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: tempUserData.name,
          phone: tempUserData.phone
        })
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos del usuario');
      }

      setUserData(tempUserData);
      setIsEditing(false);
      setError('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al actualizar los datos');
    }
  };

  const handleDeleteAccount = async () => {
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#152E52',
      cancelButtonColor: '#5EA4AF',
      confirmButtonText: 'Sí, eliminar cuenta',
      cancelButtonText: 'Cancelar'
    });

    if (result.isConfirmed) {
      try {
        const token = localStorage.getItem('token');
        if (!token) throw new Error('No se encontró token de autenticación');

        const response = await fetch(`${API_URL}/api/users/me`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error('Error al eliminar la cuenta');
        }

        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('userRole');
        localStorage.removeItem('userName');
        
        navigate('/start');
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Error al eliminar la cuenta');
      }
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue">Cargando información del usuario...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center bg-white min-h-screen p-6">
      <Header type={localStorage.getItem('userRole') === 'driver' ? 'Conductor' : 'Pasajero'} />
      
      <div className="w-full max-w-md p-6">
        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center border-4 border-white shadow-md">
            <span className="text-4xl text-blue">👤</span>
          </div>
          <h2 className="text-lg font-semibold mt-4">{userData?.name}</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">ID universitario</label>
            <input
              type="text"
              name="idUni"
              value={tempUserData?.idUni || ''}
              disabled
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Correo institucional</label>
            <input
              type="email"
              name="email"
              value={tempUserData?.email || ''}
              disabled
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Teléfono</label>
            <input
              type="tel"
              name="phone"
              value={tempUserData?.phone || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-2 border rounded-lg ${!isEditing ? 'bg-gray-100 text-gray-500' : ''}`}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600">Nombre</label>
            <input
              type="text"
              name="name"
              value={tempUserData?.name || ''}
              onChange={handleInputChange}
              disabled={!isEditing}
              className={`w-full mt-1 p-2 border rounded-lg ${!isEditing ? 'bg-gray-100 text-gray-500' : ''}`}
            />
          </div>

          {!isEditing ? (
            <button
              type="button"
              onClick={() => setIsEditing(true)}
              className="w-full mt-4 p-2 bg-green text-white font-semibold rounded-2xl hover:bg-blue transition-colors"
            >
              Editar Perfil
            </button>
          ) : (
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  setTempUserData(userData);
                  setIsEditing(false);
                }}
                className="w-1/2 p-2 bg-gray-200 text-gray-700 font-semibold rounded-2xl hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="w-1/2 p-2 bg-green text-white font-semibold rounded-2xl hover:bg-blue transition-colors"
              >
                Guardar
              </button>
            </div>
          )}
        </form>

        <button
          onClick={handleDeleteAccount}
          className="w-full mt-6 p-2 text-red-600 hover:text-red-800 font-medium transition-colors"
        >
          Eliminar Cuenta
        </button>
      </div>
    </div>
  );
};

export default Profile;