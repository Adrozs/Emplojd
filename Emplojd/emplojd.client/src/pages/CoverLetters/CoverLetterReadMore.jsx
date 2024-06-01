import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import Footer from "../../components/Footer";
import { FaChevronLeft, FaTrash, FaFileSignature } from "react-icons/fa";
import { FaRegPenToSquare, FaRegCopy } from "react-icons/fa6";
import Loader from "../../ui/Loader";
import axios from "axios";
import { toast } from "react-toastify";
function CoverLetterReadMore() {
  const { jobId } = useParams();
  const [letter, setLetter] = useState(null);
  const navigate = useNavigate();

  const fetchJobData = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }

      const url = `https://emplojdserver20240531231628.azurewebsites.net/saved-letter/${id}?coverLetterId=${id}`;
      console.log("Fetching URL:", url);

      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error(`Couldn't find letter #${id}`);
      }

      const jobData = await res.json();
      console.log(jobData);
      setLetter(jobData);
    } catch (error) {
      console.error("Error fetching letter data:", error);
    }
  };

  useEffect(() => {
    if (jobId) {
      fetchJobData(jobId);
    }
  }, [jobId]);

  useEffect(() => {
    if (!letter) return;
    document.title = `${letter.coverLetterTitle || "Emplojd"}`;
    return () => {
      document.title = "Emplojd";
    };
  }, [letter]);

  const handleBack = () => {
    window.history.back();
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const localDate = new Date(
      date.getTime() + date.getTimezoneOffset() * 60000
    );
    return new Intl.DateTimeFormat("sv-SE", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(localDate);
  };

  /* Delete cover letter */
  const clickToDelete = async (id) => {
    const token = localStorage.getItem("authToken");

    const postLetter = {
      coverLetterId: id,
    };

    console.log("Sending cover letter to backend:", postLetter);

    try {
      const response = await axios.delete(
        "https://emplojdserver20240531231628.azurewebsites.net/saved-letter",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: postLetter,
        }
      );
      console.log("Successfully deleted:", response.data);
      toast("Personligt brev har raderats.");
      navigate("/coverletter");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <>
      <HeaderOtherPages />
      <div className="bg-gradient-to-tl from-purple-400 to-sky-500 p-4 flex justify-between items-center my-7 text-center w-[90%] mx-auto rounded-[10px]">
        <h6 className="text-[20px] ml-2 text-white">Sparade personliga brev</h6>
        <FaFileSignature size={22} className="text-white mr-2" />
      </div>
      {letter ? (
        <main className="max-w-7xl mx-auto px-2">
          <>
            <div className="bg-white py-3 mt-8 px-1 rounded-[10px]">
              <div className="w-full flex flex-col justify-center ">
                <h1 className="text-xl font-semibold text-stone-700">
                  {letter.coverLetterTitle}
                </h1>
                <div className="self-start px-1 py-2 ">
                  <p className="text-left">till</p>
                  <p className="text-sm">{letter.companyName}</p>
                </div>
                <div className="w-full flex items-center justify-between mx-auto mt-3 px-2">
                  <div className="flex items-center underline text-sky-800">
                    <FaChevronLeft size={20} />
                    <a className="ml-1 text-sm" onClick={handleBack}>
                      Tillbaka till överblick
                    </a>
                  </div>

                  <p className="text-sm">Skapad {formatDate(letter.date)}</p>
                </div>
              </div>
            </div>

            <div className="p-3 max-w-4xl mx-auto mt-3 pb-14 bg-gradient-to-t from-white to-blue-100 flex items-center justify-center gap-2 text-sm">
              <button
                onClick={() => clickToDelete(letter.coverLetterId)}
                className="px-[16px] py-[12px] rounded-[8px] bg-white flex items-center gap-2"
              >
                <FaTrash /> Ta bort
              </button>
              <button className="px-[16px] py-[12px] rounded-[8px] bg-purple-400 text-white flex items-center gap-2">
                <FaRegPenToSquare /> Redigera
              </button>
              <button className="px-[16px] py-[12px] rounded-[8px] bg-sky-500 text-white flex items-center gap-2">
                <FaRegCopy /> Kopiera
              </button>
            </div>
            <div className="p-4 max-w-4xl mx-auto  pb-28 bg-white">
              <div
                dangerouslySetInnerHTML={{
                  __html: letter.coverLetterContent,
                }}
              />
            </div>
          </>
        </main>
      ) : (
        <main className="min-w-7xl mx-auto px-2 h-[40vh]">
          <Loader />
        </main>
      )}
      <Footer />
    </>
  );
}

export default CoverLetterReadMore;
