import { useState, useEffect } from "react";
import JobItem from "./JobItem";
import { useLocation } from "react-router-dom";

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
        <p>
          <span className="font-semibold ">Sökresultat för: </span>
          <br />
          {searchWord}
        </p>
      </div>
      <ul>
        {jobs.map((job) => (
          <JobItem job={job} key={job.id} />
        ))}
      </ul>
    </main>
  );
}

export default JobSearch;
