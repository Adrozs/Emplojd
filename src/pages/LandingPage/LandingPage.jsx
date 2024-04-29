import { BsArrowDownCircle } from "react-icons/bs";
import { Link } from "react-router-dom";
import { SearchForm } from "../JobList/JobSearchForm";

import Footer from "../../components/Footer";
import ActiveSlider from "../../components/Carousel/ActiveSlider";

export default function LandingPage() {
  return (
    <>
      <section className="bg-stone-400 pb-20" id="hero">
        <div className="container flex flex-col-reverse items-center px-6 mx-auto mt-6 space-y-0 md:space-y-0 md:flex-grow">
          <div className="flex flex-col items-center justify-center mt-48 space-y-12 md:w-1/2">
            <h1 className="text-3xl">
              Välkommen till <br />
              <span className="text-7xl uppercase">Emplojd</span>
            </h1>
            <p className="max-w-sm text-left md:text-left pl-4 pr-4">
              En tjänst som erbjuder AI-genererade personliga brev som är
              baserade på ditt CV, dina intressen samt dina preferenser. <br />
              För att <strong>det ska vara enkelt att söka jobb</strong>
            </p>
            <div className="flex justify-center md:justify-center">
              <Link
                to="/signin"
                className="rounded-[4px] p-3 px-12 mb-20 bg-stone-800 text-stone-100"
              >
                Kom igång helt kostnadsfritt &rarr;
              </Link>
            </div>
            <div className="max-w-sm text-center md:text-center">
              <p>Hitta din nya tjänst</p>
              <div className="flex justify-center md:justify-center">
                <button className="p-5 px-6 pt-2 baseline">
                  <BsArrowDownCircle size="2rem" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-4">
        <div className=" min-h-4 flex justify-center  ">
          <h6 className="my-4 flex-col font-semi-bold items-center justify-center text-center text-2xl font-bold">
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
      {/* <div className="min-h-96 mt-10">
        <h6 className="mt-2 flex-col font-bold items-center justify-center text-center text-2xl mb-10">
          Såhär går det till
        </h6>

        <div className="flex mr-10 ms-10 mb-20 ml-20">
          <div className="mr-12">
            <button className="p-5 px-6 pt-2 baseline">
              <SiPokemon size="4rem" />
            </button>
            <h6 className="font-bold text-xl">1. lorem ipsum</h6>
            <p>lorem ipsum lorem ipsum lorem </p>
          </div>

          <div>
            <button className="p-5 px-6 pt-2 baseline">
              <SiPokemon size="4rem" />
            </button>
            <h6 className="font-bold text-xl">2. lorem ipsum</h6>
            <p>lorem ipsum lorem ipsum lorem </p>
          </div>
        </div>

        <div className="flex mr-10 ms-10 mb-10 ml-20">
          <div className="mr-12">
            <button className="p-5 px-6 pt-2 baseline">
              <SiPokemon size="4rem" />
            </button>
            <h6 className="font-bold text-xl">3. lorem ipsum</h6>
            <p>lorem ipsum lorem ipsum lorem </p>
          </div>

          <div>
            <button className="p-5 px-6 pt-2 baseline">
              <SiPokemon size="4rem" />
            </button>
            <h6 className="font-bold text-xl">4. lorem ipsum</h6>
            <p>lorem ipsum lorem ipsum lorem </p>
          </div>
        </div>

        <div className="flex justify-center md:justify-center">
          <Link to="/signin" className=" ml-5 p-3 px-40 font-bold bg-stone-300">
            CTA?
          </Link>
        </div>
        <h6 className="font-bold mt-20 ms-10 text-2xl">TEXT</h6>
      </div> */}
      <p className="ms-10 mr-10 mt-5 mb-10">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
      <Footer />
    </>
  );
}
