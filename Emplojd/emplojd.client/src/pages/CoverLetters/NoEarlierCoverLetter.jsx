import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import Footer from "../../components/Footer";
import { FaFileSignature, FaChevronRight } from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";

function NoEarlierCoverLetter() {
  const [coverLetters, setCoverLetters] = useState([]);

  useEffect(() => {
    function getCoverLetter() {
      const token = localStorage.getItem("authToken");

      return axios
        .get(
          "https://emplojdserver20240531231628.azurewebsites.net/saved-letter",
          {
            headers: {
              Accept: "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data);
          setCoverLetters(response.data);
          return response;
        })
        .catch((error) => {
          console.error("Error fetching cover letters:", error);
          return null;
        });
    }
    getCoverLetter();
  }, []);

  return (
    <>
      <HeaderOtherPages />
      <div className="bg-gradient-to-tl from-purple-400 to-sky-500 p-4 flex justify-between items-center my-7 text-center w-[90%] mx-auto rounded-[10px]">
        <h6 className=" text-[20px] ml-2 text-white">
          Sparade personliga brev
        </h6>
        <FaFileSignature size={22} className="text-white mr-2" />
      </div>

      <div className="mt-4 pb-80">
        <div className="bg-sky-100 p-4 w-[90%] mx-auto rounded-[10px]">
          <p className="text-sm ml-2 text-black">
            Här har du full åtkomst till dina sparade personliga brev.
          </p>
        </div>
        <ul className="flex flex-col items-center justify-center my-10 max-w-lg mx-auto pb-10">
          {coverLetters.length > 0 ? (
            coverLetters.map((letter, index) => (
              <div
                key={index}
                className="min-h-[180px] w-[90%] bg-white p-4 flex flex-col justify-between  rounded-[20px] mb-4"
              >
                <p className="text-[18px] font-semibold">
                  {letter.coverLetterTitle}
                </p>
                <div>
                  <p>till</p>
                  <p className="font-semibold">{letter.companyName}</p>
                </div>
                <div className="flex justify-between items-center mr-3 text-[14px]">
                  <p>Skapad den 1 juni 2024</p>
                  <button className="flex items-center gap-2 text-customBlue underline">
                    Visa brev <FaChevronRight size={22} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="border-gray-400 border-dashed border-2 h-[230px] w-[90%] p-4 flex justify-between rounded-[20px] mb-4 items-center">
              <p className="text-xl">
                Dina framtida sparade personliga brev hamnar här.
              </p>
            </div>
          )}
        </ul>
      </div>
      <Footer />
    </>
  );
}

export default NoEarlierCoverLetter;
