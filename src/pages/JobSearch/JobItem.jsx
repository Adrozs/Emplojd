import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

function JobItem({ job, children }) {
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
    <li className="h-[260px] w-[90%] bg-white p-4 flex flex-col justify-between rounded-[10px]">
      <div className="flex justify-between">
        <div className="bg-stone-100 flex items-center rounded-full p-1 h-[55px]">
          <img
            src={job.logo_url ? job.logo_url : "exempelbild1.png"}
            alt="bild"
            className="object-contain w-[50px] h-[50px] p-1 rounded-full"
          />
        </div>
        <img
          src={isLiked ? "liked-heart.svg" : "/like-heart.svg"}
          alt="bild"
          onClick={handleLike}
        />
      </div>
      <div>
        <h3 className="font-semibold text-xl text-stone-900">{job.headline}</h3>
        <p className="text-lg">{job.employer.name}</p>
        <div>
          <p className="text-sm my-2">
            {job.workplace_address.municipality} - {daySincePosted} dagar sen
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

        <span className="bg-stone-100 px-2 py-1">{job.occupation.label} </span>
      </div>

      {children}
    </li>
  );
}

export default JobItem;
