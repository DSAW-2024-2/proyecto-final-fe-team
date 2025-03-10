import { useNavigate } from "react-router-dom";
import BackgroundAnimation from '../elements/BackgroundAnimation';

function StartPage() {

    const navigate = useNavigate();

    const handleSignIn = () => {
        navigate('/login');
    }

    const handleSignUp = () => {
        navigate('/register');
    }

    return (
        <div className="flex">

            <div className="hidden lg:flex lg:flex-col w-1/2 bg-blue items-center justify-center relative  ">
                <BackgroundAnimation />
                <BackgroundAnimation />
                <BackgroundAnimation />
            </div>


            <div className="w-full lg:w-1/2 h-[100vh] flex flex-col justify-center items-center">
                <section className="flex flex-col items-center">
                    <h1 className="text-[40px] text-blue tracking-tight"><span className="font-bold text-green">Uni</span>Lift</h1>
                    <h3 className="text-[11px] tracking-[0.5em] font-semibold text-gray-500">YOUR EASY LIFT</h3>
                </section>

                <section className="m-10 flex flex-col justify-center">
                    <h1 className="text-[30px] text-blue my-10  text-center">Te damos la bienvenida a <span className="font-bold">UniLift</span></h1>
                    <button type="submit"
                        className="w-full h-11 bg-green text-white rounded-3xl font-semibold shadow-sm hover:bg-blue mt-10" onClick={handleSignIn}>
                        Iniciar Sesión
                    </button>

                    <p className="mt-6 text-center text-gray-500">
                        ¿No tienes una cuenta?
                        <a href="" className="text-green hover:text-blue ml-1" onClick={handleSignUp}>Regístrate aquí</a>
                    </p>
                </section>
            </div>
        </div>
    );
}

export default StartPage;