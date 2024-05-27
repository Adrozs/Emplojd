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
        if (likedJobs && likedJobs.length > 0) {
          const platsbankenIds = likedJobs.map(
            (likedJob) => likedJob.platsbankenId
          );

          const liked = platsbankenIds.includes(job.id);
          setIsLiked(liked);
        }
      } catch (error) {
        console.error("Failed to fetch liked jobs:", error);
      }
    };
    fetchLikedJobs();
  }, [job, getLikeDataBackend]);

  useEffect(() => {
    const todaysDate = new Date();
    const jobPosted = new Date(job.publication_date);
    const differenceInTime = todaysDate.getTime() - jobPosted.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    setDaySincePosted(differenceInDays);
  }, [job]);

  const handleLike = async () => {
    setIsLiked((prevIsLiked) => !prevIsLiked);
    if (!isLiked) {
      try {
        await sendLikeDataBackend(job.id, job.headline, job.employer.name);
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
    <li className="h-[300px] w-[90%] bg-white p-4 flex flex-col justify-between rounded-[10px]">
      <div className="flex justify-between">
        <div className="bg-stone-100 flex items-center rounded-full p-1 h-[55px]">
          <img
            src={job.logo_Url ? job.logo_Url : "exempelbild1.png"}
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
          <p className="text-sm my-2">"STAD" - {daySincePosted} dagar sen</p>
        </div>
      </div>
      <div className="flex gap-2 text-[12px]">
        <span className="bg-purple-300 rounded-[2px] px-2 py-1">
          {job.working_Hours_Type.label}
        </span>

        <span className="bg-[#C3E7F3] rounded-[2px] px-2 py-1">
          {job.occupation.label}
        </span>
      </div>

      {children}
    </li>
  );
}

export default JobItem;
