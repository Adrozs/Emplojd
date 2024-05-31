import { Link, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Loader from "../../ui/Loader";
import Footer from "../../components/Footer";
import Switch from "../../components/Switch";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import Tooltip from "../../components/Tooltip";

import html2pdf from "html2pdf.js";
//Icons
import { FiCopy } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
import { RiCheckboxCircleFill } from "react-icons/ri";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa6";
import { getOneBackendJob, getProfileInfo } from "../../utils/backendserver";
import axios from "axios";
import { useMutation } from "react-query";

function ApplyNow() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [daySincePosted, setDaySincePosted] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const jobData = await getOneBackendJob(jobId);
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job:", error.message);
      }
    }
    fetchData();
  }, [jobId]);

  useEffect(() => {
    if (job && job.application_Deadline) {
      const todaysDate = new Date();
      const jobPosted = new Date(job.publication_Date);
      const differenceInTime = todaysDate.getTime() - jobPosted.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setDaySincePosted(differenceInDays);
    }
  }, [job]);

  const handleBack = () => {
    window.history.back();
  };

  if (!job) {
    return (
      <>
        <HeaderOtherPages>
          <img src="/LogoEmplojd.png" alt="" className="w-[45px]" />
        </HeaderOtherPages>
        <Loader />
      </>
    );
  }

  return (
    <main className="mb-2">
      <HeaderOtherPages>
        <img src="/LogoEmplojd.png" alt="" className="w-[45px]" />
      </HeaderOtherPages>
      <div className="my-4">
        {job && (
          <div className="mt-4 text-center font-semibold">
            <h2 className="text-2xl">Generera ditt personliga brev</h2>
            <div className=" m-4 flex items-center justify-center gap-4">
              <span
                className={
                  page === 1
                    ? "h-4 w-4 bg-customBlue rounded-full"
                    : "h-4 w-4 rounded-full  bg-slate-300"
                }
              ></span>
              <span
                className={
                  page === 2
                    ? "h-4 w-4 bg-customBlue rounded-full"
                    : "h-4 w-4 rounded-full  bg-slate-300"
                }
              ></span>
              <span
                className={
                  page === 3
                    ? "h-4 w-4 bg-customBlue rounded-full"
                    : "h-4 w-4 rounded-full bg-slate-300"
                }
              ></span>
              <span
                className={
                  page === 4
                    ? "h-4 w-4 bg-customBlue rounded-full"
                    : "h-4 w-4 rounded-full bg-slate-300"
                }
              ></span>
            </div>
          </div>
        )}
      </div>
      {page === 1 && (
        <>
          <ul className="flex justify-center my-14  max-w-lg mx-auto pb-12">
            <li className="h-[260px] w-[90%] bg-white p-4 flex flex-col justify-between  rounded-[20px] ">
              <div>
                <div className="grid grid-cols-2 w-[70%] items-center ">
                  <h2 className="ml-10 text-2xl font-semibold">{page}.</h2>
                  <div className="flex justify-center">
                    <p className="text-sm ">Jobb du söker</p>
                  </div>
                </div>
                <div className="w-full flex items-center justify-center mt-1">
                  <span className="bg-gray-300 h-[1px] w-[85%] rounded"></span>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-stone-900">
                  {job.headline}
                </h3>

                <p className="text-lg">{job.employer.name}</p>
                <div>
                  <p className="text-sm my-2">
                    {job.workplace_Address.municipality} - {daySincePosted}{" "}
                    dagar sen
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-[12px]">
                {job.working_Hours_Type.label ? (
                  <span className="bg-[#CFEBD4] px-2 py-1 rounded-[2px]">
                    {job.working_Hours_Type.label}
                  </span>
                ) : (
                  <span className="bg-purple-300 px-2 py-1">
                    {job.employment_type.label}{" "}
                  </span>
                )}

                <span className="bg-[#C3E7F3] px-2 py-1 rounded-[2px]">
                  {job.occupation.label}
                </span>
              </div>
              <div className="flex justify-between">
                <button onClick={handleBack}>Avbryt</button>
                <button
                  className="bg-customBlue rounded-[4px] text-white p-1 w-[70%] flex items-center justify-center gap-3"
                  onClick={() => {
                    setPage(2);
                    window.scrollTo(0, 0);
                  }}
                >
                  Nästa <FaArrowRight />
                </button>
              </div>
            </li>
          </ul>
        </>
      )}
      {page === 2 && <ApplySideTwo job={job} page={page} setPage={setPage} />}
      {page === 3 && <ApplySideThree job={job} page={page} setPage={setPage} />}
      {page === 4 && <ApplySideFour job={job} page={page} setPage={setPage} />}
      <Footer />
    </main>
  );
}

function ApplySideTwo({ job, page, setPage }) {
  return (
    <ul className="flex justify-center my-14  max-w-lg mx-auto pb-12">
      <div className=" w-[90%] bg-white p-4 pb-10 flex flex-col text-stone-800 rounded-[20px] ">
        <div>
          <div className="grid grid-cols-2 w-[70%] items-center">
            <h2 className="ml-10 text-2xl font-semibold">{page}.</h2>
            <div className="flex justify-center">
              <p className="text-sm ">Fyll i ansökan</p>
            </div>
          </div>
          <div className="w-full flex items-center justify-center mt-1">
            <span className="bg-gray-300 h-[1px] w-[85%] rounded"></span>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex gap-3 my-10">
            <p>Jobb</p>
            <Switch />
            <p>Praktik</p>
          </div>
        </div>
        <div>
          <p>Arbetstitle</p>
          <p className="text-xl font-semibold">{job.headline}</p>
        </div>
        <form className="max-w-sm my-4">
          <label className="flex flex-col text-sm mb-6">
            <span>Fullständingt namn</span>
            <input
              className="p-1 bg-stone-100 h-[52px] px-3 rounded-[20px]"
              type="text"
              placeholder="Namn Efternamnsson"
            />
          </label>
          <label className="flex flex-col text-sm my-4 mb-6">
            <span>Intressen (separerat med kommatecken)</span>
            <input
              className="p-1 mt-1 bg-stone-100 h-[52px] px-3 rounded-[20px]"
              type="text"
              placeholder="Fiske, odling, bilar"
            />
          </label>

          <label className="flex flex-col text-sm my-4 mb-6">
            <span>Beskrivande ord (separerat med kommatecken)</span>
            <input
              className="p-1 mt-1 bg-stone-100 h-[52px] px-3 rounded-[20px]"
              type="text"
              placeholder="Problemlösare, snabblärd"
            />
          </label>
          <label className='text-sm"'>
            <span>Hur självständig ska AI:n vara?</span>
            <input
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
            />
            <div className="flex justify-between text-sm">
              <span>Lite självständig</span>
              <span>Mycket självständig</span>
            </div>
          </label>
        </form>
        <div className="flex justify-between items-center mt-4">
          <Link to="/joblist" className="text-sm">
            Avbryt
          </Link>
          <button
            className=" w-[35%] text-customBlue py-1 border border-customBlue rounded-[4px] flex items-center justify-center gap-2 "
            onClick={() => {
              setPage(1);
              window.scrollTo(0, 0);
            }}
          >
            <FaArrowLeft /> Tillbaka
          </button>
          <button
            className="bg-customBlue rounded-[4px] text-white py-1 w-[45%] flex items-center justify-center gap-3"
            onClick={() => {
              setPage(3);
              window.scrollTo(0, 0);
            }}
          >
            Fortsätt <FaArrowRight />
          </button>
        </div>
      </div>
    </ul>
  );
}

function ApplySideThree({ job, page, setPage }) {
  const [editable, setEditable] = useState(false);
  const editEl = useRef(null);
  const [copied, setCopied] = useState(false);
  const [letterContent, setLetterContent] = useState("");

  const [profil, setProfile] = useState("");

  const { mutate, isLoading, error, data } = useMutation(async (postData) => {
    const token = localStorage.getItem("authToken");

    const response = await axios.post(
      "https://localhost:54686/GetCoverLetter",
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
        userInterestTags: profil.userInterestTags || [],
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

  useEffect(() => {
    if (data) {
      setLetterContent(data);
    }
  }, [data]);

  useEffect(() => {
    if (editable) {
      editEl.current.focus();
    }
  }, [editable]);

  const handleInput = (e) => {
    setLetterContent(e.currentTarget.innerText);
  };

  const copyTextToClipboard = () => {
    navigator.clipboard
      .writeText(letterContent)
      .then(() => setCopied(true))
      .catch((error) => console.error("Could not copy text:", error));
  };

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
            onClick={() => setPage(4)}
          >
            Spara personligt brev <FaArrowRight />
          </button>
          <button className="text-sm mt-2 underline" onClick={saveAsPdf}>
            Ladda ner som pdf
          </button>
        </div>
      </div>
      {isLoading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
}

function ApplySideFour({ job, page, setPage }) {
  return (
    <div className="flex flex-col items-center justify-center my-14  max-w-lg mx-auto pb-12">
      <div className="h-[250px] w-[90%] bg-white p-4 flex flex-col gap-4 rounded-[20px]">
        <div className="mx-auto">
          <RiCheckboxCircleFill size={36} />
        </div>
        <div className="px-10">
          Ditt personliga brev är nu sparat och lorem ipsum lorem ipsum
        </div>
        <div className="flex flex-col items-center gap-4">
          <Link
            to="/NoEarlierCoverLetter"
            className="text-sm text-customBlue border border-customBlue rounded-[4px] flex items-center justify-center gap-1 text-[13px] w-[156px] py-1"
          >
            Gå till sparade brev
          </Link>
          <a
            href={job.application_Details.url}
            target="_blank"
            className="text-sm bg-customBlue text-white w-[156px] py-1 rounded-[4px] text-[13px] flex items-center justify-center gap-3"
          >
            Ansök här <FaArrowRight />
          </a>

          <Link className="text-sm underline" to="/joblist">
            Sök fler jobb
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ApplyNow;
