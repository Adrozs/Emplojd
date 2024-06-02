import { Link } from "react-router-dom";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import { useState, useEffect } from "react";
import { FaHeart, FaArrowRight } from "react-icons/fa6";

import Footer from "../../components/Footer";
import {
  getLikeDataBackend,
  deleteLikeDataBackend,
} from "../../utils/savedAds";

function SavedJobs() {
  const [likes, setLikes] = useState([]);
  const [daySincePosted, setDaySincePosted] = useState(null);

  useEffect(() => {
    getLikeDataBackend().then((data) => {
      setLikes(data);
      const todaysDate = new Date();
      const updatedLikes = data.map((job) => {
        const jobPosted = new Date(job.publication_Date);
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

  const handleDislike = async (data) => {
    console.log("klick");
    await deleteLikeDataBackend(data.platsbankenId);

    const updatedLikes = likes.filter(
      (job) => job.platsbankenId !== data.platsbankenId
    );
    setLikes(updatedLikes);
  };

  return (
    <>
      <div className="dark:bg-slate-800">
        <HeaderOtherPages />
        <div className="bg-gradient-to-tl-purple-sky dark:bg-dark-gradient-to-140-purple-slate p-4 flex justify-between items-center my-7 text-center w-[90%] mx-auto rounded-[10px]">
          <h6 className=" text-[20px] ml-2 text-white">Sparade jobb</h6>
          <FaHeart size={22} className="text-white mr-2" />
        </div>
        <div className=" mt-4 ">
          <div className="bg-sky-100 p-4 w-[90%] mx-auto rounded-[10px] dark:bg-gray-900 ">
            <p className=" text-sm ml-2 text-black dark:text-white">
              Här har du åtkomst till alla jobbannonser du har valt att spara.
            </p>
          </div>
          <ul className="flex flex-col items-center justify-center my-10  max-w-lg mx-auto pb-12">
            {likes <= 0 ? (
              <>
                <div className="border-gray-400 border-dashed border-2 h-[230px] w-[90%]  p-4 flex justify-between rounded-[20px] mb-4  items-center dark:bg-slate-700">
                  <p className="text-xl dark:text-white">
                    {" "}
                    Dina framtida sparade jobb hamnar här.
                  </p>
                </div>
                <Link
                  to="/joblist"
                  className="items-center justify-center flex mt-2 w-[85%] py-2 h-14 bg-sky-600 rounded-[8px] text-white text-lg font-semibold dark:bg-sky-700 dark:hover:bg-sky-600"
                >
                  Hitta jobb
                </Link>
              </>
            ) : (
              likes.map((data) => {
                return (
                  <li
                    key={data.platsbankenId}
                    className="min-h-[230px] w-[90%] bg-white p-4 flex flex-col justify-between  rounded-[20px] mb-4 "
                  >
                    <div className="flex justify-end">
                      <FaHeart
                        size={22}
                        className="text-purple-400 mr-2"
                        onClick={() => handleDislike(data)}
                      />
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
                        {data.workplace_Address.municipality} - {daySincePosted}{" "}
                        dagar sen
                      </p>
                    </div>
                    <div className="flex gap-2 text-[12px]">
                      <span className="bg-[#CFEBD4] px-2 py-1 rounded-[2px]">
                        {data.working_Hours_Type.label}
                      </span>
                      {/*    <span className="bg-purple-300 px-2 py-1">
                        {data.employment_Type.label}
                      </span> */}
                      <span className="bg-[#C3E7F3] px-2 py-1 rounded-[2px]">
                        {data.occupation.label} text
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <Link
                        className="items-center justify-center flex mt-2 w-full py-2 h-9 bg-sky-500 rounded-[12px] text-white text-lg gap-4"
                        to={{
                          pathname: `/saved/${data.platsbankenId}`,
                          state: { jobId: data.platsbankenId },
                        }}
                      >
                        Läs mer <FaArrowRight size={16} />
                      </Link>
                    </div>
                  </li>
                );
              })
            )}
          </ul>
          <div className="flex mb-40"></div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default SavedJobs;
