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
        <Header />
        <div className=" container flex flex-col-reverse items-center  px-6 mx-auto space-y-0 md:space-y-0 flex-grow  md:flex-grow  sm:mt-[-75px] md:mt-[-75px]">
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
                className="rounded-[4px] p-3 px-12 mb-20 bg-stone-800 text-stone-100"
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
        <div ref={learnMore}></div>
        <div className=" flex justify-center  ">
          <h6 className="my-4 flex-col font-semi-bold items-center justify-center text-center text-2xl font-bold ">
            Hitta <span className="text-customBlue">rätt</span> jobb för dig
          </h6>
        </div>

        <div className="w-full ">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 130"
            className=" absolute bottom-0 w-full"
          >
            <path
              fill="#eceef0"
              fillOpacity="1"
              d="M0,80L80,72C160,64,320,48,480,48C640,48,800,64,960,72C1120,80,1280,80,1360,80L1440,80L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
            ></path>
          </svg>
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
      <p className="ms-10 mr-10 mt-5 mb-10 md:mb-16">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <Footer />
    </>
  );
}
