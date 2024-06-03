import { Link, useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import html2pdf from "html2pdf.js";
import Loader from "../../ui/Loader";
import Footer from "../../components/Footer";
import Switch from "../../components/Switch";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import ApplySideThree from "./ApplySideThree";
import FormRow from "../../components/FormRow";
import ListForm from "../../components/ListForm";
import { useDarkMode } from "../../components/Icons/DarkModeHook";
import { toast } from "react-toastify";
import axios from "axios";
//Icons

import { RiCheckboxCircleFill } from "react-icons/ri";
import {
  FaArrowRight,
  FaArrowLeft,
  FaCircleCheck,
  FaRegCopy,
  FaDownload,
} from "react-icons/fa6";
import { getOneBackendJob } from "../../utils/backendserver";

function ApplyNow() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [daySincePosted, setDaySincePosted] = useState(null);
  const [page, setPage] = useState(1);
  const [temp, setTemp] = useState(0.5);
  const [copyText, setCopyText] = useState("");

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
    <>
      <main className="mb-2 lg:mb-24  md:mb-24">
        <HeaderOtherPages>
          <img src="/LogoEmplojd.png" alt="" className="w-[45px]" />
        </HeaderOtherPages>
        <div className="my-4 md:mt-20">
          {job && (
            <div className="mt-4 text-center font-semibold">
              {page <= 3 ? (
                <h2 className="text-2xl dark:text-white">
                  Generera ditt personliga brev
                </h2>
              ) : (
                <h2 className="text-2xl dark:text-white">
                  Ditt brev är redo att{" "}
                  <span className="text-customBlue">kopieras</span>{" "}
                </h2>
              )}
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
              <li className="h-[260px] w-[90%] bg-white p-4 flex flex-col justify-between  rounded-[20px] shadow-lg ">
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
                      {job.employment_Type.label}{" "}
                    </span>
                  )}

                  <span className="bg-[#C3E7F3] px-2 py-1 rounded-[2px]">
                    {job.occupation.label}
                  </span>
                </div>
                <div className="flex justify-between">
                  <button className="cursor-pointer" onClick={handleBack}>
                    Avbryt
                  </button>
                  <button
                    className="bg-customBlue rounded-[4px] text-white p-1 w-[70%] flex items-center justify-center gap-3 cursor-pointer"
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
        {page === 2 && (
          <ApplySideTwo
            job={job}
            page={page}
            setPage={setPage}
            temp={temp}
            setTemp={setTemp}
          />
        )}
        {page === 3 && (
          <ApplySideThree
            job={job}
            page={page}
            setPage={setPage}
            temp={temp}
            setCopyText={setCopyText}
          />
        )}
        {page === 4 && (
          <ApplySideFour
            job={job}
            page={page}
            setPage={setPage}
            temp={temp}
            copyText={copyText}
          />
        )}
      </main>
      <Footer />
    </>
  );
}

function ApplySideTwo({ job, page, setPage, temp, setTemp }) {
  const initialState = {
    email: "",
    isMember: true,
    firstname: "",
    lastname: "",
  };

  const [values, setValues] = useState(initialState);
  const [interests, setInterests] = useState([]);
  const [descriptiveWords, setDescriptiveWords] = useState([]);
  const { isDarkMode } = useDarkMode();
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [selectedOption, setSelectedOption] = useState("none");
  const prevValues = useRef(values);
  const prevSelectedOption = useRef(selectedOption);

  const handleSaveAndContinue = async () => {
    const authToken = localStorage.getItem("authToken");

    if (!authToken) {
      console.error("No auth token found");
      return;
    }

    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      isMember: values.isMember,
      interests: interests,
      descriptiveWords: descriptiveWords,
    };

    try {
      const response = await axios.post(
        "https://emplojdserver20240531231628.azurewebsites.net/api/UserProfile/CreateUserProfile",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      setPage(3);
      window.scrollTo(0, 0);
    } catch (error) {
      if (error.response) {
        console.error(
          `HTTP error! status: ${error.response.status}, message: ${error.response.data}`
        );
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setUnsavedChanges(true);
  };
  const handleListFormChange = (type, value) => {
    if (type === "interests") {
      setInterests(value);
    } else if (type === "descriptiveWords") {
      setDescriptiveWords(value);
    }
    setUnsavedChanges(true);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("No auth token found");
        return;
      }

      try {
        const response = await fetch(
          `https://emplojdserver20240531231628.azurewebsites.net/api/UserProfile/GetUserProfile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          console.error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }

        const data = await response.json();
        setValues({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          isMember: data.isMember || false,
        });
        setInterests(data.interests || []);
        setDescriptiveWords(data.descriptiveWords || []);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  useEffect(() => {
    const isDifferent = (prev, current) =>
      JSON.stringify(prev) !== JSON.stringify(current);

    if (
      isDifferent(prevValues.current, values) ||
      isDifferent(prevSelectedOption.current, selectedOption)
    ) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }

    prevValues.current = values;
    prevSelectedOption.current = selectedOption;
  }, [values, selectedOption]);

  const wordBgColorInterests = isDarkMode ? "bg-indigo-500" : "bg-sky-100";
  const wordBgColorDescriptiveWords = isDarkMode
    ? "bg-indigo-500"
    : "bg-purple-100";
  const handleNameChange = (e) => {
    const fullName = e.target.value.split(" ");
    const firstName = fullName.slice(0, -1).join(" ");
    const lastName = fullName.slice(-1).join(" ");
    setValues((prev) => ({
      ...prev,
      firstname: firstName,
      lastname: lastName,
    }));
  };

  return (
    <ul className="flex justify-center my-14 max-w-lg mx-auto pb-12">
      <div className=" w-[90%] bg-white p-4 px-8 pb-10 flex flex-col text-stone-800 rounded-[20px] shadow-lg">
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
          <p>Arbetstitel</p>
          <p className="text-lg font-semibold">{job.headline}</p>
        </div>

        <div className="my-8">
          <div className="dark:text-white">
            <FormRow
              type="firstname"
              labelText="Fullständigt namn"
              name="firstname"
              value={`${values.firstname} ${values.lastname}`}
              handleChange={handleNameChange}
            />
          </div>
          <div className="dark:text-white">
            <ListForm
              wordBgColor={wordBgColorInterests}
              name="Mina intressen"
              type="interests"
              onChange={(value) => handleListFormChange("interests", value)}
              value={interests}
            />
            <ListForm
              wordBgColor={wordBgColorDescriptiveWords}
              name="Beskrivning av mig"
              type="descriptiveWords"
              onChange={(value) =>
                handleListFormChange("descriptiveWords", value)
              }
              value={descriptiveWords}
            />
          </div>
        </div>
        <label className='text-sm"'>
          <div className="flex flex-col gap-8">
            <span>Hur självständig ska AI:n vara?</span>
            <input
              type="range"
              className="w-full h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer custom-slider"
              min="0.5"
              max="1"
              step="0.1"
              value={temp}
              onChange={(e) => {
                setTemp(e.target.value);
              }}
            />
            <div className="flex justify-between text-sm">
              <span>Lite självständig</span>
              <span>Mycket självständig</span>
            </div>
          </div>
        </label>

        <div className="flex justify-between items-center mt-4">
          <Link to="/joblist" className="text-sm">
            Avbryt
          </Link>
          <button
            className=" w-[35%] text-customBlue py-1 border border-customBlue rounded-[4px] flex items-center justify-center gap-2 cursor-pointer"
            onClick={() => {
              setPage(1);
              window.scrollTo(0, 0);
            }}
          >
            <FaArrowLeft /> Tillbaka
          </button>
          <button
            className="bg-customBlue rounded-[4px] text-white py-1 w-[45%] flex items-center justify-center gap-3"
            onClick={handleSaveAndContinue}
          >
            Fortsätt <FaArrowRight />
          </button>
        </div>
      </div>
    </ul>
  );
}

function ApplySideFour({ job, page, setPage, copyText }) {
  const [copied, setCopied] = useState(false);

  /* Copy text */
  const copyTextToClipboard = () => {
    navigator.clipboard
      .writeText(copyText)
      .then(() => setCopied(true))
      .catch((error) => console.error("Could not copy text:", error));
  };

  const saveAsPdf = () => {
    const confirmDownload = window.confirm("Vill du ladda ner brevet som PDF?");
    if (confirmDownload) {
      const element = document.createElement("div");
      element.style.whiteSpace = "pre-wrap";
      element.style.padding = "5px";
      element.innerText = copyText;
      html2pdf().from(element).save();
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-14 max-w-lg mx-auto pb-12">
        <div className="h-[250px] w-[90%] bg-white p-4 flex flex-col justify-between rounded-[20px] shadow-md">
          <div className="mx-auto">
            <RiCheckboxCircleFill size={46} />
          </div>
          <div className="px-10 text-center">
            Ditt personliga brev är sparat.
          </div>
          <div className="flex flex-col items-center gap-4">
            {copied && (
              <p className="flex items-center gap-2 text-sm">
                <span className="text-lime-500">
                  <FaCircleCheck size={18} />
                </span>{" "}
                Brevet har kopierats.
              </p>
            )}
            <button
              onClick={copyTextToClipboard}
              className="text-sm bg-customBlue text-white w-[156px] rounded-[4px] text-[13px] flex items-center justify-center gap-3 py-2 cursor-pointer shadow-lg"
            >
              <FaRegCopy size={18} /> Kopiera brev
            </button>
          </div>
          <div className="flex flex-col justify-center items-center text-sm">
            <a
              onClick={saveAsPdf}
              className="underline flex items-center gap-1"
            >
              <FaDownload />
              Ladda ner personligt brev
            </a>
          </div>
        </div>
        <div className="mt-6 w-[90%] bg-white p-4 flex gap-4 rounded-[20px] justify-center shadow-md ">
          <Link
            to="/joblist"
            className="text-[13px] text-customBlue border border-customBlue rounded-[8px] flex items-center justify-center gap-1  w-[156px] py-1 px-1"
          >
            <FaArrowLeft /> Tillbaka till annonser
          </Link>

          <a
            href={job.application_Details.url}
            target="_blank"
            className=" bg-gradient-to-br to-[#CA81ED] from-[#0EA5E9] dark:bg-gradient-to-t dark:from-purple-800 dark:to-slate-500 bg-cover bg-no-repeat text-white w-[156px] py-1 rounded-[8px] text-[13px] flex items-center justify-center gap-3"
          >
            Ansök här <FaArrowRight />
          </a>
        </div>
      </div>
    </>
  );
}

export default ApplyNow;
