import { Link, useLoaderData, useLocation } from "react-router-dom";
import { getOneJob } from "../../services/apiJobs";

function JobInfo() {
  const job = useLoaderData();

  return (
    <main>
      {job && (
        <>
          <h1>{job.headline}</h1>
          <p>{job.employer.name}</p>
          <Link to="/">Ansök nu</Link>
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
