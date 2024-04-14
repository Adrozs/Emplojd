import { Link, useLoaderData } from "react-router-dom";
import { getOneJob } from "../../services/apiJobs";
import { useEffect } from "react";

function JobInfo() {
  const job = useLoaderData();

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
        document.title = "Jobify";
      };
    },
    [job]
  );

  return (
    <main className="m-2">
      <div className="my-4 flex w-full justify-between items-center">
        <a onClick={handleBack}>Tillbaka till resultaten</a>
        <img src="/like-heart.svg" alt="" />
      </div>
      {job && (
        <>
          <div className="w-full flex flex-col my-6 text-center ">
            <h1 className="text-2xl">{job.headline}</h1>
            <p>{job.employer.name}</p>
            <Link
              className="mt-2 w-full bg-stone-200 border-gray-100 h-8 flex items-center justify-center text-lg gap-1"
              to="/"
            >
              Ansök nu <span className="text-xl"> &rarr;</span>
            </Link>
          </div>
          {isHTML(job.description.text_formatted) ? (
            <div
              dangerouslySetInnerHTML={{
                __html: job.description.text_formatted,
              }}
            />
          ) : (
            <p
              style={{ whiteSpace: "pre-line" }}
              dangerouslySetInnerHTML={{
                __html: makeLinksClickable(job.description.text_formatted),
              }}
            />
          )}
        </>
      )}
    </main>
  );
}

export async function loader({ params }) {
  const job = getOneJob(params.jobId);
  return job;
}

export default JobInfo;
