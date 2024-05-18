import { Link, useLoaderData, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import HeaderOtherPages from "../../components/Header/HeaderOtherPages";

import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";
import { FaChevronLeft } from "react-icons/fa";
import { FaArrowRight } from "react-icons/fa6";

import {
  sendLikeData,
  getLikeData,
  getOneLikeData,
  deleteLikeData,
} from "../../utils/jsonserver";
import Footer from "../../components/Footer";

function SavedJobsReadMore() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchJobData = async () => {
      const jobData = await getOneLikeData(jobId);
      setJob(jobData);
      console.log(jobData);
      console.log(job);
    };
    fetchJobData();
  }, [jobId]);

  useEffect(() => {
    const fetchLikedJobs = async () => {
      const likedJobs = await getLikeData();
      const liked = likedJobs.some((likedJob) => likedJob.id === jobId);
      setIsLiked(liked);
    };
    fetchLikedJobs();
  }, [jobId]);

  const handleBack = () => {
    window.history.back();
  };
  const isHTML = (str) => {
    const doc = new DOMParser().parseFromString(str, "text/html");
    return Array.from(doc.body.childNodes).some((node) => node.nodeType === 1);
  };

  const makeLinksClickable = (text) => {
    return text.replace(
      /((https?|ftp):\/\/[^\s/$.?#].[^\s]*)/g,
      ' <a class="regular-url" href="$1" target="_blank">$1</a>'
    );
  };

  useEffect(() => {
    if (!job) return;
    document.title = `${job.headline} `;
    return function () {
      document.title = "Emplojd";
    };
  }, [job]);

  return (
    <>
      <HeaderOtherPages>
        <img src="/LogoEmplojd.png" className="w-[45px]" />
      </HeaderOtherPages>

      <main className=" max-w-7xl mx-auto px-2">
        {job && (
          <>
            <div className="bg-white  py-3 mt-8 px-1 rounded-[10px]">
              <div className="w-full flex flex-col  text-center justify-center ">
                <h1 className="text-2xl font-semibold text-stone-700">
                  {job.headline}
                </h1>
                <div className="self-start px-2 py-2 ">
                  <p className=" text-left">till</p>
                  <p className="font-semibold">{job.employer}</p>
                </div>
                <div className="w-full flex items-center justify-center mx-auto px-2 mt-3 gap-1">
                  <div className="flex w-full  items-center text-m underline text-sky-800">
                    <FaChevronLeft size={20} />
                    <a className="ml-1" onClick={handleBack}>
                      Tillbaka till resultaten
                    </a>
                  </div>{" "}
                  <Link
                    className=" w-[80%] bg-sky-500 rounded-[8px] text-white py-1  gap-1 max-w-lg flex justify-evenly items-center"
                    to={`/job/${job.id}/apply`}
                  >
                    Ansök nu <FaArrowRight size={20} />
                  </Link>
                </div>
              </div>
            </div>
            {job.logo_url && (
              <div className="w-full flex items-center justify-center py-2 m-3 bg-white ">
                <img
                  src={job.logo_url}
                  alt="logo"
                  className="h-[100px] max-w-[200px]"
                />
              </div>
            )}
            {isHTML(job.text_formatted) ? (
              <div
                className=" p-2 max-w-4xl mx-auto mt-3 pb-28 bg-white"
                dangerouslySetInnerHTML={{
                  __html: job.text_formatted,
                }}
              />
            ) : (
              <p
                className=" p-2 max-w-4xl mx-auto my-3"
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{
                  __html: makeLinksClickable(job.description.text_formatted),
                }}
              />
            )}
          </>
        )}
      </main>
      <Footer />
    </>
  );
}

export default SavedJobsReadMore;
