import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import {faCar} from '@fortawesome/free-solid-svg-icons';

function RolPage () {

    const userName = localStorage.getItem('userName') || 'Usuario';

  return (

    <div className="lg:w-full lg:h-[100vh] lg:flex lg:flex-col lg:justify-center lg:items-center lg:bg-blue">

        <div className="w-full h-[100vh] lg:-m-10 lg:absolute lg:h-[105vh] lg:w-[50vw] lg:rounded-full flex flex-col justify-between lg:justify-around items-center text-blue lg:bg-white">
        
        <section className="mt-24 lg:mt-4">
            <h1 className="text-[25px] mb-14 font-bold">Hola {userName},</h1>
            <h2 className="text-[22px] font-bold">¿cúal será tu rol hoy?</h2>
            <p className="mt-4">luego podrás cambiarlo si lo deseas</p>
        </section>

            <section className="-mt-24 lg:-mt-48 flex">
                <button className="shadow-md p-6 rounded-xl m-3 w-36 hover:border-2 hover:border-blue flex items-center justify-center">
                <FontAwesomeIcon icon={faUser} style={{ color: '#152E52' }} className="m-2 text-3xl" />
                    Pasajero</button>
                <button className="shadow-md p-6 rounded-xl m-3 w-36 hover:border-2 hover:border-blue flex items-center justify-center">
                <FontAwesomeIcon icon={faCar} style={{ color: '#152E52' }} className="m-2 text-3xl" />
                    Conductor</button>
            </section>
            
            <section className="bg-blue w-full h-1/5 lg:hidden ">
                
            </section>

        </div>

    </div>

  )
}

export default RolPage;