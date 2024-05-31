import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header/HeaderLandingpage";
import { LoginRightArrow } from "../../components/Icons/AuthFormSvg";
import { FaEnvelope } from "react-icons/fa";
const ConfirmEmail = () => {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("");

  useEffect(() => {
    const userId = searchParams.get("userId");
    const code = searchParams.get("code");

    if (userId && code) {
      console.log("Kod till backend", { userId, code });
      axios
        .get("https://localhost:54686/confirm-email", {
          params: { userId, code },
        })
        .then((response) => {
          console.log("Response:", response);
          setStatus(
            `Email registreringen lyckades. Logga in för att komma igång!`
          );
        })
        .catch((error) => {
          console.error("Error:", error);
          setStatus("Misslyckades med att bekräftandet av email.");
        });
    } else {
      console.error("Missing userId or code in query parameters");
      setStatus("Invalid request. Missing userId or code.");
    }
  }, [searchParams]);

  return (
    <>
      <div className="flex flex-col h-screen pb-12">
        <div className="flex-grow inner-shadow-bottom bg-gradient-to-br to-[#CA81ED] from-[#4086C6] dark:bg-gradient-to-t dark:from-purple-800 dark:to-slate-500 bg-cover bg-no-repeat">
          <Header>
            {" "}
            <h1 className="font-Glockenspiel text-2xl cursor-pointer text-white">
              EMPLOJD
            </h1>
          </Header>
          <div className="p-6 max-w-lg mx-auto  text-white h-full flex item-center justify-center flex-col gap-3 mt-14">
            <h1 className="text-4xl font-semibold text-center mb-10">
              Skapa konto
            </h1>
            <h2 className="text-2xl mb-4">Bekräfta din e-postadress</h2>
            <p>
              E-mail registreringen lyckades! <br />
            </p>
            <p> Logga in för att komma igång.</p>
          </div>
        </div>
        <form className="m-5 my-12">
          <div className="flex flex-col gap-4">
            <Link
              to="/signin"
              className="w-full bg-sky-500 h-16 rounded-xl text-white text-xl hover:bg-[#045199] active:bg-[#066DCC] mb-2 flex px-8 justify-between items-center font-semibold "
            >
              Logga in <LoginRightArrow />
            </Link>
            <div className="flex justify-center gap-4">
              <button className="w-full border-[2px] border-customBlue h-16 rounded-xl text-customBlue text-xl font-semibold  mb-2 flex px-8 justify-between items-center">
                Skicka igen <FaEnvelope size={22} />
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default ConfirmEmail;
