import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook, FaInstagramSquare } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Footer({ children }) {
  return (
    <>
      <div className="relative">
        <svg
          viewBox="20.02 16 337 79.16"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute -top-12 w-full"
        >
          <g filter="url(#filter0_d_1272_965)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M213.202 36.5003C233.611 43.4877 255.494 45.0084 276.673 40.9111L315.657 33.3693L318.766 32.9121C329.653 31.3111 340.643 30.5073 351.647 30.5073H357.02V82.5073H351.647C343.175 82.5073 334.714 83.1261 326.332 84.3588L324.383 84.6454L286.55 91.9645C256.455 97.7867 225.359 95.6258 196.358 85.6969L179.403 79.8921C133.184 64.0681 83.0186 64.035 36.7783 79.7978C31.5154 81.5919 25.993 82.5073 20.4328 82.5073H20.0203V30.5723V30.5073H20.2107C77.2932 11.1004 139.201 11.1653 196.246 30.6954L213.202 36.5003Z"
              fill="white"
            />
          </g>
        </svg>
        <div className="z-10">
          <div className="bg-white">
            <div className="flex justify-center items-center">
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
