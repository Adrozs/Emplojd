import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import { FaChevronLeft, FaArrowRight } from "react-icons/fa";
import Footer from "../../components/Footer";
import { FaHeart } from "react-icons/fa6";
import Loader from "../../ui/Loader";

function SavedJobsReadMore() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  const fetchJobData = async (id) => {
    try {
      const token = localStorage.getItem("authToken");

      const url = `https://emplojdserver20240531231628.azurewebsites.net/ad/${id}?adId=${id}`;
      console.log("Fetching URL:", url);

      const res = await fetch(url, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) throw new Error(`Couldn't find job #${id}`);

      const jobData = await res.json();
      console.log(jobData);
      setJob(jobData);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  const isHTML = (str) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  };

  useEffect(() => {
    fetchJobData(jobId);
  }, [jobId]);

  useEffect(() => {
    if (!job) return;
    document.title = `${job.headline}`;
    return () => {
      document.title = "Emplojd";
    };
  }, [job]);

  const handleBack = () => {
    window.history.back();
  };

  return (
    <>
      <HeaderOtherPages />
      <div className="bg-gradient-to-tl-purple-sky dark:bg-dark-gradient-to-140-purple-slate p-4 flex justify-between items-center mx-5 my-3 text-center rounded-xl md:mt-20 ">
        {" "}
        <h6 className=" text-[20px] ml-2 text-white">Sparade jobb</h6>
        <FaHeart size={22} className="text-white mr-2" />
      </div>
      {job ? (
        <main className="max-w-7xl mx-auto px-2 md:mb-40">
          <>
            <div className="bg-white py-3 m-5 px-1 rounded-xl dark:text-white dark:bg-stone-900">
              <div className="w-full flex flex-col justify-center p-4">
                <h1 className="text-xl font-semibold text-stone-700 dark:text-white">
                  {job.headline}
                </h1>
                <div className="self-start px-1 py-2 ">
                  <p className="font-semibold">{job.employer.name}</p>
                </div>
                <div className="w-full flex items-center justify-center mx-auto px-2 mt-3 gap-1">
                  <div className="flex w-full items-center text-m underline ">
                    <FaChevronLeft
                      size={20}
                      className="fill-sky-800 dark:fill-indigo-400"
                    />
                    <a
                      className="ml-1 text-sm dark:text-indigo-400"
                      onClick={handleBack}
                    >
                      Tillbaka till resultaten
                    </a>
                  </div>
                  <Link
                    className="bg-sky-500 dark:bg-indigo-600 rounded-xl text-white whitespace-nowrap px-4 py-2 tex text-sm gap-1 flex justify-evenly items-center"
                    to={`/job/${job.id}/apply`}
                  >
                    Ansök nu <FaArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl mb-24 dark:text-white dark:bg-stone-900 m-5">
              {job.description.text_Formatted ? (
                <div className="px-6 py-10 rounded-2xl">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: job.description.text_Formatted,
                    }}
                  />
                  <Link
                    className="bg-sky-500 dark:bg-indigo-600 rounded-xl text-white py-1 mt-7 mx-5 flex gap-3 justify-center items-center"
                    to={`/job/${job.id}/apply`}
                  >
                    Ansök nu <FaArrowRight size={20} />
                  </Link>
                </div>
              ) : (
                <p>Något gick fel</p>
              )}
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

export default SavedJobsReadMore;
