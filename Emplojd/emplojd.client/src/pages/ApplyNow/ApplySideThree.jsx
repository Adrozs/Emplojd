import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { useMutation } from "react-query";
import html2pdf from "html2pdf.js";
import Loader from "../../ui/Loader";
import Tooltip from "../../components/Tooltip";
import { getProfileInfo } from "../../utils/backendserver";

// Icons
import { FiCopy } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";

export default function ApplySideThree({ job, page, setPage }) {
  const [editable, setEditable] = useState(false);
  const editEl = useRef(null);
  const [copied, setCopied] = useState(false);
  const [letterContent, setLetterContent] = useState("");
  const [profil, setProfile] = useState("");

  /* Fetch cover letter */
  const { mutate, isLoading, error, data } = useMutation(async (postData) => {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      "https://emplojdserver20240531231628.azurewebsites.net/GetCoverLetter",
      postData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  });

  useEffect(() => {
    const fetchProfileInfo = async () => {
      try {
        const profile = await getProfileInfo();
        setProfile(profile);
        console.log(profile);
      } catch (error) {
        console.error("Error fetching profile info:", error);
      }
    };
    fetchProfileInfo();
  }, []);

  useEffect(() => {
    if (profil && job) {
      const postData = {
        firstname: profil.firstname || "",
        lastname: profil.lastname || "",
        userInterestTags: profil.interests || [],
        descriptiveWords: profil.descriptiveWords || [],
        jobId: job.id || 0,
        jobTitle: job.headline || "",
        jobDescription: job.description?.text || "",
        cvText: letterContent,
        temperature: 0.7,
      };

      console.log("Sending data to backend:", postData);
      mutate(postData);
    }
  }, [profil, job, mutate]);

  /* Update text */
  useEffect(() => {
    if (data) {
      setLetterContent(data);
    }
  }, [data]);

  /* Save text content */
  const clickToSave = async () => {
    const token = localStorage.getItem("authToken");

    const todaysDate = new Date().toISOString();

    const postLetter = {
      coverLetterId: Math.floor(Math.random() * 1000000),
      coverLetterTitle: job.headline || "",
      coverLetterContent: letterContent,
      companyName: job.employer.name,
      date: todaysDate,
      temperature: 0.7,
    };

    console.log("Sending cover letter to backend:", postLetter);

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
      console.log("Response from backend:", response.data);
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

  const handleInput = (e) => {
    setLetterContent(e.currentTarget.innerText);
  };

  /* Copy text */
  const copyTextToClipboard = () => {
    navigator.clipboard
      .writeText(letterContent)
      .then(() => setCopied(true))
      .catch((error) => console.error("Could not copy text:", error));
  };

  /* Save as pdf */
  const saveAsPdf = () => {
    const confirmDownload = window.confirm("Vill du ladda ner brevet som PDF?");
    if (confirmDownload) {
      const element = editEl.current;
      const tempDiv = document.createElement("div");
      tempDiv.appendChild(element.cloneNode(true));
      html2pdf().from(tempDiv).save();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-14 max-w-lg mx-auto pb-12">
      <div className="h-[150px] w-[90%] bg-white p-4 flex flex-col justify-between rounded-[20px]">
        <div>
          <div className="grid grid-cols-2 w-[70%] items-center">
            <h2 className="ml-10 text-2xl font-semibold">{page}.</h2>
            <div className="flex justify-center">
              <p className="text-sm">Kontrollera brevet</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center mt-1 py-1">
            <span className="bg-gray-300 h-[1px] w-[85%] rounded"></span>
          </div>
        </div>
        <div>
          <p className="text-sm">Ansökan för</p>
          <h3 className="font-semibold text-xl text-stone-900">
            {job.headline}
          </h3>
        </div>
      </div>
      <aside className="my-6 w-[90%] bg-white p-4 flex flex-col rounded-[20px]">
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="self-end">
              <Tooltip tooltip={copied ? "✅ Kopierad" : "Kopiera"}>
                <button onClick={copyTextToClipboard}>
                  <FiCopy size={22} />
                </button>
              </Tooltip>
            </div>
            <div
              className="p-4"
              contentEditable={editable}
              ref={editEl}
              onInput={handleInput}
              dangerouslySetInnerHTML={{ __html: letterContent }}
            />
          </>
        )}
      </aside>
      <div className="h-[190px] w-[90%] bg-white p-4 flex flex-col justify-between rounded-[20px]">
        <div>
          <div className="flex justify-between">
            <button
              className="underline text-sm ml-3 flex items-center gap-1"
              onClick={() => {
                setPage(2);
                window.scrollTo(0, 0);
              }}
            >
              <FaArrowLeft /> Tillbaka till innehållet
            </button>
          </div>
        </div>
        <div className="flex justify-between mx-3">
          <button
            onClick={() => setEditable(!editable)}
            className="w-[45%] bg-white text-customBlue p-1 border border-customBlue rounded-[4px] flex items-center justify-center gap-2 text-[13px]"
          >
            Redigera brev <FaEdit size={15} />
          </button>
          <button className="w-[45%] bg-white text-customBlue p-1 border border-customBlue rounded-[4px] flex items-center justify-center gap-1 text-[13px]">
            Generera brev <IoMdRefresh size={18} />
          </button>
        </div>
        <div className="flex justify-center flex-col">
          <button
            className="bg-customBlue rounded-[4px] text-white p-1 w-[100%] h-[40px] flex items-center justify-center gap-3"
            onClick={() => {
              clickToSave();
              setPage(4);
            }}
          >
            Spara personligt brev <FaArrowRight />
          </button>
          <button className="text-sm mt-2 underline" onClick={saveAsPdf}>
            Ladda ner som pdf
          </button>
        </div>
      </div>
    </div>
  );
}
