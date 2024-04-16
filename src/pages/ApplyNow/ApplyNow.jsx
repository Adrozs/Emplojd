import { useParams } from "react-router-dom";
import { getOneJob } from "../../services/apiJobs";
import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";

function ApplyNow() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [daysUntilDeadline, setDaysUntilDeadline] = useState(null);
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
      const today = new Date();
      const deadline = new Date(job.application_deadline);
      const differenceInTime = deadline.getTime() - today.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setDaysUntilDeadline(differenceInDays);
    }
  }, [job]);

  const handleBack = () => {
    window.history.back();
  };

  if (!job) {
    return <Loader />;
  }

  return (
    <main className="m-2">
      <div className="my-4">
        {job && (
          <div className="mt-4 text-center font-semibold">
            <h2 className="text-2xl">Generera ditt personliga brev</h2>
            <div className=" m-4 flex items-center justify-center gap-4">
              <span className="h-4 w-4 bg-slate-600 rounded-full"></span>
              <span className="h-4 w-4 bg-slate-300 rounded-full"></span>
              <span className="h-4 w-4 bg-slate-300 rounded-full"></span>
            </div>
            <h2 className="mt-4 text-2xl font-semibold">{page}.</h2>
          </div>
        )}
      </div>
      <ul className="flex justify-center">
        <li className="h-[260px] w-[90%] bg-stone-200 p-4 flex flex-col justify-between">
          <div>
            <div className=" flex items-center justify-center p-1 w-[100%]]">
              <p>Jobb du söker</p>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-xl text-stone-900">
              {job.headline}
            </h3>
            <p className="text-lg">{job.employer.name}</p>
            <div>
              <p className="text-sm my-2">
                {job.workplace_address.municipality} -{" "}
                {daysUntilDeadline > 0
                  ? daysUntilDeadline === 1
                    ? "1 dag kvar till sista ansökningsdagen"
                    : `${daysUntilDeadline} dagar kvar till sista ansökningsdagen`
                  : "Sista ansökningsdagen har passerat"}
              </p>
            </div>
          </div>
          <div className="flex gap-2 text-[12px]">
            {job.working_hours_type.label ? (
              <span className="bg-stone-100 px-2 py-1">
                {job.working_hours_type.label}
              </span>
            ) : (
              <span className="bg-stone-100 px-2 py-1">
                {job.employment_type.label}{" "}
              </span>
            )}

            <span className="bg-stone-100 px-2 py-1">
              {job.occupation.label}{" "}
            </span>
          </div>
          <div className="flex justify-between">
            <button onClick={handleBack}>Avbryt</button>
            <button className="bg-stone-100 p-1">Nästa</button>
          </div>
        </li>
      </ul>
    </main>
  );
}

export default ApplyNow;
