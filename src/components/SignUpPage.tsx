import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import BackgroundAnimation from '../elements/BackgroundAnimation';
import { useNavigate } from "react-router-dom";


interface FormData {
    IdUni: string,
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    password: string,
}

function SignUpPage() {
    const [formData, setFormData] = useState<FormData>({
        IdUni: '',
        email: '',
        phone: '',
        firstName: '',
        lastName: '',
        password: '',
    });

    const [error, setError] = useState<string>('');
    const [success, setSuccess] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    // Redirigir al usuario a la página de login si el registro fue exitoso
    useEffect(() => {
        if (success) {
            const timer = setTimeout(() => {
                navigate('/login');
            }, 1000); 
            return () => clearTimeout(timer);
        }
    }, [success, navigate]);

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

        try {
            const response = await fetch(`${API_URL}/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idUni: formData.IdUni,
                    email: formData.email,
                    phone: formData.phone,
                    name: `${formData.firstName} ${formData.lastName}`,
                    password: formData.password
                }),
                credentials: 'include'
            });
    
            const data = await response.json();
    
            if (!response.ok) {
                setError(data.message || 'Error al registrar la cuenta')
                throw new Error(data.message || 'Error en el registro');
            }
    
            setSuccess(true);
            
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('email')) {
                    setError('Formato de email inválido');
                } else if (error.message.includes('phone')) {
                    setError('Formato de teléfono inválido (debe tener 10 dígitos)');
                } else if (error.message.includes('password')) {
                    setError('La contraseña debe tener al menos 6 caracteres');
                } else {
                    setError('Error al registrar la cuenta');
                }
            } else {
                setError('Error al registrar la cuenta');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleSingIn = (e: React.MouseEvent<HTMLAnchorElement>): void => {
        e.preventDefault();
        navigate('/login');
    };
   
return (
    <div className="flex">

        <div className="hidden lg:flex w-1/2 bg-blue items-center justify-center relative  ">
            <BackgroundAnimation/>
        </div>

        <div className="w-full lg:w-1/2 flex flex-col items-center px-6 py-16">
            <div className="w-full max-w-sm px-6 py-12">

            <div className="text-center">
                <FontAwesomeIcon icon={faUser} style={{ color: '#152E52' }} className="m-2 text-3xl" />
                <h2 className="text-2xl font-bold m-4 text-blue">Registrarse</h2>
                <p className="text-blue m-4">Ingresa tus datos para disfrutar de todos nuestros servicios</p>

            </div>

            <div className="w-full lg:w-1/2 flex flex-col items-center px-6 py-16">
                <div className="w-full max-w-sm px-6 py-12">
                    <div className="text-center">
                        <FontAwesomeIcon icon={faUser} style={{ color: '#152E52' }} className="m-2 text-3xl" />
                        <h2 className="text-2xl font-bold m-4 text-blue">Registrarse</h2>
                        <p className="text-blue m-4">Ingresa tus datos para disfrutar de todos nuestros servicios</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 flex items-start">
                            <div>
                                <div className="mt-1 text-sm text-red-700">
                                    {error}
                                </div>
                            </div>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="IdUni" className="block font-medium text-blue">ID universitario</label>
                            <input 
                                id="IdUni" 
                                name="IdUni" 
                                type="number" 
                                required
                                value={formData.IdUni}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block font-medium text-blue">Correo corporativo</label>
                            <input 
                                id="email" 
                                name="email" 
                                type="email" 
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <div>
                            <label htmlFor="phone" className="block font-medium text-blue">Número de contacto</label>
                            <input 
                                id="phone" 
                                name="phone" 
                                type="number" 
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <div>
                            <label htmlFor="firstName" className="block font-medium text-blue">Nombre</label>
                            <input 
                                id="firstName" 
                                name="firstName" 
                                type="text" 
                                required
                                value={formData.firstName}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <div>
                            <label htmlFor="lastName" className="block font-medium text-blue">Apellido</label>
                            <input 
                                id="lastName" 
                                name="lastName" 
                                type="text" 
                                required
                                value={formData.lastName}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-medium text-blue">Contraseña</label>
                            <input 
                                id="password" 
                                name="password" 
                                type="password" 
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none"  
                            />
                        </div>

                        <button 
                            type="submit"
                            disabled={isLoading}
                            className={`w-full h-11 bg-green text-white rounded-3xl font-semibold shadow-sm hover:bg-blue ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-500">
                        ¿Ya tienes una cuenta?
                        <a href="" className="text-green hover:text-blue ml-1" onClick={handleSingIn}>
                            Inicia sesión aquí
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;