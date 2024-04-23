import { useParams } from "react-router-dom";
import { getOneJob } from "../../services/apiJobs";
import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import Footer from "../../components/Footer";

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
              <span
                className={
                  page === 1
                    ? "h-4 w-4 bg-slate-600 rounded-full"
                    : "h-4 w-4 rounded-full  bg-slate-300"
                }
              ></span>
              <span
                className={
                  page === 2
                    ? "h-4 w-4 bg-slate-600 rounded-full"
                    : "h-4 w-4 rounded-full  bg-slate-300"
                }
              ></span>
              <span
                className={
                  page === 3
                    ? "h-4 w-4 bg-slate-600 rounded-full"
                    : "h-4 w-4 rounded-full bg-slate-300"
                }
              ></span>
            </div>
          </div>
        )}
      </div>
      {page === 1 && (
        <>
          <ul className="flex justify-center my-14">
            <li className="h-[300px] w-[90%] bg-stone-200 p-4 flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-2 w-[70%] items-center">
                  <h2 className="text-2xl font-semibold">{page}.</h2>
                  <p className="self-center text-sm ">Jobb du söker</p>
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
                <button
                  className="bg-stone-100 p-1 w-[70%]"
                  onClick={() => setPage(2)}
                >
                  Nästa &rarr;
                </button>
              </div>
            </li>
          </ul>
        </>
      )}
      {page === 2 && <ApplySideTwo job={job} page={page} setPage={setPage} />}
      {page === 3 && <ApplySideThree job={job} page={page} setPage={setPage} />}
      <Footer />
    </main>
  );
}

function ApplySideTwo({ job, page, setPage }) {
  return (
    <ul className="flex justify-center my-14">
      <div className=" w-[90%] bg-stone-200 p-4 flex flex-col ">
        <div>
          <div className="grid grid-cols-2 w-[70%] items-center">
            <h2 className="text-2xl font-semibold">{page}.</h2>
            <div className="flex justify-center">
              <p className="text-sm ">Vad ska vara med i brevet?</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex gap-3 my-10">
            <div className="w-[100px] bg-slate-300 h-5">
              <span className=" w-[20px] h-5 bg-slate-600"></span>
            </div>
            <p>Praktik</p>
          </div>
        </div>
        <div>
          <p>Arbetstitle</p>
          <p className="text-xl font-semibold">{job.headline}</p>
        </div>
        <form className="max-w-sm my-4">
          <label className="flex flex-col text-xl mb-4">
            <span>Namn</span>
            <input
              className="p-1"
              type="text"
              placeholder="Namn Efternamnsson"
            />
          </label>
          <label className="flex flex-col text-xl my-4">
            <span>Intressen</span>
            <input className="p-1 mt-1" type="text" placeholder="..." />
          </label>
          <label className="flex flex-col text-xl my-4">
            <span>Intressen</span>
            <input className="p-1 mt-1" type="file" placeholder="CV-namn.pdf" />
          </label>
          <label className="flex flex-col text-xl my-4">
            <span>Beskrivande ord (t.ex. snabblärd, per)</span>
            <input className="p-1 mt-1" type="text" placeholder="CV-namn.pdf" />
          </label>
        </form>
        <div className="flex justify-between">
          <button onClick={() => setPage(1)}>Tillbaka</button>
          <button
            className="bg-stone-100 text-xl p-1 rounded-full"
            onClick={() => setPage(3)}
          >
            &rarr;
          </button>
        </div>
      </div>
    </ul>
  );
}

function ApplySideThree({ job, page, setPage }) {
  return (
    <ul className="flex justify-center my-14">
      <li className="h-[300px] w-[90%] bg-stone-200 p-4 flex flex-col justify-between">
        <div>
          <div className="grid grid-cols-2 w-[70%] items-center">
            <h2 className="text-2xl font-semibold">{page}.</h2>
            <div className="flex justify-center">
              <p className="text-sm ">Kontrollera brevet</p>
            </div>
          </div>
        </div>
        <div>
          <p>Ansökan för</p>
          <h3 className="font-semibold text-xl text-stone-900">
            {job.headline}
          </h3>

          <p className="text-lg">{job.employer.name}</p>
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
        <div>
          {" "}
          <button onClick={() => setPage(2)}>Avbryt</button>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-stone-100 p-1 w-[90%]"
            onClick={() => setPage(2)}
          >
            Skicka ansökan &rarr;
          </button>
        </div>
      </li>
    </ul>
  );
}

export default ApplyNow;
