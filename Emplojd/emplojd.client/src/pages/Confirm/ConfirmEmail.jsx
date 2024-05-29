import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";
import Footer from "../../components/Footer";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import HeaderSearchJob from "../../components/Header/HeaderSearchJob";
import Header from "../../components/Header/HeaderLandingpage";

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
    <div className=" ">
      <section className="bg-gradient-to-b from-[#CA81ED] to-[#4086C6] bg-cover bg-no-repeat lg:pb-20 h-[75vh] ">
        <Header> </Header>
        <div className="container flex flex-col-reverse items-center px-6 mx-auto space-y-0 mt-[-100px] md:space-y-0 flex-grow md:flex-grow sm:mt-[-75px] md:mt-[-75px]">
          <div className="flex flex-col items-center justify-center mt-44 space-y-12 sm:mt-48  text-white">
            <h1 className="text-3xl">
              Bekräfta din e-postadress <br />
            </h1>
            <p className="max-w-sm  md:text-left pl-4 pr-4 text-center">
              <p>{status}</p>
            </p>
            <div className="flex justify-center flex-col">
              <Link
                to="/signin"
                className="flex items-center p-3 px-10 mb-20 bg-[#045199] text-stone-100 rounded-xl font-semibold shadow-xl gap-4"
              >
                Logga in!
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default ConfirmEmail;
