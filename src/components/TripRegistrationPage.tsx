import React, { useState } from 'react';
import Header from '../elements/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faDollarSign, faCreditCard } from '@fortawesome/free-solid-svg-icons';

interface PaymentMethod {
    id: string;
    name: string;
    enabled: boolean;
}

const TripRegistrationPage = () => {
    const [date, setDate] = useState<string>('');
    const [origin, setOrigin] = useState<string>('');
    const [destination, setDestination] = useState<string>('');
    const [arrivalTime, setArrivalTime] = useState<string>('');
    const [departureTime, setDepartureTime] = useState<string>('');
    const [cost, setCost] = useState<string>('');
    const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
        { id: 'nequi', name: 'Nequi', enabled: true },
        { id: 'daviplata', name: 'Daviplata', enabled: true },
        { id: 'efectivo', name: 'Efectivo', enabled: false }
    ]);

    const handlePaymentMethodToggle = (methodId: string) => {
        setPaymentMethods(methods =>
            methods.map(method =>
                method.id === methodId
                    ? { ...method, enabled: !method.enabled }
                    : method
            )
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar los datos del viaje
        console.log({
            date,
            origin,
            destination,
            arrivalTime,
            departureTime,
            cost,
            acceptedPaymentMethods: paymentMethods.filter(m => m.enabled).map(m => m.name)
        });
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

                    {/* Botón de envío */}
                    <button
                        type="submit"
                        className="w-full bg-green text-white p-3 rounded-3xl font-semibold hover:bg-blue transition-colors"
                    >
                        Crear Viaje
                    </button>
                </form>
            </div>
        </div>
    );
};

export default TripRegistrationPage;