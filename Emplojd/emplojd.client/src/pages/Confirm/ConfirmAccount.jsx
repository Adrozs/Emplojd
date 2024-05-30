import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/HeaderLandingpage";
import { LoginRightArrow } from "../../components/Icons/AuthFormSvg";
import { FaEnvelope } from "react-icons/fa";
import { toast } from "react-toastify";

const ConfirmAccount = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="flex flex-col h-screen">
        <div className="flex-grow bg-gradient-to-r-custom inner-shadow-bottom">
          <Header>
            {" "}
            <h1 className="font-Glockenspiel text-2xl cursor-pointer text-white">
              EMPLOJD
            </h1>
          </Header>
          <div className="p-6 max-w-lg mx-auto  text-white h-full flex item-center justify-center flex-col gap-3 mt-10">
            <h1 className="text-4xl font-semibold text-center mb-8">
              Skapa konto
            </h1>
            <h2 className="text-2xl mb-4">Bekräfta din e-postadress</h2>
            <p>
              Vi har skickat ett mejl till den e-postadress du angav. Bekräfta
              mejlet och återkom.
            </p>
            <div className="bg-white rounded-3xl px-6 py-2 text-gray-900">
              <p>
                Hittar du inget mejl kan du skicka ett nytt via knappen nedan.
              </p>
            </div>
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
              <button
                onClick={() =>
                  toast(
                    "Nytt email har skickats, kontrollera även din skräppostmapp om du inte hittar mejlet"
                  )
                }
                className="w-full border-[2px] border-customBlue h-16 rounded-xl text-customBlue text-xl font-semibold  mb-2 flex px-8 justify-between items-center"
              >
                Skicka igen <FaEnvelope size={22} />
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default ConfirmAccount;
