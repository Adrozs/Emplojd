import { useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa6";
import {
  sendLikeDataBackend,
  getLikeDataBackend,
  deleteLikeDataBackend,
} from "../../utils/savedAds";

function JobItem({ job, children }) {
  const [daySincePosted, setDaySincePosted] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const fetchLikedJobs = async () => {
      try {
        const likedJobs = await getLikeDataBackend();
        const liked = likedJobs.map((likedJob) => likedJob.platsbankenId);
        if (liked.includes(parseInt(job.id))) {
          setIsLiked(true);
        } else {
          setIsLiked(false);
        }
      } catch (error) {
        console.error("Error fetching liked jobs:", error);
      }
    };
    fetchLikedJobs();
  }, [job]);

  useEffect(() => {
    const todaysDate = new Date();
    const jobPosted = new Date(job.publication_Date);
    const differenceInTime = todaysDate.getTime() - jobPosted.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    setDaySincePosted(differenceInDays);
  }, [job]);

  const handleLike = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    if (!isLiked) {
      try {
        await sendLikeDataBackend(
          job.id,
          job.headline,
          job.employer.name,
          job.description,
          job.employment_Type,
          job.working_Hours_Type,
          job.occupation,
          job.workplace_Address,
          job.publication_Date,
          job.logo_Url
        );
      } catch (error) {
        console.error("Failed to send like data:", error);
      }
    } else {
      try {
        await deleteLikeDataBackend(job.id);
      } catch (error) {
        console.error("Failed to delete like data:", error);
      }
    }
  };

  return (
    <li
      key={job.id}
      className="min-h-[230px] w-[90%] bg-white p-4 flex flex-col justify-between rounded-[20px] mb-4"
    >
      <div className="flex justify-between">
        <div className="flex items-center rounded-full p-1 "></div>
        <div onClick={handleLike}>
          {isLiked ? (
            <FaHeart className="text-blue-300" size={24} />
          ) : (
            <FaRegHeart className="text-blue-300" size={24} />
          )}
        </div>
      </div>
      <div>
        <h3 className="font-[700] text-[20px] text-stone-900">
          {job.headline}
        </h3>

        <p className="text-[16px] font-[600]">{job.employer.name}</p>
      </div>
      <div>
        <p className="text-sm my-2 py-2">
          {job.workplace_Address.municipality} - {daySincePosted} dagar sen
        </p>
      </div>
      <div className="flex gap-2 text-[12px]">
        {job.working_Hours_Type.label ? (
          <span className="bg-[#CFEBD4] px-2 py-1 rounded-[2px]">
            {job.working_Hours_Type.label}
          </span>
        ) : (
          <span className="bg-purple-300 px-2 py-1">
            {job.employment_Type.label}
          </span>
        )}

        <span className="bg-[#C3E7F3] px-2 py-1 rounded-[2px]">
          {job.occupation.label} text
        </span>
      </div>

      {children}
    </li>
  );
}

export default JobItem;
