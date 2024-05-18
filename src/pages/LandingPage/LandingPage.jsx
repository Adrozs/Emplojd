import { BsArrowDownCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SearchForm } from "../JobList/JobSearchForm";

import Footer from "../../components/Footer";
import ActiveSlider from "../../components/Carousel/ActiveSlider";
import Header from "../../components/Header/HeaderLandingpage";
import { useRef } from "react";

export default function LandingPage() {
  const learnMore = useRef(null);
  return (
    <>
      <section
        className="bg-gradient-to-b from-[#CA81ED] to-[#4086C6] bg-cover bg-no-repeat h-screen lg:pb-20"
        id="hero"
      >
        <Header> </Header>
        <div className=" container flex flex-col-reverse items-center  px-6 mx-auto space-y-0 mt-[-100px] md:space-y-0 flex-grow  md:flex-grow  sm:mt-[-75px] md:mt-[-75px]">
          <div className="flex flex-col items-center justify-center mt-48 space-y-12 md:w-1/2 text-white">
            <h1 className="text-3xl">
              Välkommen till <br />
              <span className="text-7xl font-Glockenspiel uppercase ">
                Emplojd
              </span>
            </h1>
            <p className="max-w-sm text-left md:text-left pl-4 pr-4">
              En tjänst som erbjuder AI-genererade personliga brev som är
              baserade på ditt CV, dina intressen samt dina preferenser. <br />
              För att <strong>det ska vara enkelt att söka jobb</strong>
            </p>
            <div className="flex justify-center md:justify-center flex-col">
              <Link
                to="/signin"
                className="flex items-center p-3 px-10 mb-20 bg-[#045199] text-stone-100 rounded-xl font-semibold shadow-xl"
              >
                Kom igång helt kostnadsfritt
                <span className="text-2xl"> &rarr;</span>
              </Link>
              <div className="max-w-sm text-center md:text-center mt-[100px] md:mt-[-40px]">
                <p>Hitta din nya tjänst</p>
                <div className="flex justify-center md:justify-center">
                  <button
                    className="p-5 px-6 pt-2 baseline"
                    onClick={() => {
                      learnMore.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <BsArrowDownCircle size="2rem" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
      <div className="w-full relative -top-10">
          <svg
            viewBox="0 0 360 81"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M140.276 59.1272C117.122 52.1522 92.7316 50.2797 68.7843 53.6387L21.4314 60.2807L-19.8566 65.3092L-26.1433 13.6907L14.6759 8.7192L61.5612 2.14278C92.9521 -2.26029 124.924 0.194269 155.275 9.33735L178.054 16.1993C231.376 32.2622 288.259 32.1796 341.534 15.962C346.896 14.3296 352.471 13.4999 358.076 13.4999H360V65.4999H358.076C357.602 65.4999 357.131 65.5701 356.677 65.7081C293.58 84.916 226.208 85.0137 163.055 65.9892L140.276 59.1272Z"
              fill="#eceef0"
            />
          </svg>
        </div>

        <div ref={learnMore}></div>
        <div className=" flex justify-center  ">
          <h6 className="my-4 flex-col font-semi-bold items-center justify-center text-center text-2xl font-bold ">
            Hitta <span className="text-customBlue">rätt</span> jobb för dig
          </h6>
        </div>

        
        <SearchForm />

        <ActiveSlider />
        <div className="flex justify-center md:justify-center">
          <Link
            to="/signin"
            className="rounded-[4px] p-3 px-12 mb-20 bg-customBlue text-stone-100"
          >
            Börja söka &rarr;
          </Link>
        </div>
      </section>
      <p className="ms-10 mr-10 mt-5 mb-20 md:mb-16">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <Footer />
    </>
  );
}
