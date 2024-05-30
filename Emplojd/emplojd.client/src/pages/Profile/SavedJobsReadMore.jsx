import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import { FaChevronLeft, FaArrowRight } from "react-icons/fa";
import Footer from "../../components/Footer";

function SavedJobsReadMore() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  const fetchJobData = async (id) => {
    try {
      const token = localStorage.getItem("authToken");

      // Formatera URL med adId som en parameter
      const url = `https://localhost:54686/ad/${id}?adId=${id}`;
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
      <HeaderOtherPages>
        <img src="/LogoEmplojd.png" className="w-[45px]" />
      </HeaderOtherPages>
      <main className="max-w-7xl mx-auto px-2">
        {job && (
          <>
            <div className="bg-white py-3 mt-8 px-1 rounded-[10px]">
              <div className="w-full flex flex-col text-center justify-center ">
                <h1 className="text-xl font-semibold text-stone-700">
                  {job.headline}
                </h1>
                <div className="self-start px-2 py-2 ">
                  <p className="text-left">till</p>
                  <p className="font-semibold">{job.employer.name}</p>
                </div>
                <div className="w-full flex items-center justify-center mx-auto px-2 mt-3 gap-1">
                  <div className="flex w-full items-center text-m underline text-sky-800">
                    <FaChevronLeft size={20} />
                    <a className="ml-1" onClick={handleBack}>
                      Tillbaka till resultaten
                    </a>
                  </div>
                  <Link
                    className="w-[80%] bg-sky-500 rounded-[8px] text-white py-1 gap-1 max-w-lg flex justify-evenly items-center"
                    to={`/job/${job.id}/apply`}
                  >
                    Ansök nu <FaArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
            {job.logo_Url && (
              <div className="w-full flex items-center justify-center py-2 m-3 bg-white">
                <img
                  src={job.logo_Url}
                  alt="logo"
                  className="h-[100px] max-w-[200px]"
                />
              </div>
            )}
            {job.description.text ? (
              <div className="p-4 max-w-4xl mx-auto mt-3 pb-28 bg-white">
                <div
                  dangerouslySetInnerHTML={{
                    __html: job.description.text,
                  }}
                />
                <Link
                  className="w-[100%] bg-sky-500 rounded-[8px] text-white py-1 gap-1 max-w-lg flex justify-center items-center mt-4"
                  to={`/job/${job.id}/apply`}
                >
                  Ansök nu <FaArrowRight size={20} />
                </Link>
              </div>
            ) : (
              <p>Något gick fel</p>
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedJobsReadMore;
