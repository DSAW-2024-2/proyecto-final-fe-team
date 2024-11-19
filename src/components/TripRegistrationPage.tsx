import React, { useState } from 'react';
import Header from '../elements/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDollarSign, faCreditCard } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface PaymentMethod {
    id: string;
    name: string;
    enabled: boolean;
}

const TripRegistrationPage = () => {
    const [tripDate, setTripDate] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [arrivalTime, setArrivalTime] = useState<string>('');
    const [departureTime, setDepartureTime] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        { id: 'nequi', name: 'Nequi', enabled: false },
        { id: 'daviplata', name: 'Daviplata', enabled: false },
        { id: 'efectivo', name: 'Efectivo', enabled: false }
    ]);

    const navigate = useNavigate();

    const handlePaymentMethodToggle = (methodId: string) => {
        setPaymentMethods(methods =>
            methods.map(method =>
                method.id === methodId
                    ? { ...method, enabled: !method.enabled }
                    : method
            )
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
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
            // Construir el objeto de viaje
            const tripData = {
                tripDate,
                origin,
                destination,
                arrivalTime,
                departureTime,
                cost: Number(cost),
                paymentMethods: paymentMethods
                    .filter(method => method.enabled)
                    .map(method => method.id),
                affinity: "No especificada",
                description: ""
            };

            const response = await fetch(`${API_URL}/api/trips`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(tripData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Error al crear el viaje');
            }

            // Redireccionar a la página de éxito
            navigate('/success');

        } catch (error) {
            setError(error instanceof Error ? error.message : 'Error al crear el viaje');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-2">
            <Header type="Conductor" />
            
            <div className="max-w-md mx-auto p-6">
                <h1 className="text-h3 text-blue mb-6">Crear viaje</h1>
                
                {error && (
                    <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Fecha */}
                    <div>
                        <label className="block text-sm font-medium text-blue mb-2">
                            Fecha del viaje
                        </label>
                        <input
                            type="date"
                            value={tripDate}
                            onChange={(e) => setTripDate(e.target.value)}
                            className="w-full p-2 border rounded-lg text-blue"
                            required
                        />
                    </div>

                    {/* Origen y Destino */}
                    <div className="space-y-4 bg-white p-4 rounded-lg shadow-sm">
                        <div className="flex items-center space-x-2">
                            <span className="text-blue">Origen</span>
                            <div className="w-3 h-3 border-2 rounded-full border-green"></div>
                            <input
                                type="text"
                                placeholder="Origen"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                className="flex-grow p-2 border rounded-3xl focus:ring-2 focus:ring-green focus:outline-none"
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <span className="text-blue">Destino</span>
                            <div className="w-3 h-3 rounded-full bg-green"></div>
                            <input
                                type="text"
                                placeholder="Destino"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="flex-grow p-2 border rounded-3xl focus:ring-2 focus:ring-green focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Horarios */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faClock} className="text-blue" />
                            <span className="text-blue">Salida</span>
                            <input
                                type="time"
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                                className="flex-grow p-2 border rounded-3xl focus:ring-2 focus:ring-green focus:outline-none"
                                required
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faClock} className="text-blue" />
                            <span className="text-blue">Llegada</span>
                            <input
                                type="time"
                                value={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                                className="flex-grow p-2 border rounded-3xl focus:ring-2 focus:ring-green focus:outline-none"
                                required
                            />
                        </div>
                    </div>

                    {/* Costo */}
                    <div className="flex items-center space-x-2">
                        <FontAwesomeIcon icon={faDollarSign} className="text-blue" />
                        <input
                            type="number"
                            placeholder="Costo"
                            value={cost}
                            onChange={(e) => setCost(e.target.value)}
                            className="flex-grow p-2 border rounded-3xl focus:ring-2 focus:ring-green focus:outline-none"
                            required
                            min="1000"
                        />
                    </div>

                    {/* Métodos de Pago */}
                    <div className="space-y-2">
                        <p className="text-sm text-gray-600">Métodos de Pago Aceptados</p>
                        <div className="space-y-2">
                            {paymentMethods.map((method) => (
                                <button
                                    key={method.id}
                                    type="button"
                                    onClick={() => handlePaymentMethodToggle(method.id)}
                                    className={`w-full p-3 rounded-3xl flex items-center justify-between ${
                                        method.enabled
                                            ? 'bg-blue text-white'
                                            : 'bg-white text-blue border'
                                    }`}
                                >
                                    <span>{method.name}</span>
                                    <FontAwesomeIcon icon={faCreditCard} />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green text-white p-3 rounded-3xl font-semibold hover:bg-blue transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {isLoading ? 'Creando viaje...' : 'Crear Viaje'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TripRegistrationPage;