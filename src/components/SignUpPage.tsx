import React, {useState, ChangeEvent, FormEvent} from "react";

interface FormData{
    IdUni: number,
    email: string,
    phone: number,
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
        IdUni: 0,
        email: '',
        phone: 0,
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

   
return (
    <div className="flex justify-center">
    <div className="w-full max-w-md px-6 py-12">
        <div className="text-center">
            <h2 className="text-2xl font-bold mb-2.5 text-blue-600">Crear Cuenta</h2>
            <p className="text-blue-600 mb-6">Ingresa tus datos para disfrutar de todos nuestros servicios</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="IdUni" className="block font-medium text-blue-600">ID universitario</label>
                <input 
                    id="IdUni" 
                    name="IdUni" 
                    type="number" 
                    required
                    value={formData.IdUni}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" 
                />
            </div>

            <div>
                <label htmlFor="email" className="block font-medium text-blue-600">Correo corporativo</label>
                <input 
                    id="email" 
                    name="email" 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" 
                />
            </div>

            <div>
                <label htmlFor="phone" className="block font-medium text-blue-600">Número de contacto</label>
                <input 
                    id="phone" 
                    name="phone" 
                    type="number" 
                    required
                    value={formData.phone}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" 
                />
            </div>

            <div>
                <label htmlFor="firstName" className="block font-medium text-blue-600">Nombre</label>
                <input 
                    id="firstName" 
                    name="firstName" 
                    type="text" 
                    required
                    value={formData.firstName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" 
                />
            </div>

            <div>
                <label htmlFor="lastName" className="block font-medium text-blue-600">Apellido</label>
                <input 
                    id="lastName" 
                    name="lastName" 
                    type="text" 
                    required
                    value={formData.lastName}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" 
                />
            </div>


            <div>
                <label htmlFor="password" className="block font-medium text-blue-600">Contraseña</label>
                <input 
                    id="password" 
                    name="password" 
                    type="password" 
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green-500 focus:outline-none" 
                />
            </div>

            <button 
                type="submit"
                disabled={isLoading}
                className={`w-full h-11 bg-green-500 text-white rounded-3xl font-semibold shadow-sm hover:bg-blue-600 ${isLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
                {isLoading ? 'Creando cuenta...' : 'Crear Cuenta'}
            </button>
        </form>

        <p className="mt-6 text-center text-gray-500">
            ¿Ya tienes una cuenta?
            <a href="/signin" className="text-green-500 hover:text-blue-600 ml-1">Inicia sesión aquí</a>
        </p>
    </div>
</div>
    );
}

export default SignUpPage;