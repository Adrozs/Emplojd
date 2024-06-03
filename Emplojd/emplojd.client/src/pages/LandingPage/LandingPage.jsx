import { BsArrowDownCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { SearchForm } from "../JobList/JobSearchForm";
import Footer from "../../components/Footer";
import ActiveSlider from "../../components/Carousel/ActiveSlider";
import Header from "../../components/Header/HeaderLandingpage";
import { FaArrowRight } from "react-icons/fa6";
import { useState, useRef } from "react";
import { getJobsBackend } from "../../utils/backendserver";
import { toast } from "react-toastify";
import EmplojdLogo from "../../components/Icons/EmplojdLogoSVG";

export default function LandingPage() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [job, setJob] = useState("");
  const [jobsData, setJobsData] = useState(null);

  const token = localStorage.getItem("authToken");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (token) {
      try {
        let data;
        if (city && job) {
          data = await getJobsBackend(city + "+" + job);
          setCity("");
          setJob("");
        } else if (city && !job) {
          data = await getJobsBackend(city);
          setCity("");
        } else if (!city && job) {
          data = await getJobsBackend(job);
          setJob("");
        } else {
          return;
        }
        setJobsData(data);
        navigate("/jobsearch", {
          state: { jobsData: data, query: { city, job } },
        });
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    } else {
      toast.error("Du måste vara inloggad för att söka jobb.");
      navigate("/signin");
    }
  };

  const handleGetStarted = () => {
    if (token) {
      navigate("/MyProfile");
    } else {
      navigate("/signin", { state: { isSignUp: true } });
    }
  };

  const learnMoreRef = useRef(null);

  return (
    <>
      <section
        className="bg-gradient-to-b from-[#CA81ED] to-[#4086C6] dark:bg-gradient-to-t dark:from-purple-800 dark:to-slate-500 bg-cover bg-no-repeat lg:pb-20"
        id="hero"
      >
        <Header> </Header>
        <div className="container flex flex-col-reverse items-center px-6 mx-auto space-y-0 mt-[-100px] md:space-y-0 flex-grow md:flex-grow sm:mt-[-75px] md:mt-[-75px]">
          <div className="flex flex-col items-center justify-center mt-44 space-y-12 sm:mt-48  text-white">
            <h1 className="text-3xl">
              Välkommen till <br />
              <EmplojdLogo fill="white" className="mt-2 w-80" />
            </h1>
            <p className="max-w-sm text-left md:text-left pl-4 pr-4">
              En tjänst som använder AI för att enkelt generera personliga brev
              baserat på dig, ditt cv och jobbannonsen för jobbet du söker.{" "}
              <br />
              För att det ska vara <strong> smidigt att söka jobb</strong>
            </p>
            <div className="flex justify-center flex-col">
              <button
                onClick={handleGetStarted}
                className="flex items-center p-3 px-10 mb-20 bg-[#045199] text-stone-100 rounded-xl font-semibold shadow-xl gap-4 cursor-pointer"
              >
                Kom igång helt kostnadsfritt
                <FaArrowRight size={16} />
              </button>
              <div className="text-center md:text-center">
                <p>Hitta din nya tjänst</p>
                <div className="flex justify-center md:justify-center">
                  <button
                    className="px-6 pt-2 cursor-pointer"
                    aria-label="Scrolla nedåt knapp"
                    onClick={() => {
                      learnMoreRef.current?.scrollIntoView({
                        behavior: "smooth",
                      });
                    }}
                  >
                    <BsArrowDownCircle className="mb-28" size="2rem" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col dark:bg-gray-800 ">
        <div
          ref={learnMoreRef}
          className="w-full relative -top-10 md:-top-16 ls:-top-24 lg:-top-32 xl:-top-48 xxl:-top-80"
        >
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
              className="dark:fill-gray-800"
            />
          </svg>
        </div>
        <div className="relative -top-1 md:-top-20 ls:-top-32 lg:-top-48 xl:-top-96 max-w-[750px]mx-auto">
          <div className=" flex justify-center">
            <h2 className="font-semi-bold mb-5 text-center text-3xl font-bold dark:text-white">
              Hitta{" "}
              <span className="text-customBlue dark:text-sky-500">rätt</span>{" "}
              jobb för dig
            </h2>
          </div>
          <div className="max-w-[750px] mx-6 ls:mx-auto pb-10">
            {" "}
            <SearchForm
              handleSubmit={handleSubmit}
              setCity={setCity}
              setJob={setJob}
              job={job}
              city={city}
              bgColor="bg-white dark:bg-zinc-900"
              // latest={latest}
            />
          </div>

          <ActiveSlider />
          <div className="flex justify-center sm:mt-8">
            <Link
              to="/signin"
              aria-label="Logga in"
              className="w-[290px] flex items-center justify-center gap-3 rounded-[12px] p-3 px-12 mb-20 sm:mt-8 bg-customBlue text-stone-100 shadow-lg"
            >
              Logga in <FaArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>
      {/* <p className="relative ms-10 mr-10 mb-28 md:mb-20 lg:mb-10 -top-1 md:-top-20 ls:-top-32 lg:-top-48 xl:-top-80 text-center xxl:mb-40">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p> */}
      <Footer />
    </>
  );
}
