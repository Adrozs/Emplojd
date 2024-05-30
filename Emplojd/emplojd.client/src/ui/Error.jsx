import { useNavigate, useRouteError } from "react-router-dom";
import HeaderOtherPages from "../components/Header/HeaderOtherPages";
import Footer from "../components/Footer";
import { FaArrowLeft } from "react-icons/fa6";
function NotFound() {
  const navigate = useNavigate();
  const error = useRouteError();

  return (
    <>
      <HeaderOtherPages />
      <div className="w-full h-[60vh] flex  flex-col items-center justify-center gap-4">
        <h1 className="text-2xl">404 sidan hittades inte </h1>
        <p>{error.data || error.message}</p>
        <button
          className="flex items-center gap-2 rounded-[12px] p-3 px-12 mb-20 sm:mt-8 bg-customBlue text-stone-100"
          onClick={() => navigate(-1)}
        >
          <FaArrowLeft /> Gå tillbaka
        </button>
      </div>
      <Footer />
    </>
  );
}

export default NotFound;
