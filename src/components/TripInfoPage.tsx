import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDollarSign, faCreditCard, faRoute, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import Header from '../elements/Header';
import Swal from 'sweetalert2';

interface Trip {
    id: string;
    driverId: string;
    driverName: string;
    driverVehicle: {
        plate: string;
        color: string;
        brand: string;
        model: string;
        availableSeats: number;
    };
    tripDate: string;
    origin: string;
    destination: string;
    arrivalTime: string;
    departureTime: string;
    cost: number;
    paymentMethods: string[];
    routeTag: string;
    affinity: string;
    description: string;
    status: string;
    passengers: string[];
    availableSeats: number;
}

const TripInfoPage: React.FC = () => {
    const { tripId } = useParams<{ tripId: string }>();
    const [trip, setTrip] = useState<Trip | null>(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTrip, setEditedTrip] = useState<Trip | null>(null);
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState(true);
    const navigate = useNavigate();

    // Obtener userRole y decodificar el token para obtener userId
    const userRole = localStorage.getItem('userRole');
    const token = localStorage.getItem('token');
    const tokenPayload = token ? JSON.parse(atob(token.split('.')[1])) : null;
    const userId = tokenPayload?.id;

    useEffect(() => {
        fetchTripData();
    }, [tripId]);

    const fetchTripData = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const token = localStorage.getItem('token');

            if (!token) {
                throw new Error('No hay sesión activa');
            }

            console.log('Fetching trip data for ID:', tripId);
            
            const response = await fetch(`${API_URL}/api/trips/${tripId}`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al obtener la información del viaje');
            }

            const data = await response.json();
            console.log('Trip data received:', data);

            if (!data.data) {
                throw new Error('Los datos del viaje no tienen el formato esperado');
            }

            setTrip(data.data);
            setEditedTrip(data.data);

        } catch (error) {
            console.error('Error fetching trip data:', error);
            setError(error instanceof Error ? error.message : 'Error desconocido');
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        if (!editedTrip) return;

        const { name, value } = e.target;
        setEditedTrip({
            ...editedTrip,
            [name]: value
        });
    };

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setEditedTrip(trip);
    };

    const handleUpdate = async () => {
        if (!editedTrip || !trip) return;
    
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const token = localStorage.getItem('token');
    
            // Crear un objeto solo con los campos que han cambiado
            const updates: Partial<Trip> = {};
            
            if (editedTrip.origin !== trip.origin) updates.origin = editedTrip.origin;
            if (editedTrip.destination !== trip.destination) updates.destination = editedTrip.destination;
            if (editedTrip.arrivalTime !== trip.arrivalTime) updates.arrivalTime = editedTrip.arrivalTime;
            if (editedTrip.departureTime !== trip.departureTime) updates.departureTime = editedTrip.departureTime;
            if (editedTrip.cost !== trip.cost) updates.cost = editedTrip.cost;
            if (editedTrip.affinity !== trip.affinity) updates.affinity = editedTrip.affinity;
            if (editedTrip.description !== trip.description) updates.description = editedTrip.description;
    
            // Si no hay cambios, solo cerramos el modo edición
            if (Object.keys(updates).length === 0) {
                setIsEditing(false);
                return;
            }
    
            const response = await fetch(`${API_URL}/api/trips/${tripId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(updates)
            });
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al actualizar el viaje');
            }
    
            // Actualizar el estado local con los cambios
            setTrip({...trip, ...updates});
            setIsEditing(false);
            
            Swal.fire({
                title: '¡Éxito!',
                text: 'El viaje ha sido actualizado correctamente',
                icon: 'success'
            });
        } catch (error) {
            console.error('Error updating trip:', error);
            Swal.fire({
                title: 'Error',
                text: error instanceof Error ? error.message : 'Error al actualizar el viaje',
                icon: 'error'
            });
        }
    };

    const handleDelete = async () => {
        try {
            const result = await Swal.fire({
                title: '¿Estás seguro?',
                text: "Esta acción no se puede deshacer",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#152E52',
                cancelButtonColor: '#5EA4AF',
                confirmButtonText: 'Sí, eliminar',
                cancelButtonText: 'Cancelar'
            });

            if (result.isConfirmed) {
                const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
                const token = localStorage.getItem('token');

                const response = await fetch(`${API_URL}/api/trips/${tripId}`, {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (!response.ok) {
                    throw new Error('Error al eliminar el viaje');
                }

                Swal.fire({
                    title: '¡Eliminado!',
                    text: 'El viaje ha sido eliminado correctamente',
                    icon: 'success'
                });
                navigate('/home-driver');
            }
        } catch (error) {
            Swal.fire({
                title: 'Error',
                text: error instanceof Error ? error.message : 'Error al eliminar el viaje',
                icon: 'error'
            });
        }
    };

    const handleReserve = async () => {
        try {
            const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
            const token = localStorage.getItem('token');

            // Crear una nueva reserva
            const response = await fetch(`${API_URL}/api/trips/${tripId}/reserve`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ userId })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Error al reservar el viaje');
            }

            Swal.fire({
                title: '¡Éxito!',
                text: 'El viaje ha sido reservado correctamente',
                icon: 'success'
            });

            // Actualizar el estado local con la nueva información del viaje
            const data = await response.json();
            setTrip(data.data);
        } catch (error) {
            console.error('Error reserving trip:', error);
            Swal.fire({
                title: 'Error',
                text: error instanceof Error ? error.message : 'Error al reservar el viaje',
                icon: 'error'
            });
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-blue">Cargando información del viaje...</p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-red-500">{error}</p>
            </div>
        );
    }

    if (!trip) {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <p className="text-blue">No se encontró el viaje</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Header type={userRole === 'driver' ? 'Conductor' : 'Pasajero'} />
            
            <div className="max-w-2xl mx-auto p-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-h2 text-blue">Información del Viaje</h1>
                        {userRole === 'driver' && trip.driverId === userId && (
                            <div className="flex space-x-2">
                                {isEditing ? (
                                    <>
                                        <button
                                            onClick={handleUpdate}
                                            className="px-4 py-2 bg-green text-white rounded-md hover:bg-blue transition-colors"
                                        >
                                            Guardar
                                        </button>
                                        <button
                                            onClick={handleCancel}
                                            className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
                                        >
                                            Cancelar
                                        </button>
                                    </>
                                ) : (
                                    <>
                                        <button
                                            onClick={handleEdit}
                                            className="p-2 text-blue hover:text-green transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faEdit} className="text-xl" />
                                        </button>
                                        <button
                                            onClick={handleDelete}
                                            className="p-2 text-red-500 hover:text-red-700 transition-colors"
                                        >
                                            <FontAwesomeIcon icon={faTrash} className="text-xl" />
                                        </button>
                                    </>
                                )}
                            </div>
                        )}

                        {userRole === 'passenger' && (
                            <div className="flex space-x-2">
                                <button
                                    onClick={handleReserve}
                                    className="px-4 py-2 bg-blue text-white rounded-md hover:bg-blue-dark transition-colors"
                                >
                                    Reservar Viaje
                                </button>
                            </div>
                        )}
                    </div>

                    <div className="space-y-6">
                        <div className="border-b pb-4">
                            <h2 className="text-h3 text-blue mb-2">Conductor</h2>
                            <p className="text-gray-700">{trip.driverName}</p>
                            <div className="mt-2">
                                <p className="text-gray-600">Vehículo: {trip.driverVehicle.brand} {trip.driverVehicle.model}</p>
                                <p className="text-gray-600">Color: {trip.driverVehicle.color}</p>
                                <p className="text-gray-600">Placa: {trip.driverVehicle.plate}</p>
                                <p className="text-gray-600">Asientos disponibles: {trip.availableSeats}</p>
                            </div>
                        </div>

                        <div className="border-b pb-4">
                            <h2 className="text-h3 text-blue mb-2">Detalles del Viaje</h2>
                            {isEditing ? (
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Origen</label>
                                        <input
                                            type="text"
                                            name="origin"
                                            value={editedTrip?.origin || ''}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:ring-blue"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Destino</label>
                                        <input
                                            type="text"
                                            name="destination"
                                            value={editedTrip?.destination || ''}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:ring-blue"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Hora de Salida</label>
                                        <input
                                            type="time"
                                            name="departureTime"
                                            value={editedTrip?.departureTime || ''}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:ring-blue"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Hora de Llegada</label>
                                        <input
                                            type="time"
                                            name="arrivalTime"
                                            value={editedTrip?.arrivalTime || ''}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:ring-blue"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700">Costo</label>
                                        <input
                                            type="number"
                                            name="cost"
                                            value={editedTrip?.cost || ''}
                                            onChange={handleInputChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:ring-blue"
                                        />
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-2">
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faRoute} className="text-blue w-6" />
                                        <div>
                                            <p className="text-gray-700">Origen: {trip.origin}</p>
                                            <p className="text-gray-700">Destino: {trip.destination}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faClock} className="text-blue w-6" />
                                        <div>
                                            <p className="text-gray-700">Salida: {trip.departureTime}</p>
                                            <p className="text-gray-700">Llegada: {trip.arrivalTime}</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center">
                                        <FontAwesomeIcon icon={faDollarSign} className="text-blue w-6" />
                                        <p className="text-gray-700">Costo: ${trip.cost}</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        <div className="border-b pb-4">
                            <h2 className="text-h3 text-blue mb-2">Métodos de Pago Aceptados</h2>
                            <div className="flex flex-wrap gap-2">
                                {trip.paymentMethods.map((method, index) => (
                                    <div
                                        key={index}
                                        className="px-4 py-2 bg-gray-100 rounded-full text-gray-700 flex items-center"
                                    >
                                        <FontAwesomeIcon icon={faCreditCard} className="mr-2" />
                                        {method}
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <h2 className="text-h3 text-blue mb-2">Información Adicional</h2>
                            {isEditing ? (
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">Afinidad</label>
                                    <input
                                        type="text"
                                        name="affinity"
                                        value={editedTrip?.affinity || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:ring-blue"
                                    />
                                    <label className="block text-sm font-medium text-gray-700 mt-4">Descripción</label>
                                    <textarea
                                        name="description"
                                        value={editedTrip?.description || ''}
                                        onChange={handleInputChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue focus:ring-blue"
                                    />
                                </div>
                            ) : (
                                <>
                                    <p className="text-gray-700">Afinidad: {trip.affinity || 'No especificada'}</p>
                                    {trip.description && (
                                        <p className="text-gray-700 mt-2">{trip.description}</p>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TripInfoPage;