import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import Footer from "../../components/Footer";
import { FaChevronLeft, FaTrash, FaFileSignature } from "react-icons/fa";
import { FaRegPenToSquare, FaRegCopy, FaCircleCheck } from "react-icons/fa6";
import Loader from "../../ui/Loader";
import axios from "axios";
import { toast } from "react-toastify";

function CoverLetterReadMore() {
  const { jobId } = useParams();
  const [letter, setLetter] = useState(null);
  const [editable, setEditable] = useState(false);
  const navigate = useNavigate();
  const editEl = useRef(null);
  const [text, setText] = useState("");
  const [savedText, setSavedTest] = useState(false);

  const fetchJobData = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        throw new Error("No auth token found");
      }
      const url = `https://emplojdserver20240531231628.azurewebsites.net/saved-letter/${id}?coverLetterId=${id}`;

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
      // console.log(jobData);
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

    // console.log("Sending cover letter to backend:", postLetter);

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
      // console.log("Successfully deleted:", response.data);
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

  /* Edit text */
  useEffect(() => {
    if (editable) {
      editEl.current.focus();
    }
  }, [editable]);

  const handleTextChange = (e) => {
    const newText = e.currentTarget.innerText;
    setText(newText);
    // console.log(newText);
  };

  const copyTextToClipboard = () => {
    navigator.clipboard
      .writeText(text || letter.coverLetterContent)
      .then(() => toast.success("Texten har kopierats."))
      .catch((error) => toast.error("Kunde inte kopiera text."));
  };

  /* save new lettter */
  const clickToSave = async () => {
    const token = localStorage.getItem("authToken");

    const postLetter = {
      coverLetterId: letter.coverLetterId,
      coverLetterTitle: letter.headline,
      coverLetterContent: text,
      companyName: letter.companyName,
      date: letter.date,
      temperature: 0.7,
    };

    // console.log("Sending new letter to backend:", postLetter);

    try {
      const response = await axios.post(
        "https://emplojdserver20240531231628.azurewebsites.net/save-letter",
        postLetter,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // console.log("Response from backend:", response.data);
      setEditable(false);
      setSavedTest(true);
      toast("Det nya brevet har sparats");
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
      <div className="bg-gradient-to-tl-purple-sky dark:bg-dark-gradient-to-140-purple-slate p-4 flex justify-between items-center mx-5 my-3 text-center rounded-xl md:mt-20 shadow-md">
        <h6 className=" text-xl ml-2 text-white">Sparade personliga brev</h6>
        <FaFileSignature size={22} className="text-white mr-2" />
      </div>
      {letter ? (
        <main className="max-w-7xl mx-auto px-6">
          <>
            <div className="bg-white py-3 my-5 px-1 rounded-xl dark:text-white dark:bg-stone-900 shadow-md">
              <div className="w-full flex flex-col justify-center p-4">
                <h1 className="text-xl font-semibold text-stone-700 dark:text-white">
                  {letter.coverLetterTitle}
                </h1>
                <div className="self-start px-1 py-2 ">
                  <p className="text-sm">{letter.companyName}</p>
                </div>
                <div className="w-full flex items-center justify-between mx-auto mt-3">
                  <div className="flex items-center underline">
                    <FaChevronLeft
                      size={20}
                      className="fill-sky-800 dark:fill-indigo-400"
                    />
                    <a
                      className="ml-2 text-sm dark:text-indigo-400"
                      onClick={handleBack}
                    >
                      Tillbaka
                    </a>
                  </div>

                  <p className="text-sm">Skapad {formatDate(letter.date)}</p>
                </div>
              </div>
            </div>
            <div>
              {savedText && (
                <p className="flex items-center gap-2 pl-2 my-4 text-sm dark:text-white">
                  Dina ändringar har sparats.
                  <span className="text-lime-500">
                    <FaCircleCheck />
                  </span>{" "}
                </p>
              )}
            </div>

            <div className="bg-white rounded-2xl mb-24 dark:text-white dark:bg-stone-900 shadow-md">
              <div className="px-3 pt-10 pb-6 max-w-4xl mx-auto mt-3 bg-gradient-to-t from-white to-blue-100 dark:from-stone-900 dark:to-slate-800 rounded-2xl flex items-center justify-center gap-2 text-sm ">
                {!editable ? (
                  <>
                    {" "}
                    <button
                      onClick={() => clickToDelete(letter.coverLetterId)}
                      className="p-3 rounded-xl bg-white flex items-center gap-2 dark:text-black"
                    >
                      <FaTrash /> Ta bort
                    </button>
                    <button
                      onClick={() => setEditable(!editable)}
                      className="p-3 rounded-xl bg-purple-400 text-white flex items-center gap-2"
                    >
                      <FaRegPenToSquare /> Redigera
                    </button>
                    <button
                      onClick={copyTextToClipboard}
                      className="p-3 rounded-xl bg-sky-500 text-white flex items-center gap-2"
                    >
                      <FaRegCopy /> Kopiera
                    </button>{" "}
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => setEditable(false)}
                      className="px-4 py-3 rounded-lg bg-red-400 text-white flex items-center gap-2 mr-2"
                    >
                      <FaRegCopy /> Ångra ändringar
                    </button>
                    <button
                      onClick={() => clickToSave()}
                      className="px-[16px] py-[12px] rounded-[8px] bg-lime-500 text-white flex items-center gap-2 ml-2"
                    >
                      <FaRegCopy /> Spara ändringar
                    </button>
                  </>
                )}
              </div>

              <div className="p-4 pb-12 max-w-4xl">
                <div
                  className="p-2 editable-content"
                  contentEditable={editable}
                  ref={editEl}
                  onInput={handleTextChange}
                  dangerouslySetInnerHTML={{
                    __html: letter.coverLetterContent,
                  }}
                />
              </div>
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
