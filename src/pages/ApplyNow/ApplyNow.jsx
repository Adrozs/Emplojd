import { useParams } from "react-router-dom";
import { getOneJob } from "../../services/apiJobs";
import { useEffect, useState } from "react";
import Loader from "../../ui/Loader";
import Footer from "../../components/Footer";
import Switch from "../../components/Switch";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";

function ApplyNow() {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [daySincePosted, setDaySincePosted] = useState(null);
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
      const todaysDate = new Date();
      const jobPosted = new Date(job.publication_date);
      const differenceInTime = todaysDate.getTime() - jobPosted.getTime();
      const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
      setDaySincePosted(differenceInDays);
    }
  }, [job]);

  const handleBack = () => {
    window.history.back();
  };

  if (!job) {
    return (
      <>
        <HeaderOtherPages />
        <Loader />
      </>
    );
  }

  return (
    <main className="mb-2">
      <HeaderOtherPages />
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
          <ul className="flex justify-center my-14  max-w-lg mx-auto">
            <li className="h-[300px] w-[90%] bg-white p-4 flex flex-col justify-between">
              <div>
                <div className="grid grid-cols-2 w-[70%] items-center">
                  <h2 className="text-2xl font-semibold">{page}.</h2>
                  <div className="flex justify-center">
                    <p className="text-sm ">Jobb du söker</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-xl text-stone-900">
                  {job.headline}
                </h3>

                <p className="text-lg">{job.employer.name}</p>
                <div>
                  <p className="text-sm my-2">
                    {job.workplace_address.municipality} - {daySincePosted}{" "}
                    dagar sen
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
                  className="bg-customBlue rounded-[4px] text-white p-1 w-[70%]"
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
    <ul className="flex justify-center my-14  max-w-lg mx-auto">
      <div className=" w-[90%] bg-white p-4 flex flex-col text-stone-800 ">
        <div>
          <div className="grid grid-cols-2 w-[70%] items-center">
            <h2 className="text-2xl font-semibold">{page}.</h2>
            <div className="flex justify-center">
              <p className="text-sm ">Fyll i ansökan</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center text-center">
          <div className="flex gap-3 my-10">
            <p>Jobb</p>
            <Switch />
            <p>Praktik</p>
          </div>
        </div>
        <div>
          <p>Arbetstitle</p>
          <p className="text-l font-semibold">{job.headline}</p>
        </div>
        <form className="max-w-sm my-4">
          <label className="flex flex-col text-l mb-4">
            <span>Namn</span>
            <input
              className="p-1 bg-stone-100"
              type="text"
              placeholder="Namn Efternamnsson"
            />
          </label>
          <label className="flex flex-col text-l my-4">
            <span>Intressen</span>
            <input
              className="p-1 mt-1 bg-stone-100"
              type="text"
              placeholder="..."
            />
          </label>
          <label className="flex flex-col text-l my-4">
            <span>Ditt cv</span>
            <input
              className="p-1 mt-1 bg-stone-100 w-full"
              type="file"
              placeholder="CV-namn.pdf"
            />
          </label>
          <label className="flex flex-col text-l my-4">
            <span>Beskrivande ord (t.ex. snabblärd, per)</span>
            <input
              className="p-1 mt-1 bg-stone-100 "
              type="text"
              placeholder="..."
            />
          </label>
          <label className='text-l"'>
            <span>Hur självständig ska AI:n vara?</span>
            <input
              type="range"
              className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
              value="10"
            />
            <div className="flex justify-between">
              <span>Lite självständig</span>
              <span>Mycket självständig</span>
            </div>
          </label>
        </form>
        <div className="flex justify-between mt-4">
          <button onClick={() => setPage(1)}>Avbryt</button>
          <button
            className="bg-customBlue rounded-[4px] text-white p-1 w-[70%]"
            onClick={() => setPage(3)}
          >
            Nästa &rarr;
          </button>
        </div>
      </div>
    </ul>
  );
}

function ApplySideThree({ job, page, setPage }) {
  return (
    <div className="flex flex-col items-center justify-center my-14  max-w-lg mx-auto">
      <div className="h-[340px] w-[90%] bg-white p-4 flex flex-col justify-between">
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
          <div className="flex justify-between">
            <button className="underline text-sm" onClick={() => setPage(2)}>
              &larr; Tillbaka till innehållet
            </button>
            <button className="underline text-sm">Ladda ner brev</button>
          </div>
        </div>
        <div className="flex justify-between">
          <button className="w-[40%] bg-stone-100 p-1">Redigera brev</button>
          <button className="w-[40%] bg-stone-100 p-1">Generera brev</button>
        </div>
        <div className="flex justify-center">
          <button
            className="bg-customBlue rounded-[4px] text-white p-1 w-[90%]"
            onClick={() => setPage(2)}
          >
            Skicka ansökan &rarr;
          </button>
        </div>
      </div>
      <aside className="my-6 w-[90%] bg-white p-4">
        <div className="p-4">
          <h3>Hej ChasGPT</h3>
          <br />
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
            Exercitationem quisquam ea eos reprehenderit soluta obcaecati eum
            voluptate eaque nam assumenda corrupti, ducimus error tempore ipsa
            nulla sunt temporibus impedit, blanditiis illo voluptatum ad
            consequuntur, debitis harum eius. Harum, eveniet eos? Lorem ipsum
            dolor sit amet consectetur adipisicing elit. Nam voluptas temporibus
            at placeat quasi tempora nobis pariatur praesentium rerum odio?
            Molestiae maxime voluptates obcaecati, beatae assumenda suscipit
            nobis, tempore nostrum quaerat nisi ab ea, veniam quos! Beatae
            totam, ut eligendi rem quibusdam aspernatur necessitatibus quos
            fugiat vel quidem eveniet dolor tenetur? Maxime sequi illo tempora,
            odit reprehenderit enim ipsam vel sit. Error corporis magnam iure
            ullam pariatur, quis ab tempora! Asperiores ratione molestiae,
            minima aspernatur repellendus similique. Culpa praesentium deleniti
            autem similique cupiditate fugiat, porro quidem placeat accusantium
            adipisci ea reprehenderit facilis neque voluptatem saepe illo, quos
            possimus est molestiae hic pariatur dolorem debitis molestias! Quo
            officiis fuga eum id suscipit ipsa ratione dolores fugiat possimus
            non aperiam, molestiae rerum explicabo maxime aliquid deleniti et
            amet ut fugit at qui? Corporis veritatis officia voluptatibus illum
            quisquam ut corrupti optio quod reprehenderit vitae illo neque,
            necessitatibus id deserunt consequuntur dolor consectetur nostrum
            recusandae temporibus tempora suscipit? Eveniet unde explicabo,
            dignissimos, cupiditate repellendus ratione mollitia dolorum sequi,
            aspernatur voluptatem vitae ipsum totam illo. Est iste ipsum
            officiis repudiandae tempore animi. Ut ab necessitatibus quia,
            numquam autem dolorum voluptatum ratione. Magni saepe sapiente
            dolorem incidunt quas, corrupti unde dolorum culpa sequi neque
            consequatur fugiat error, aspernatur id deleniti eveniet ipsam
            laudantium porro!
          </p>
        </div>
      </aside>
    </div>
  );
}

export default ApplyNow;
