import { useState, useEffect } from "react";
import JobItem from "./JobItem";
import { Link, useLocation } from "react-router-dom";
import { getJobs } from "../../services/apiJobs";
//icons
import { HiAdjustmentsHorizontal } from "react-icons/hi2";

function JobSearch() {
  const { state } = useLocation();
  const [jobs, setJobs] = useState([]);
  const { query } = state || {};
  const [searchWord, setSearchWord] = useState("");

  useEffect(() => {
    if (state && state.jobsData) {
      setJobs(state.jobsData);
    }
  }, [state]);

  useEffect(() => {
    if (query) {
      if (query.city && query.job) {
        setSearchWord(`${query.job} + ${query.city}`);
      } else if (query.city) {
        setSearchWord(query.city);
      } else if (query.job) {
        setSearchWord(query.job);
      }
    }
  }, [query]);

  //uppdaterar title för sidan
  useEffect(
    function () {
      if (!searchWord) return;
      document.title = `Jobify - ${searchWord} `;

      return function () {
        document.title = "Jobify";
      };
    },
    [searchWord]
  );

  return (
    <main className="flex flex-col items-center">
      <div className="mt-3 w-[90%] bg-stone-200 text-center text-2xl py-4">
        <p className="font-semibold text-stone-500">
          <span className="font-semibold text-stone-800">Sökresultat för</span>
          <br />
          {searchWord}
        </p>
      </div>
      <div className="w-[90%] flex justify-between my-3">
        <p>Alla resultat</p>
        <div className="bg-white  px-2 flex items-center gap-1 justify-center cursor-pointer">
          <HiAdjustmentsHorizontal />
          <span className="text-[15px]">Filter</span>
        </div>
      </div>
      <ul className="w-full flex flex-col items-center gap-5">
        {jobs.map((job) => (
          <JobItem job={job} key={job.id}>
            <Link
              className="items-center justify-center flex  mt-2 w-full py-1 bg-white h-7"
              to={{
                pathname: `/job/${job.id}`,
                state: { jobId: job.id },
              }}
            >
              Läs mer <span className="text-lg"> &rarr;</span>
            </Link>
          </JobItem>
        ))}
      </ul>
    </main>
  );
}

export async function loader(url) {
  const fetchJob = getJobs(url);
  return fetchJob;
}

export default JobSearch;
