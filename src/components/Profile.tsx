import React from 'react';
import Header from '../elements/Header.tsx';

const Profile: React.FC = () => {
  return (
    <div className="flex flex-col items-center bg-white min-h-screen p-6">
      <Header
      type="Conductor"
      >

      </Header>
      <div className="w-full max-w-md p-6">
        <div className="flex flex-col items-center mb-6">
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center border-4 border-white shadow-md">
            <span className="text-4xl text-blue">👤</span>
          </div>
          <h2 className="text-lg font-semibold mt-4">Matias Ruiz</h2>
          <div className="text-sm text-gray-500">Calificación:</div>
          <div className="flex gap-1 mt-1">
            <div className="w-4 h-4 bg-blue"></div>
            <div className="w-4 h-4 bg-blue"></div>
            <div className="w-4 h-4 bg-blue"></div>
            <div className="w-4 h-4 bg-gray-300"></div>
          </div>
        </div>
        <form className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">ID universitario</label>
            <input
              type="text"
              placeholder="****346"
              disabled
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Correo corporativo</label>
            <input
              type="email"
              placeholder="matiasrule@unisabana.edu.co"
              disabled
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Número de Contacto</label>
            <input
              type="text"
              placeholder="*****8976"
              disabled
              className="w-full mt-1 p-2 border rounded-lg bg-gray-100 text-gray-500 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Nombre</label>
            <input
              type="text"
              placeholder="Matias"
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Apellido</label>
            <input
              type="text"
              placeholder="Ruiz"
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full mt-4 p-2 bg-blue text-white font-semibold rounded-2xl hover:bg-green"
          >
            Guardar
          </button>
        </form>
        <button className="w-full mt-4 text-blue hover:underline">
          Eliminar Perfil
        </button>
      </div>
    </div>
  );
};

export default Profile;