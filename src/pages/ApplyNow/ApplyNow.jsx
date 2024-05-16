import { Link, useParams } from "react-router-dom";
import { getOneJob } from "../../services/apiJobs";
import { useEffect, useRef, useState } from "react";
import Loader from "../../ui/Loader";
import Footer from "../../components/Footer";
import Switch from "../../components/Switch";
import HeaderSearchJob from "../../components/Header/HeaderSearchJob";
import Tooltip from "../../components/Tooltip";

import html2pdf from "html2pdf.js";
//Icons
import { FiCopy } from "react-icons/fi";
import { FaEdit } from "react-icons/fa";
import { IoMdRefresh } from "react-icons/io";
function ApplyNow() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [daySincePosted, setDaySincePosted] = useState(null);
  const [page, setPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const jobData = await getOneJob(jobId);
        setJob(jobData);
      } catch (error) {
        console.error("Error fetching job:", error.message);
      }
    }
    fetchData();
  }, [jobId]);

  useEffect(() => {
    if (job && job.application_deadline) {
      const todaysDate = new Date();
      const jobPosted = new Date(job.publication_date);
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
        <HeaderSearchJob>
          <img src="/LogoEmplojd.png" alt="" className="w-[45px]" />
        </HeaderSearchJob>
        <Loader />
      </>
    );
  }

  return (
    <main className="mb-2">
      <HeaderSearchJob>
        <img src="/LogoEmplojd.png" alt="" className="w-[45px]" />
      </HeaderSearchJob>
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
            </div>
          </div>
        )}
      </div>
      {page === 1 && (
        <>
          <ul className="flex justify-center my-14  max-w-lg mx-auto">
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
                    {job.workplace_address.municipality} - {daySincePosted}{" "}
                    dagar sen
                  </p>
                </div>
              </div>
              <div className="flex gap-2 text-[12px]">
                {job.working_hours_type.label ? (
                  <span className="bg-[#CFEBD4] px-2 py-1 rounded-[2px]">
                    {job.working_hours_type.label}
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
                  className="bg-customBlue rounded-[4px] text-white p-1 w-[70%]"
                  onClick={() => {
                    setPage(2);
                    window.scrollTo(0, 0);
                  }}
                >
                  Nästa &rarr;
                </button>
              </div>
            </li>
          </ul>
        </>
      )}
      {page === 2 && <ApplySideTwo job={job} page={page} setPage={setPage} />}
      {page === 3 && <ApplySideThree job={job} page={page} setPage={setPage} />}
      <Footer />
    </main>
  );
}

function ApplySideTwo({ job, page, setPage }) {
  return (
    <ul className="flex justify-center my-14  max-w-lg mx-auto">
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
              value="10"
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
            &larr; Tillbaka
          </button>
          <button
            className="bg-customBlue rounded-[4px] text-white py-1 w-[45%]"
            onClick={() => {
              setPage(3);
              window.scrollTo(0, 0);
            }}
          >
            Fortsätt &rarr;
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

  useEffect(() => {
    if (editable) {
      editEl.current.focus();
    }
  }, [editable]);

  const copyTextToClipboard = () => {
    const textToCopy = editEl.current.innerText;
    navigator.clipboard
      .writeText(textToCopy)
      .then(() => setCopied(true))
      .catch((error) => console.error("Could not copy text: ", error));
  };

  const saveAsPdf = () => {
    const confirmDownload = window.confirm("Vill du ladda ner brevet som PDF?");
    if (confirmDownload) {
      const element = editEl.current;
      const tempDiv = document.createElement("div");
      tempDiv.appendChild(element.cloneNode(true));

      // Konvertera innehållet till en PDF med html2pdf
      html2pdf().from(tempDiv).save();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center my-14  max-w-lg mx-auto">
      <div className="h-[150px] w-[90%] bg-white p-4 flex flex-col justify-between rounded-[20px]">
        <div>
          <div className="grid grid-cols-2 w-[70%] items-center">
            <h2 className=" ml-10 text-2xl font-semibold">{page}.</h2>
            <div className="flex justify-center">
              <p className="text-sm ">Kontrollera brevet</p>
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
        <div className="self-end">
          <Tooltip tooltip={copied ? "✅ Kopierad" : "Kopiera"}>
            <button onClick={copyTextToClipboard}>
              <FiCopy size={22} />
            </button>
          </Tooltip>
        </div>
        <div
          className="p-4"
          contentEditable={editable ? "true" : "false"}
          ref={editEl}
        >
          <h3> Hej där,</h3>
          <br />
          <p>
            Jag hoppas att detta brev når er i god hälsa och högmod. Mitt namn
            är Fady och jag skriver till er med en genuin passion för
            .NET-utveckling och en stark önskan att bidra till ert team.
            <br />
            <br />
            Jag har nyligen stött på er annonsering för en .NET-utvecklare och
            jag kunde inte motstå att söka. Efter att ha granskat er verksamhet
            och era projekt, är jag imponerad av den nivå av innovation och
            engagemang ni visar. Att få möjlighet att arbeta med er och bidra
            till era framgångar skulle vara en ära för mig.
            <br />
            <br />
            Med en gedigen erfarenhet inom .NET-utveckling och en passion för
            att lösa komplexa problem, tror jag att jag kan vara en tillgång för
            ert team. Jag har arbetat med olika projekt inom området och har en
            djup förståelse för ramverket och dess möjligheter. Jag är van vid
            att arbeta både självständigt och i team och har en stark vilja att
            lära och växa.
            <br />
            <br /> Det är min övertygelse att genom att kombinera min tekniska
            expertis med min förmåga att tänka kreativt och
            problemlösningsorienterat, kan jag bidra till att driva era projekt
            framåt och uppnå era mål.
            <br />
            <br />
            Jag ser fram emot möjligheten att diskutera hur jag kan bidra till
            ert team ytterligare. Tack för er tid och övervägande. <br />
            <br />
            Med vänliga hälsningar, <br />
            Fady
          </p>
        </div>
      </aside>
      <div className="h-[160px] w-[90%] bg-white p-4 flex flex-col justify-between rounded-[20px]">
        <div>
          <div className="flex justify-between">
            <button
              className="underline text-sm ml-3"
              onClick={() => {
                setPage(2);
                window.scrollTo(0, 0);
              }}
            >
              &larr; Tillbaka till innehållet
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
        <div className="flex justify-center">
          <button
            className="bg-customBlue rounded-[4px] text-white p-1 w-[95%] h-[40px]"
            onClick={() => setPage(3)}
          >
            Spara personligt brev &rarr;
          </button>
        </div>
      </div>
    </div>
  );
}

export default ApplyNow;
