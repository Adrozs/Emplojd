import { Link, useLoaderData } from "react-router-dom";
import { getOneJob } from "../../services/apiJobs";

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

  return (
    <main className="m-2">
      <div className="my-4 flex w-full justify-between items-center">
        <Link>Tillbaka till resultaten</Link>
        <img src="/like-heart.svg" alt="" />
      </div>
      {job && (
        <>
          <div className="w-full flex flex-col my-6 text-center ">
            <h1 className="text-2xl">{job.headline}</h1>
            <p>{job.employer.name}</p>
            <Link
              className="mt-2 w-full text-center bg-stone-200 border-gray-100 h-8"
              to="/"
            >
              Ansök nu
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
