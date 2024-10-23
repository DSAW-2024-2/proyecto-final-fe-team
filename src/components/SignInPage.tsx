import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightToBracket } from '@fortawesome/free-solid-svg-icons';

const SignInPage: React.FC = () => {
    return (
        <div className="h-screen flex">

            <div className="hidden lg:flex w-1/2 bg-blue items-center justify-center relative">
                <img  src='/src/assets/Background.jpg' alt='Background with circles' className='h-screen w-screen' />
            </div>

            <div className="w-full lg:w-1/2 flex items-center justify-center">
                <div className="w-full max-w-sm px-6 py-12">
                    <div className="text-center">
                        <FontAwesomeIcon icon={faRightToBracket} style={{ color: '#152E52' }} className="mb-2 text-3xl" />
                        <h2 className="text-2xl font-bold mb-2.5 text-blue">Iniciar Sesión</h2>
                        <p className="text-blue mb-6">Usa tu ID universitario y contraseña para ingresar</p>
                    </div>

                    <form className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block font-medium text-blue">Correo Institucional</label>
                            <input id="email" name="email" type="email" required
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none" />
                        </div>

                        <div>
                            <label htmlFor="password" className="block font-medium text-blue-900">Contraseña</label>
                            <input id="password" name="password" type="password" required
                                className="mt-2 w-full rounded-3xl border py-2 px-3 shadow-sm focus:ring-2 focus:ring-green focus:outline-none" />
                        </div>

                        <button type="submit"
                            className="w-full h-11 bg-green text-white rounded-3xl font-semibold shadow-sm hover:bg-blue">
                            Iniciar Sesión
                        </button>
                    </form>

                    <p className="mt-6 text-center text-gray-500">
                        ¿No tienes una cuenta?
                        <a href="#" className="text-green hover:text-blue ml-1">Regístrate aquí</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInPage;