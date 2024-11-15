import React, { useState, useEffect, ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faEdit, faUpload } from '@fortawesome/free-solid-svg-icons';
import Header from '../elements/Header';

interface VehicleData {
  plate: string;
  color: string;
  availableSeats: number;
  brand: string;
  model: string;
  carImage: string;
  soatImage: string;
  status: 'active' | 'inactive' | 'maintenance';
}

type UpdateFields = {
  [K in keyof VehicleData]?: VehicleData[K];
};

interface InputFieldConfig {
  name: keyof Omit<VehicleData, 'carImage' | 'soatImage' | 'status'>;
  label: string;
  type?: string;
  min?: number;
  max?: number;
}

interface ImageFieldConfig {
  name: 'carImage' | 'soatImage';
  label: string;
}

const VehicleInfoPage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [tempVehicleData, setTempVehicleData] = useState<VehicleData | null>(null);
  const [modifiedFields, setModifiedFields] = useState<Set<string>>(new Set());

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  const inputFields: InputFieldConfig[] = [
    { name: 'plate', label: 'Placa' },
    { name: 'color', label: 'Color' },
    { name: 'brand', label: 'Marca' },
    { name: 'model', label: 'Modelo' },
    { name: 'availableSeats', label: 'Asientos Disponibles', type: 'number', min: 1, max: 8 }
  ];

  const imageFields: ImageFieldConfig[] = [
    { name: 'carImage', label: 'Foto del Vehículo' },
    { name: 'soatImage', label: 'Foto del SOAT' }
  ];

  useEffect(() => {
    fetchVehicleData();
  }, []);

  const fetchVehicleData = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) throw new Error('No se encontró token de autenticación');

      const response = await fetch(`${API_URL}/api/vehicles/my-car`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error(response.status === 404 
          ? 'No se encontró información del vehículo' 
          : 'Error al obtener los datos del vehículo'
        );
      }

      const { data } = await response.json();
      setVehicleData(data);
      setTempVehicleData(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al cargar los datos');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    if (!tempVehicleData) return;

    const { name, value } = e.target;
    setTempVehicleData({
      ...tempVehicleData,
      [name]: name === 'availableSeats' ? parseInt(value) : value
    });
    setModifiedFields(prev => new Set(prev).add(name));
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0] || !tempVehicleData) return;

    const file = e.target.files[0];
    if (!file.type.startsWith('image/')) {
      setError('Por favor seleccione un archivo de imagen válido');
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      const name = e.target.name as keyof Pick<VehicleData, 'carImage' | 'soatImage'>;
      setTempVehicleData({
        ...tempVehicleData,
        [name]: base64String
      });
      setModifiedFields(prev => new Set(prev).add(name));
    };

    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tempVehicleData || !vehicleData || modifiedFields.size === 0) {
      setIsEditing(false);
      return;
    }

    try {
      const updatedFields = Array.from(modifiedFields).reduce((acc, field) => {
        const key = field as keyof VehicleData;
        return {
          ...acc,
          [key]: tempVehicleData[key]
        };
      }, {} as UpdateFields);

      const token = localStorage.getItem('token');
      if (!token) throw new Error('No se encontró token de autenticación');

      const response = await fetch(`${API_URL}/api/vehicles/my-car/update`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFields)
      });

      if (!response.ok) {
        throw new Error('Error al actualizar los datos del vehículo');
      }

      setVehicleData(tempVehicleData);
      setIsEditing(false);
      setModifiedFields(new Set());
      setError('');
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Error al actualizar los datos');
    }
  };

  const resetForm = () => {
    setTempVehicleData(vehicleData);
    setModifiedFields(new Set());
    setIsEditing(false);
    setError('');
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-blue">Cargando información del vehículo...</p>
      </div>
    );
  }

  if (!vehicleData || !tempVehicleData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500">No se encontró información del vehículo</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-2 px-4 sm:px-6 lg:px-8">
      <Header type="Conductor" />

      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            <FontAwesomeIcon icon={faCar} className="text-3xl text-blue mr-4" />
            <h1 className="text-2xl font-bold text-blue">Mi Vehículo</h1>
          </div>
          {!isEditing && (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center px-4 py-2 bg-green text-white rounded-md hover:bg-blue transition-colors"
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Editar
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-lg">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {inputFields.map(field => (
              <div key={field.name}>
                <label className="block text-sm font-medium text-blue mb-2">
                  {field.label}
                </label>
                <input
                  type={field.type || 'text'}
                  name={field.name}
                  value={isEditing ? tempVehicleData[field.name] : vehicleData[field.name]}
                  onChange={handleInputChange}
                  disabled={!isEditing}
                  min={field.min}
                  max={field.max}
                  className="w-full rounded-md border border-gray-300 p-2 focus:ring-green focus:border-green"
                />
              </div>
            ))}

            <div>
              <label className="block text-sm font-medium text-blue mb-2">
                Estado
              </label>
              <select
                name="status"
                value={isEditing ? tempVehicleData.status : vehicleData.status}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full rounded-md border border-gray-300 p-2 focus:ring-green focus:border-green"
              >
                <option value="active">Activo</option>
                <option value="inactive">Inactivo</option>
                <option value="maintenance">En Mantenimiento</option>
              </select>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            {imageFields.map(image => (
              <div key={image.name}>
                <label className="block text-sm font-medium text-blue mb-2">
                  {image.label}
                </label>
                {isEditing && (
                  <label className="block w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md cursor-pointer hover:bg-gray-200 mb-2">
                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                    Actualizar foto
                    <input
                      type="file"
                      name={image.name}
                      onChange={handleImageChange}
                      accept="image/*"
                      className="hidden"
                    />
                  </label>
                )}
                <img
                  src={isEditing ? tempVehicleData[image.name] : vehicleData[image.name]}
                  alt={image.label}
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            ))}
          </div>

          {isEditing && (
            <div className="mt-8 flex justify-end space-x-4">
              <button
                type="button"
                onClick={resetForm}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={modifiedFields.size === 0}
                className={`px-4 py-2 bg-green text-white rounded-md hover:bg-blue transition-colors ${
                  modifiedFields.size === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                Guardar Cambios
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default VehicleInfoPage;