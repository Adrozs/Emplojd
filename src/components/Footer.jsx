import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <>
      <div className="relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 130"
          className="absolute top-[-30px] md:top-[-70px] w-full xl:top-[-100px]"
        >
          <path
            fill="#fff"
            fillOpacity="1"
            d="M0,80L80,72C160,64,320,48,480,48C640,48,800,64,960,72C1120,80,1280,80,1360,80L1440,80L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
          ></path>
        </svg>
        <div className="z-10">
          <div className="bg-white">
            <div className="flex justify-center">
              <h2 className="inline  p-2.5 pl-5 pr-5 font-bold mt-10 mb-10 text-5xl font-Glockenspiel">
                EMPLOJD
              </h2>
            </div>
            <div className="text-center mb-10">
              <h3 className="mb-5 font-bold text-xl">TEXT</h3>
              <p className="mb-3">Min sida</p>
              <p className="mb-3">Sök jobb</p>
            </div>
            <h2 className="flex justify-center font-bold mb-3 text-xl">
              Följ oss på sociala medier
            </h2>
            <div className="flex justify-center">
              <button className="p-5 px-6 pt-2 baseline">
                <AiFillTwitterCircle size="2.5rem" />
              </button>
              <button className="p-5 px-6 pt-2 baseline">
                <FaInstagramSquare size="2.5rem" />
              </button>
              <button className="p-5 px-6 pt-2 baseline">
                <FaFacebook size="2.5rem" />
              </button>
            </div>
            <h3 className="flex justify-center text-xl font-bold mb-7 mt-4">
              Ladda ner vår app
            </h3>
            <div className="flex justify-evenly ">
              <div className="ml-5">
                <Link to="/signin" className="p-3 px-6 font-bold bg-stone-300">
                  App Store
                </Link>
              </div>
              <div>
                <Link to="/signin" className="p-3 px-6 font-bold bg-stone-300">
                  Google Play
                </Link>
              </div>
            </div>
            <p className="flex justify-center pt-12 pb-7 text-xs ">
              Copyright bla bla bla
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
