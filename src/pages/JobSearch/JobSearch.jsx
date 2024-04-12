import { useState, useEffect } from "react";
import JobItem from "./JobItem";
import { useLocation } from "react-router-dom";

function JobSearch() {
  const { state } = useLocation();
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    if (state && state.jobsData) {
      setJobs(state.jobsData);
    }
  }, [state]);

  return (
    <ul>
      {jobs.map((job) => (
        <JobItem job={job} key={job.id} />
      ))}
    </ul>
  );
}

export default JobSearch;
