import { Link, useLoaderData } from "react-router-dom";
import { getOneJob } from "../../services/apiJobs";
import { useEffect, useState } from "react";
import HeaderSearchJob from "../../components/Header/HeaderSearchJob";

import {
  sendLikeData,
  getLikeData,
  deleteLikeData,
} from "../../utils/jsonserver";

function JobInfo() {
  const job = useLoaderData();
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikedJobs = async () => {
      const likedJobs = await getLikeData();
      const liked = likedJobs.some((likedJob) => likedJob.id === job.id);
      setIsLiked(liked);
    };
    fetchLikedJobs();
  }, [job]);

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

  const handleBack = () => {
    window.history.back();
  };

  useEffect(
    function () {
      if (!job) return;
      document.title = `${job.headline} `;
      return function () {
        document.title = "Emplojd";
      };
    },
    [job]
  );

  const handleLike = () => {
    setIsLiked((like) => !like);
    if (!isLiked) {
      sendLikeData(
        job.id,
        job.headline,
        job.employer.name,
        job.occupation.label,
        job.logo_url
      );
    } else if (isLiked) {
      deleteLikeData(job.id);
    }
  };

  return (
    <>
      <HeaderSearchJob>
        <img src="/LogoEmplojd.png" alt="" className="w-[45px]" />
      </HeaderSearchJob>

      <main className="m-2 max-w-7xl mx-auto">
        {job && (
          <>
            <div className="bg-white pb-4 pt-1 mt-8 px-1 rounded-[10px]">
              <div className="flex w-full justify-between items-center">
                <a onClick={handleBack}>Tillbaka till resultaten</a>
                <img
                  src={isLiked ? "/liked-heart.svg" : "/like-heart.svg"}
                  alt="gilla knapp"
                  onClick={handleLike}
                />
              </div>
              <div className="w-full flex flex-col  text-center justify-center ">
                <h1 className="text-2xl font-semibold text-stone-700">
                  {job.headline}
                </h1>
                <div className="w-full flex items-center justify-center mx-auto">
                  <Link
                    className="mt-3 w-full bg-customBlue rounded-[4px] text-white py-2 text-lg gap-1 max-w-lg"
                    to={`/job/${job.id}/apply`}
                  >
                    Ansök nu <span className="text-xl"> &rarr;</span>
                  </Link>
                </div>
              </div>
            </div>
            {job.logo_url && (
              <div className="w-full flex items-center justify-center py-2 ">
                <img
                  src={job.logo_url}
                  alt="logo"
                  className="h-[100px] max-w-[200px]"
                />
              </div>
            )}
            {isHTML(job.description.text_formatted) ? (
              <div
                className=" p-3 max-w-4xl mx-auto"
                dangerouslySetInnerHTML={{
                  __html: job.description.text_formatted,
                }}
              />
            ) : (
              <p
                className=" p-3 max-w-4xl mx-auto"
                style={{ whiteSpace: "pre-line" }}
                dangerouslySetInnerHTML={{
                  __html: makeLinksClickable(job.description.text_formatted),
                }}
              />
            )}
            <div className="w-full my-3 text-center ">
              <div className="w-[95%] flex items-center justify-center mx-auto">
                <Link
                  className="mt-3 w-full bg-customBlue rounded-[4px] text-white py-2 text-lg gap-1"
                  to={`/job/${job.id}/apply`}
                >
                  Ansök nu <span className="text-xl"> &rarr;</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </main>
    </>
  );
}

export async function loader({ params }) {
  const job = getOneJob(params.jobId);
  return job;
}

export default JobInfo;
