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

  return (
    <>
      <HeaderOtherPages />
      <div className="flex flex-col min-h-screen gap-2 m-4 relative" style={{ minHeight: "calc(100vh - 120px)" }}>
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
            "1. LADDA UPP DITT CV",
            "2. SKAPA DIN JOBBPROFIL",
            "3. SWIPEA BLAND MATCHANDE JOBB",
            "4. GENERERA PERSONLIGA BREV",
          ].map((step, index) => (
            <div
              key={index}
              className={`flex flex-col bg-stone-400 mb-4 p-4 cursor-pointer ${expandedStep === index + 1 ? "h-52" : "h-16"}`}
              onClick={() => toggleExpansion(index + 1)}
            >
              {step}
              {expandedStep === 1 && index === 0 && (
                <span>
                  <div className="mt-8">
                    <div className={`flex items-center h-12 p-2 ${fileName !== "INGEN FIL ÄR VALD" ? "file-selected" : ""}`}>
                      {fileName}
                      {fileName !== "INGEN FIL ÄR VALD" && (
                        <button className="ml-auto p-2" onClick={handleDeleteFile}>
                          x
                        </button>
                      )}
                    </div>
                    {fileName === "INGEN FIL ÄR VALD" && (
                      <>
                        <div className="flex justify-center mt-8">
                          <button className="bg-stone-500 p-2 px-8" onClick={triggerFileInput}>
                            VÄLJ FIL
                          </button>
                        </div>
                        <input
                          ref={fileInputRef}
                          type="file"
                          style={{ display: 'none' }}
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
          <Link className="flex bg-stone-500 w-full h-16 justify-center items-center mt-64" to="/joblist">
            KOM IGÅNG
          </Link>
        </div>
      </div>
    </>
  );
}

export default CreateProfile;
