function LoadingFirstPage() {
  return (
    <div className="bg-blue w-full h-[100vh] flex flex-col justify-center items-center text-white">
      <img src="/path/to/your/logo.png" alt="UniLift Logo" className="w-48 h-auto mb-8" /> {/* Add your logo image */}
      <h1 className=" text-[50px] tracking-tight"><span className="font-bold">Uni</span>Lift</h1>
      <h3 className="tracking-[0.5em] text-[10px] text-gray-500 font-semibold">YOUR EASY LIFT</h3>
    </div>
  );
}

export default LoadingFirstPage;