// JobItem.jsx
import { useEffect, useState } from "react";
import { sendLikeData } from "../../utils/jsonserver";

function JobItem({ job, children }) {
  const [daySincePosted, setDaySincePosted] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const todaysDate = new Date();
    const jobPosted = new Date(job.date);
    const differenceInTime = todaysDate.getTime() - jobPosted.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    setDaySincePosted(differenceInDays);
  }, [job]);

  function handleLike() {
    setIsLiked((like) => !like);
    if (!isLiked) {
      sendLikeData(job.id, job.headline);
    }
  }

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
        <h3 className="font-semibold text-xl text-stone-900">{job.title}</h3>
        <p className="text-lg">{job.company_name}</p>
        <div>
          <p className="text-sm my-2">
            {job.date} - {daySincePosted} dagar sen
          </p>
        </div>
      </div>
      {children}
    </li>
  );
}

export default JobItem;
