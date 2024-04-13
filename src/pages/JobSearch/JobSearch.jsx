import { useState, useEffect } from "react";
import JobItem from "./JobItem";
import { useLocation } from "react-router-dom";
import { getJobs } from "../../services/apiJobs";

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

  return (
    <main className="flex flex-col items-center">
      <div className="my-3 w-[90%] bg-stone-200 text-center text-lg py-4">
        <p className="font-semibold text-stone-600">
          <span className="font-extrabold text-stone-800">
            Sökresultat för:{" "}
          </span>
          <br />
          {searchWord}
        </p>
      </div>
      <div className="w-[90%] flex justify-between my-3">
        <p>Alla resultat</p>
        <div>Filter</div>
      </div>
      <ul className="w-full flex flex-col items-center gap-2">
        {jobs.map((job) => (
          <JobItem job={job} key={job.id} />
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
