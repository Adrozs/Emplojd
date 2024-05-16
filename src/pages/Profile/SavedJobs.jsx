import { Link } from "react-router-dom";
import { MdWork } from "react-icons/md";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import { getLikeData } from "../../utils/jsonserver";
import { useState, useEffect } from "react";
import { FaHeart } from "react-icons/fa6";

function SavedJobs() {
  const [likes, setLikes] = useState([]);
  const [daySincePosted, setDaySincePosted] = useState(null);

  useEffect(() => {
    getLikeData().then((data) => {
      setLikes(data);
      const todaysDate = new Date();
      const updatedLikes = data.map((job) => {
        const jobPosted = new Date(job.publication_date);
        const differenceInTime = todaysDate.getTime() - jobPosted.getTime();
        const differenceInDays = Math.ceil(
          differenceInTime / (1000 * 3600 * 24)
        );
        setDaySincePosted(differenceInDays);
        return { ...job, daysSincePosted: differenceInDays };
      });
      setLikes(updatedLikes);
    });
  }, []);

  return (
    <>
      <HeaderOtherPages />
      <div className="bg-gradient-to-tl from-purple-400 to-sky-500 p-4 flex justify-between items-center my-7 text-center w-[90%] mx-auto rounded-[10px]">
        <h6 className=" text-[20px] ml-2 text-white">Sparade jobb</h6>
        <FaHeart size={22} className="text-white mr-2" />
      </div>

      <div className=" mt-4 ">
        <div className="bg-sky-100 p-4 w-[90%] mx-auto rounded-[10px]">
          <p className=" text-sm ml-2 text-black">
            Här har du åtkomst till alla jobbannonser du har valt att spara.
          </p>
        </div>
        <ul className="flex flex-col items-center justify-center my-10  max-w-lg mx-auto">
          {likes === 0 ? (
            <div className="border-gray-400 border-dashed border-2 h-[230px] w-[90%]  p-4 flex justify-between rounded-[20px] mb-4  items-center">
              <p className="text-xl"> Dina framtida sparade jobb hamnar här.</p>
            </div>
          ) : (
            likes.map((data) => {
              return (
                <li className="h-[230px] w-[90%] bg-white p-4 flex flex-col justify-between  rounded-[20px] mb-4 ">
                  <div className="flex justify-end">
                    <FaHeart size={22} className="text-customBlue mr-2" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-xl text-stone-900">
                      {data.headline}
                    </h3>

                    <p className="text-lg">{data.employer.name}</p>
                    <div>
                      <p className="text-sm my-2"></p>
                    </div>
                  </div>
                  <div>
                    <p className="text-sm my-2">
                      {data.workplace_address} - {daySincePosted} dagar sen
                    </p>
                  </div>
                  <div className="flex gap-2 text-[12px]">
                    <span className="bg-[#CFEBD4] px-2 py-1 rounded-[2px]">
                      {data.working_hours_type}
                    </span>

                    <span className="bg-purple-300 px-2 py-1">
                      {data.employment_type}
                    </span>

                    <span className="bg-[#C3E7F3] px-2 py-1 rounded-[2px]">
                      {data.occupation} text
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <button className="bg-customBlue rounded-[12px] text-white py-2 w-[100%]">
                      Läs mer &rarr;
                    </button>
                  </div>
                </li>
              );
            })
          )}
        </ul>
        <div className="flex mb-10"></div>
      </div>
    </>
  );
}

export default SavedJobs;
