import { Link, useLoaderData } from "react-router-dom";
import { getOneJob } from "../../services/apiJobs";
import { useEffect } from "react";
import Header from "../../components/Header";

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
        document.title = "Emplojd";
      };
    },
    [job]
  );

  return (
    <main className="m-2">
      <Header />
      <div className="my-4 flex w-full justify-between items-center">
        <a onClick={handleBack}>Tillbaka till resultaten</a>
        <img src="/like-heart.svg" alt="" />
      </div>
      {job && (
        <>
          <div className="w-full flex flex-col my-6 text-center justify-center ">
            <h1 className="text-2xl font-semibold text-stone-700">
              {job.headline}
            </h1>
            <div className="w-[95%] flex items-center justify-center mx-auto">
              <Link
                className="mt-3 w-full bg-customBlue rounded-[4px] text-white py-2 text-lg gap-1"
                to={`/job/${job.id}/apply`}
              >
                Ansök nu <span className="text-xl"> &rarr;</span>
              </Link>
            </div>
          </div>
          {isHTML(job.description.text_formatted) ? (
            <div
              className="bg-stone-200 p-3"
              dangerouslySetInnerHTML={{
                __html: job.description.text_formatted,
              }}
            />
          ) : (
            <p
              className="bg-stone-200 p-3"
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
  );
}

export async function loader({ params }) {
  const job = getOneJob(params.jobId);
  return job;
}

export default JobInfo;
