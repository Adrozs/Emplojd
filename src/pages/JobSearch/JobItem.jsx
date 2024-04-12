import { useEffect, useState } from "react";

import { Link } from "react-router-dom";
function JobItem({ job }) {
  const [daySincePosted, setDaySincePosted] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  function handleLike() {
    setIsLiked((like) => !like);
  }

  useEffect(() => {
    const todaysDate = new Date();
    const jobPosted = new Date(job.publication_date);
    const differenceInTime = todaysDate.getTime() - jobPosted.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    setDaySincePosted(differenceInDays);
  }, [job]);

  return (
    <li className="h-[250px] w-[90%] bg-stone-200 p-2 flex flex-col justify-between">
      <div className="flex justify-between">
        <img
          src={job.logo_url ? job.logo_url : "exempelbild1.png"}
          alt="bild"
          className="object-contain h-[55px] "
        />
        <img
          src={isLiked ? "liked-heart.svg" : "/like-heart.svg"}
          alt="bild"
          onClick={handleLike}
        />
      </div>
      <div>
        <h3 className="font-bold text-lg">{job.headline}</h3>
        <p>{job.employer.name}</p>
        <div>
          <p>
            {job.workplace_address.municipality} - {daySincePosted} dagar sen
          </p>
        </div>
      </div>
      <div className="flex gap-3 mt-2">
        <span className="border-black border-2 px-2">
          {job.working_hours_type.label}{" "}
        </span>
        <span className="border-black border-2 px-2">
          {job.employment_type.label}{" "}
        </span>
        <span className="border-black border-2 px-2">
          {job.occupation.label}{" "}
        </span>
      </div>

      <Link
        className="mt-2 w-full bg-white  h-7 text-center"
        to={{
          pathname: `/job/${job.id}`,
          state: { jobId: job.id },
        }}
      >
        Läs mer
      </Link>
    </li>
  );
}

export default JobItem;
