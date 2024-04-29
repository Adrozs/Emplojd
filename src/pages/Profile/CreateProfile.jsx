import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/Header";

function CreateProfile() {
  const [expandedStep, setExpandedStep] = useState(null);

  const toggleExpansion = (stepNumber) => {
    setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
  };

  return (
    <div
      className="flex flex-col min-h-screen gap-2 m-4 relative"
      style={{ minHeight: "calc(100vh - 120px)" }}
    >
      <Header />
      <div className="flex justify-center">
        <div className="flex justify-center items-center bg-stone-200 w-[75%] h-16 my-8">
          VÄLKOMMEN USER
        </div>
      </div>
      <div className="flex bg-stone-300 h-6 items-center p-4">4 ENKLA STEG</div>
      <div>
        {[
          "1. LADDA UPP DITT CV",
          "2. SKAPA DIN JOBBPROFIL",
          "3. SWIPEA BLAND MATCHANDE JOBB",
          "4. GENERERA PERSONLIGA BREV",
        ].map((step, index) => (
          <div
            key={index}
            className={`flex bg-stone-400 mb-4 p-4 cursor-pointer ${
              expandedStep === index + 1 ? "h-48" : "h-16 items-center"
            }`}
            onClick={() => toggleExpansion(index + 1)}
          >
            {step}
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 w-full">
        <Link
          className="flex bg-stone-500 w-full h-16 justify-center items-center mt-64"
          to="/joblist"
        >
          KOM IGÅNG
        </Link>
      </div>
    </div>
  );
}

export default CreateProfile;
