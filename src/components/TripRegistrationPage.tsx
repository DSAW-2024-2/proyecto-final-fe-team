import React, { useState } from 'react';
import Header from '../elements/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDollarSign, faCreditCard, faRoute } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

interface PaymentMethod {
    id: string;
    name: string;
    enabled: boolean;
}

interface RouteTag {
    id: string;
    name: string;
}

const TripRegistrationPage = () => {
    const [date, setDate] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [arrivalTime, setArrivalTime] = useState<string>('');
    const [departureTime, setDepartureTime] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    const [selectedRoute, setSelectedRoute] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    // Rutas predefinidas
    const routeTags: RouteTag[] = [
        { id: 'boyaca', name: 'Boyacá' },
        { id: 'autopista', name: 'Autopista Norte' },
        { id: 'septima', name: '7ma' },
        { id: 'novena', name: '9na' },
        { id: 'zipa', name: 'Zipa' },
        { id: 'heroes', name: 'Héroes' },
        { id: 'suba', name: 'Suba' },
        { id: 'mosquera', name: 'Mosquera' },
        { id: 'calle80', name: 'Calle 80' },
        { id: 'chia', name: 'Chía' },
    ];

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
            const response = await fetch(`${API_URL}/api/trips`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                credentials: 'include',
                body: JSON.stringify({
                    date,
                    origin,
                    destination,
                    arrivalTime,
                    departureTime,
                    cost,
                    routeTag: selectedRoute,
                    paymentMethods: paymentMethods
                        .filter(method => method.enabled)
                        .map(method => method.id)
                })
            });

            if (!response.ok) {
                throw new Error('Error al crear el viaje');
            }

            navigate('/success');
        } catch (error) {
            setError('Error al crear el viaje. Por favor, intente nuevamente.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 mt-2">
            <Header type="Conductor" />
            
            <div className="max-w-md mx-auto p-6">
                <h1 className="text-h3 text-blue mb-6">Crear viaje para...</h1>
                
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Fecha */}
                    <div className="flex space-x-4">
                        <input
                            type="number"
                            value={date.split('-')[2] || '15'}
                            onChange={(e) => setDate(e.target.value)}
                            className="w-16 p-2 border rounded-lg text-center text-blue"
                        />
                        <input
                            type="text"
                            value="Septiembre"
                            className="flex-grow p-2 border rounded-lg text-center text-blue"
                        />
                        <input
                            type="number"
                            value="2024"
                            className="w-20 p-2 border rounded-lg text-center text-blue"
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
                            />
                        </div>
                    </div>

                    {/* Route Tags */}
                    <div className="space-y-2">
                        <div className="flex items-center space-x-2 mb-2">
                            <FontAwesomeIcon icon={faRoute} className="text-blue" />
                            <span className="text-blue">Ruta principal</span>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {routeTags.map((route) => (
                                <button
                                    key={route.id}
                                    type="button"
                                    onClick={() => setSelectedRoute(route.id)}
                                    className={`px-4 py-2 rounded-full text-sm ${
                                        selectedRoute === route.id
                                            ? 'bg-blue text-white'
                                            : 'bg-white text-blue border border-blue'
                                    }`}
                                >
                                    {route.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Horarios */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faClock} className="text-blue" />
                            <span className="text-blue">Salida</span>
                            <input
                                type="time"
                                placeholder="Hora Llegada"
                                value={arrivalTime}
                                onChange={(e) => setArrivalTime(e.target.value)}
                                className="flex-grow p-2 border rounded-3xl focus:ring-2 focus:ring-green focus:outline-none"
                            />
                        </div>
                        <div className="flex items-center space-x-2">
                            <FontAwesomeIcon icon={faClock} className="text-blue" />
                            <span className="text-blue">Llegada</span>
                            <input
                                type="time"
                                placeholder="Hora Salida"
                                value={departureTime}
                                onChange={(e) => setDepartureTime(e.target.value)}
                                className="flex-grow p-2 border rounded-3xl focus:ring-2 focus:ring-green focus:outline-none"
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

                    {/* Error message */}
                    {error && (
                        <div className="text-red-500 text-sm">
                            {error}
                        </div>
                    )}

                    {/* Submit button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-green text-white p-3 rounded-3xl font-semibold hover:bg-blue transition-colors disabled:opacity-50"
                    >
                        {isLoading ? 'Creando viaje...' : 'Crear Viaje'}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TripRegistrationPage;