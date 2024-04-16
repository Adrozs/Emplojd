import { Link } from "react-router-dom";
function Profle() {
  return (
    <div
      className="flex flex-col min-h-screen"
    >
      <div className="flex justify-center">
        <div className="flex justify-center bg-stone-200 w-[75%] mb-6">
          VÄLKOMMEN USER
        </div>
      </div>
      <div className="flex bg-stone-300 h-8 items-center mb-6 p-4">
        4 ENKLA STEG
      </div>
      <div>
        <div className="flex bg-stone-400 h-16 items-center mb-4 p-4">
          1. LADDA UPP DITT CV
        </div>
        <div className="flex bg-stone-400 h-16 items-center mb-4 p-4">
          2. SKAPA DIN JOBBPROFIL
        </div>
        <div className="flex bg-stone-400 h-16 items-center mb-4 p-4">
          3. SWIPEA BLAND MATCHANDE JOBB
        </div>
        <div className="flex bg-stone-400 h-16 items-center p-4">
          4. GENERERA PERSONLIGA BREV
        </div>
      </div>
      <div className="flex-end">
        <Link
          className="flex bg-stone-500 w-full h-16 justify-center items-center"
          to="/joblist"
        >
          KOM IGÅNG
        </Link>
      </div>
    </div>
  );
}

export default Profle;
