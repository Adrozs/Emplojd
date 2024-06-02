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
      <div className="dark:bg-slate-800 min-h-screen">
        <HeaderOtherPages />
        <div className="bg-gradient-to-tl-purple-sky dark:bg-dark-gradient-to-140-purple-slate p-4 flex justify-between items-center mx-5 my-3 text-center rounded-xl">
          <h6 className=" text-[20px] ml-2 text-white">Sparade jobb</h6>
          <FaHeart size={22} className="text-white mr-2" />
        </div>
        <div className="mt-4">
          <div className="bg-sky-100 p-4 w-[90%] mx-auto rounded-[10px] dark:bg-gray-900 ">
            <p className=" text-sm ml-2 text-black dark:text-white">
              Här har du åtkomst till alla jobbannonser du har valt att spara.
            </p>
          </div>
          <ul className="flex flex-col items-center my-10 mx-4">
            {likes <= 0 ? (
              <>
                <div className="border-gray-400 border-dashed border-2 h-[230px] w-[90%] p-4 flex justify-between rounded-[20px] mb-4 items-center dark:bg-slate-700">
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
                    className="bg-white w-full max-w-[600px] mx-5 mt-4 px-5 py-4 rounded-3xl dark:text-white dark:bg-stone-900"
                  >
                    <div
                      className="grid justify-between w-full grid-flow-col"
                      style={{ gridTemplateColumns: "4fr 1fr" }}
                    >
                      <div className="row-start-1 col-start-1">
                        <h3 className="font-semibold text-xl text-stone-900 dark:text-white">
                          {data.headline}
                        </h3>
                        <p className="text-lg">{data.employer.name}</p>
                      </div>
                      <div className="row-start-1 col-start-2 flex justify-end">
                        <FaHeart
                          size={44}
                          className="text-purple-400"
                          onClick={() => handleDislike(data)}
                        />
                      </div>
                      <div className="row-start-2 col-start-1">
                        <p className="text-sm my-2">
                          {data.workplace_Address.municipality} -{" "}
                          {daySincePosted} dagar sen
                        </p>
                      </div>
                      <div className="row-start-3 col-start-1 mb-3">
                        <div className="flex gap-2 text-[12px]">
                          <span className="bg-[#CFEBD4] dark:bg-fuchsia-600 px-2 py-1 rounded-[2px]">
                            {data.working_Hours_Type.label}
                          </span>
                          {/* <span className="bg-purple-300 px-2 py-1">
                          {data.employment_Type.label}
                        </span> */}
                          <span className="bg-[#C3E7F3] dark:bg-teal-600 px-2 py-1 rounded-[2px]">
                            {data.occupation.label}
                          </span>
                        </div>
                      </div>
                      <div className="row-start-4 col-start-1 col-span-2">
                        <Link
                          className="items-center justify-center flex p-2 h-9 bg-sky-500 rounded-xl text-white text-lg gap-4 dark:bg-indigo-700"
                          to={{
                            pathname: `/saved/${data.platsbankenId}`,
                            state: { jobId: data.platsbankenId },
                          }}
                        >
                          Läs mer <FaArrowRight size={16} />
                        </Link>
                      </div>
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
