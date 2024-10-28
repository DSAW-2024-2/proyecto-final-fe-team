function RolPage () {

    const userName = localStorage.getItem('userName') || 'Usuario';

  return (
    <div className="w-full h-[100vh] flex flex-col justify-between items-center text-blue">
      
      <section className="mt-24">
        <h1 className="text-[25px] mb-14 font-bold">Hola {userName},</h1>
        <h2 className="text-[22px] font-bold">¿cúal será tu rol hoy?</h2>
        <p className="mt-4">luego podrás cambiarlo si lo deseas</p>
      </section>

        <section className="-mt-24">
            <button className="shadow-md p-6 rounded-xl m-3 w-36 hover:border-2 hover:border-blue">Pasajero</button>
            <button className="shadow-md p-6 rounded-xl m-3 w-36 hover:border-2 hover:border-blue">Conductor</button>
        </section>
        
        <section className="bg-blue w-full h-1/5 ">
            
        </section>

    </div>
  )
}

export default RolPage;