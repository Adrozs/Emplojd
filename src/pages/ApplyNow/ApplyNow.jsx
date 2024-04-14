import { useParams } from "react-router-dom";
import { getOneJob } from "../../services/apiJobs";
import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";

function ApplyNow() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const jobData = await getOneJob(jobId);
        setJob(jobData);
        return jobData;
      } catch (error) {
        console.error("Error fetching job:", error.message);
      }
    }
    fetchData();
  }, [jobId]);

  const handleBack = () => {
    window.history.back();
  };

  if (!job) {
    return <Loader />;
  }

  return (
    <main className="m-2">
      <div className="my-4">
        <a onClick={handleBack}>Tillbaka till annonsen</a>
        {job && (
          <div className="mt-14 flex items-center justify-center flex-col">
            <span className="text-xl">{job.headline}</span>

            <br />
            {job.application_contacts[0] && (
              <span>
                Kontaktperson:{" "}
                {job.application_contacts[0].description
                  ? job.application_contacts[0].description
                  : job.application_details.url}
              </span>
            )}

            <span>
              Hemsida:
              <a
                target="_blank"
                href={job.application_details.url}
                className="underline"
              >
                Länk till annons
              </a>
              <br />
              {job.application_details.email
                ? job.application_details.email
                : ""}
            </span>
            <br />
            <span>
              Sista dag att ansöka: {job.application_deadline.slice(0, 10)}
            </span>
          </div>
        )}
      </div>
    </main>
  );
}

export default ApplyNow;
