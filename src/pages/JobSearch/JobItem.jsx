import { useEffect, useState } from "react";
import {
  sendLikeData,
  getLikeData,
  deleteLikeData,
} from "../../utils/jsonserver";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa6";

function JobItem({ job, children }) {
  const [daySincePosted, setDaySincePosted] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikedJobs = async () => {
      const likedJobs = await getLikeData();
      const liked = likedJobs.some((likedJob) => likedJob.id === job.id);
      setIsLiked(liked);
    };
    fetchLikedJobs();
  }, [job, getLikeData]);

  useEffect(() => {
    const todaysDate = new Date();
    const jobPosted = new Date(job.publication_date);
    const differenceInTime = todaysDate.getTime() - jobPosted.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    setDaySincePosted(differenceInDays);
  }, [job]);

  function handleLike() {
    setIsLiked((like) => !like);
    if (!isLiked) {
      sendLikeData(
        job.id,
        job.headline,
        job.employer.name,
        job.occupation.label,
        job.logo_url,
        job.employment_type.label,
        job.working_hours_type.label,
        job.workplace_address.municipality,
        job.publication_date,
        job.description.text_formatted
      );
    } else if (isLiked) {
      deleteLikeData(job.id);
    }
  }

  return (
    <li className="h-[300px] w-[90%] bg-white p-4 flex flex-col justify-between rounded-[10px]">
      <div className="flex justify-between">
        <div className="bg-stone-100 flex items-center rounded-full p-1 h-[55px]">
          <img
            src={job.logo_url ? job.logo_url : "exempelbild1.png"}
            alt="bild"
            className="object-contain w-[50px] h-[50px] p-1 rounded-full"
          />
        </div>
        <div onClick={handleLike}>
          {isLiked ? (
            <FaHeart className="text-customBlue" size={24} />
          ) : (
            <FaRegHeart className="text-customBlue" size={24} />
          )}
        </div>
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
          <span className="bg-[#CFEBD4] rounded-[2px] px-2 py-1">
            {job.working_hours_type.label}
          </span>
        ) : (
          <span className="bg-purple-300 rounded-[2px] px-2 py-1">
            {job.employment_type.label}{" "}
          </span>
        )}

        <span className="bg-[#C3E7F3] rounded-[2px] px-2 py-1">
          {job.occupation.label}{" "}
        </span>
      </div>

      {children}
    </li>
  );
}

export default JobItem;
