import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import Footer from "../../components/Footer";
import { FaFileSignature, FaChevronRight } from "react-icons/fa";

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

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
      <div className="min-h-screen">
      <HeaderOtherPages />
        <div className="bg-gradient-to-tl-purple-sky dark:bg-dark-gradient-to-140-purple-slate p-4 flex justify-between items-center text-center my-3 mx-5 rounded-xl">
          <h6 className=" text-xl ml-2 text-white">Sparade personliga brev</h6>
          <FaFileSignature size={22} className="text-white mr-2" />
        </div>

        <div className="mt-4">
          <div className="bg-sky-100 p-4 w-[90%] mx-auto rounded-[10px] dark:bg-gray-900">
            <p className="text-sm ml-2 text-black dark:text-white">
              Här har du full åtkomst till dina sparade personliga brev.
            </p>
          </div>
          <ul className="flex flex-col items-center justify-center my-10 max-w-lg mx-4 pb-10">
            {coverLetters.length > 0 ? (
              coverLetters.map((letter, index) => (
                <div
                  key={index}
                  className="min-h-[180px] w-[90%] bg-white p-4 flex flex-col justify-between  rounded-[20px] mb-4 dark:text-white dark:bg-stone-900"
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
                    <Link
                      to={`/coverletter/${letter.coverLetterId}`}
                      className="flex items-center gap-2 text-customBlue underline dark:text-indigo-400"
                    >
                      Visa brev <FaChevronRight size={22} />
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="border-gray-400 border-dashed border-2 h-[230px] w-[90%] p-4 flex justify-between rounded-[20px] mb-4 items-center dark:bg-slate-700">
                <p className="text-xl dark:text-white">
                  Dina framtida sparade personliga brev hamnar här.
                </p>
              </div>
            )}
          </ul>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default NoEarlierCoverLetter;