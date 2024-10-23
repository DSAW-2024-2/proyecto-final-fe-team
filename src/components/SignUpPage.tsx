import React, {useState, ChangeEvent, FormEvent} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

interface FormData{
    IdUni: string,
    email: string,
    phone: string,
    firstName: string,
    lastName: string,
    password: string,
}

interface ApiResponse {
    success: boolean,
    message?: string,
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

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
    };

    // Aqui se necesita hacer la peticion POST al servidor

   
return (
    <div className="flex">

        <div className="flex lg:w-1/2 md:justify-center  md:bg-blue">

        </div>

        <div className="hidden w-full lg:w-1/2 lg:flex lg:flex-col lg:items-center px-6 py-16">
            <div className="w-full max-w-sm px-6 py-12">

            <div className="text-center">
                <FontAwesomeIcon icon={faUser} style={{ color: '#152E52' }} className="m-2 text-3xl" />
                <h2 className="text-2xl font-bold m-4 text-blue">Registrarse</h2>
                <p className="text-blue m-4">Ingresa tus datos para disfrutar de todos nuestros servicios</p>
            </div>

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
                <a href="#" className="text-green hover:text-blue ml-1">Inicia sesión aquí</a>
            </p>
            </div>
        </div>
</div>
    );
}

export default SignUpPage;