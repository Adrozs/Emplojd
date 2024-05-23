import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";

function CreateProfile() {
  const [expandedStep, setExpandedStep] = useState(null);
  const [fileName, setFileName] = useState("INGEN FIL ÄR VALD");
  const fileInputRef = useRef(null);

  const toggleExpansion = (stepNumber) => {
    if (stepNumber === 1) {
      setExpandedStep(expandedStep === stepNumber ? null : stepNumber);
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };

  const handleDeleteFile = () => {
    setFileName("INGEN FIL ÄR VALD");
    fileInputRef.current.value = null;
  };

  const triggerFileInput = (event) => {
    event.stopPropagation();
    fileInputRef.current.click();
  };

  const UploadSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
    >
      <path fill="currentColor" d="M9 16v-6H5l7-7l7 7h-4v6zm-4 4v-2h14v2z" />
    </svg>
  );
  const ProfileSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1m-8-5a3 3 0 1 1 6 0a3 3 0 0 1-6 0m1.942 4a3 3 0 0 0-2.847 2.051l-.044.133l-.004.012c-.042.126-.055.167-.042.195c.006.013.02.023.038.039c.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415a.7.7 0 0 1 .146-.155c.019-.016.031-.026.038-.04c.014-.027 0-.068-.042-.194l-.004-.012l-.044-.133A3 3 0 0 0 10.059 14z"
        clipRule="evenodd"
      />
    </svg>
  );
  const SwipeSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
    >
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M15 16.572v2.42A2.01 2.01 0 0 1 12.991 21H5.01A2.01 2.01 0 0 1 3 18.991V11.01A2.01 2.01 0 0 1 5.009 9h2.954" />
        <path d="M9.167 4.511a2.04 2.04 0 0 1 2.496-1.441l7.826 2.097a2.04 2.04 0 0 1 1.441 2.496l-2.097 7.826a2.04 2.04 0 0 1-2.496 1.441L8.51 14.833a2.04 2.04 0 0 1-1.441-2.496L9.167 4.51z" />
      </g>
    </svg>
  );
  const LetterSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2em"
      height="2em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M15 5.25A3.25 3.25 0 0 0 18.25 2h1.5A3.25 3.25 0 0 0 23 5.25v1.5A3.25 3.25 0 0 0 19.75 10h-1.5A3.25 3.25 0 0 0 15 6.75zM4 7a2 2 0 0 1 2-2h7V3H6a4 4 0 0 0-4 4v10a4 4 0 0 0 4 4h12a4 4 0 0 0 4-4v-5h-2v5a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z"
      />
    </svg>
  );
  const DeleteSVG = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1.5em"
      height="1.5em"
      viewBox="0 0 24 24"
    >
      <path
        fill="currentColor"
        d="M6 19a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7H6zM8 9h8v10H8zm7.5-5l-1-1h-5l-1 1H5v2h14V4z"
      />
    </svg>
  );

  return (
    <>
      <HeaderOtherPages />
      <div
        className="flex flex-col min-h-screen gap-2 m-4 relative"
        style={{ minHeight: "calc(100vh - 120px)" }}
      >
        <div className="flex justify-center">
          <div className="flex justify-center items-center bg-stone-200 w-[75%] h-16 my-8">
            VÄLKOMMEN USER
          </div>
        </div>
        <div className="flex bg-stone-300 h-6 items-center p-4">
          4 ENKLA STEG
        </div>
        <div>
          {[
            { text: "1. LADDA UPP DITT CV", icon: <UploadSVG /> },
            { text: "2. SKAPA DIN JOBBPROFIL", icon: <ProfileSVG /> },
            { text: "3. SWIPEA BLAND MATCHANDE JOBB", icon: <SwipeSVG /> },
            { text: "4. GENERERA PERSONLIGA BREV", icon: <LetterSVG /> },
          ].map((step, index) => (
            <div
              key={index}
              className={`flex flex-col bg-stone-400 mb-4 p-4 cursor-pointer ${
                expandedStep === index + 1 ? "h-52" : "h-16"
              }`}
              onClick={() => toggleExpansion(index + 1)}
            >
              <div className="flex items-center justify-between">
                {step.text}
                {step.icon}
              </div>

              {expandedStep === 1 && index === 0 && (
                <span>
                  <div className="mt-8">
                    <div
                      className={`flex items-center h-12 p-2 ${
                        fileName !== "INGEN FIL ÄR VALD" ? "file-selected" : ""
                      }`}
                    >
                      {fileName}
                      {fileName !== "INGEN FIL ÄR VALD" && (
                        <button
                          className="ml-auto p-2"
                          onClick={handleDeleteFile}
                        >
                          <DeleteSVG />
                        </button>
                      )}
                    </div>
                    {fileName === "INGEN FIL ÄR VALD" && (
                      <>
                        <div className="flex justify-center mt-8">
                          <button
                            className="bg-stone-500 p-2 px-8"
                            onClick={triggerFileInput}
                          >
                            VÄLJ FIL
                          </button>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          style={{ display: "none" }}
                          onChange={handleFileChange}
                          onClick={(e) => e.stopPropagation()}
                        />
                      </>
                    )}
                  </div>
                </span>
              )}
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
    </>
  );
}

export default CreateProfile;
