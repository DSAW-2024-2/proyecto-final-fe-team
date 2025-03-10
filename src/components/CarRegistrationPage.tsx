import { useState, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCar, faUpload } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from "react-router-dom";

interface CarFormData {
    plate: string;
    color: string;
    availableSeats: number;
    brand: string;
    model: string;
    carImage: string;
    soatImage: string;
}

function CarRegistrationPage() {
    const [formData, setFormData] = useState<CarFormData>({
        plate: '',
        color: '',
        availableSeats: 0,
        brand: '',
        model: '',
        carImage: '',
        soatImage: ''
    });

    const [carImagePreview, setCarImagePreview] = useState<string>('');
    const [soatImagePreview, setSoatImagePreview] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value, type } = e.target;
        
        if (type === 'file' && e.target.files) {
            const file = e.target.files[0];
            const reader = new FileReader();
            
            reader.onloadend = () => {
                const base64String = reader.result as string;
                
                setFormData(prev => ({
                    ...prev,
                    [name]: base64String
                }));

                if (name === 'carImage') {
                    setCarImagePreview(base64String);
                } else if (name === 'soatImage') {
                    setSoatImagePreview(base64String);
                }
            };
            
            reader.readAsDataURL(file);
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
        const token = localStorage.getItem('token');

        if (!token) {
            setError('No hay sesión activa. Por favor, inicie sesión nuevamente.');
            navigate('/login');
            return;
        }

        try {
            if (!formData.carImage || !formData.soatImage) {
                throw new Error('Las imágenes del vehículo y SOAT son requeridas');
            }

            const response = await fetch(`${API_URL}/api/vehicles/register-car`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    plate: formData.plate,
                    color: formData.color,
                    availableSeats: parseInt(formData.availableSeats.toString()),
                    brand: formData.brand,
                    model: formData.model,
                    carImage: formData.carImage,
                    soatImage: formData.soatImage
                })
            });

            const data = await response.json();

            if (!response.ok) {
                if (response.status === 401) {
                    // Token expirado o inválido
                    localStorage.removeItem('token');
                    localStorage.removeItem('refreshToken');
                    navigate('/login');
                    throw new Error('Sesión expirada. Por favor, inicie sesión nuevamente.');
                }
                throw new Error(data.message || 'Error al registrar el vehículo');
            }

            // Registro exitoso
            navigate('/home-driver');

        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Error al registrar el vehículo');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="flex">
            <div className="flex lg:w-1/2 lg:justify-center lg:bg-blue">
            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center px-6 py-16">
                <div className="w-full max-w-sm px-6 py-12">
                    <div className="text-center">
                        <FontAwesomeIcon icon={faCar} style={{ color: '#152E52' }} className="m-2 text-3xl" />
                        <h2 className="text-2xl font-bold m-4 text-blue">Registro de Vehículo</h2>
                        <p className="text-blue m-4">Ingresa los datos del vehículo para registrarlo en el sistema</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200">
                            <div className="text-sm text-red-700">
                                {error}
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="plate" className="block font-medium text-blue">Placa del vehículo</label>
                            <input 
                                id="plate" 
                                name="plate" 
                                type="text" 
                                required
                                placeholder="ABC-123"
                                value={formData.plate}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <div>
                            <label htmlFor="color" className="block font-medium text-blue">Color</label>
                            <input 
                                id="color" 
                                name="color" 
                                type="text" 
                                required
                                value={formData.color}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <div>
                            <label htmlFor="availableSeats" className="block font-medium text-blue">Puestos disponibles</label>
                            <input 
                                id="availableSeats" 
                                name="availableSeats" 
                                type="number" 
                                required
                                min="1"
                                max="8"
                                value={formData.availableSeats}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <div>
                            <label htmlFor="brand" className="block font-medium text-blue">Marca</label>
                            <input 
                                id="brand" 
                                name="brand" 
                                type="text" 
                                required
                                value={formData.brand}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <div>
                            <label htmlFor="model" className="block font-medium text-blue">Modelo</label>
                            <input 
                                id="model" 
                                name="model" 
                                type="text" 
                                required
                                value={formData.model}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <div>
                            <label htmlFor="carImage" className="block font-medium text-blue">Foto del vehículo</label>
                            <div className="mt-2 flex flex-col items-center">
                                {carImagePreview && (
                                    <img 
                                        src={carImagePreview} 
                                        alt="Preview del vehículo" 
                                        className="w-full h-48 object-cover rounded-lg mb-2"
                                    />
                                )}
                                <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-3xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                                    Subir foto del vehículo
                                    <input
                                        id="carImage"
                                        name="carImage"
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        required
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="soatImage" className="block font-medium text-blue">Foto del SOAT</label>
                            <div className="mt-2 flex flex-col items-center">
                                {soatImagePreview && (
                                    <img 
                                        src={soatImagePreview} 
                                        alt="Preview del SOAT" 
                                        className="w-full h-48 object-cover rounded-lg mb-2"
                                    />
                                )}
                                <label className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-3xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 cursor-pointer">
                                    <FontAwesomeIcon icon={faUpload} className="mr-2" />
                                    Subir foto del SOAT
                                    <input
                                        id="soatImage"
                                        name="soatImage"
                                        type="file"
                                        accept="image/jpeg,image/png"
                                        required
                                        onChange={handleChange}
                                        className="sr-only"
                                    />
                                </label>
                            </div>
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full h-11 bg-green text-white rounded-3xl font-semibold shadow-sm hover:bg-blue ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Registrando vehículo...' : 'Registrar Vehículo'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CarRegistrationPage;