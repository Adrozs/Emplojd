import { Link } from "react-router-dom";
import { MdWork } from "react-icons/md";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import { getLikeData } from "../../utils/jsonserver";
import { useState, useEffect } from "react";

function SavedJobs() {
  const [likes, setLikes] = useState([]);

  useEffect(() => {
    getLikeData().then((data) => {
      setLikes(data);
    });
  }, []);
  return (
    <>
      <HeaderOtherPages />
      <div className="bg-stone-300 p-1 ml-5 mr-48 flex mb-6 mt-8">
        <h6 className="mt-2  font-semi-bold text-xl">SPARADE JOBB</h6>
      </div>

      <div className=" justify-evenly flex flex-row p-1 text-6xl rounded mr-5">
        <MdWork />
        <MdWork />
        <MdWork />
        <MdWork />
      </div>

      <div className=" justify-evenly flex flex-row p-1 text-xs mt-3 mr-6">
        <p className="bg-stone-300 p-1 text-center pl-3 pr-3">FÖRETAG</p>
        <p className="bg-stone-300 p-1 text-center pl-3 pr-3">FÖRETAG</p>
        <p className="bg-stone-300 p-1 text-center pl-3 pr-3">FÖRETAG</p>
        <p className="bg-stone-300 p-1 text-center pl-3 pr-3">FÖRETAG</p>
      </div>

      <div className=" mt-10 flex-row">
        <div className="bg-stone-300 ml-5 mr-40 flex mb-6 ">
          <h6 className="mt-2  font-semi-bold text-xl ml-2">ANSÖKTA JOBB</h6>
        </div>

        {likes &&
          likes.map((data) => {
            return (
              <div className="flex ms-10 mb-10 ml-20" key={data.id}>
                <div className="flex items-center mr-12 ">
                  <MdWork className="text-6xl" />
                  <div className="ml-8">
                    <p className="bg-stone-300  mb-1 w-[250px]">
                      {data.employer}
                    </p>
                    <p className="bg-stone-300  mb-1 w-[250px]">
                      {data.headline}
                    </p>
                    <p className="bg-stone-300  mb-1 w-[250px]">
                      {data.occupation}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}

        <div className="flex mb-10">
          <Link
            to="/joblist"
            className=" ml-5 p-7 px-28 font-bold bg-stone-300"
          >
            FORTSÄTT LETA
          </Link>
        </div>
      </div>
    </>
  );
}

function SavedItem({ like }) {
  return (
    <div className="flex ms-10 mb-10 ml-20">
      <div className="flex items-center mr-12 ">
        <MdWork className="text-6xl" />
        <div className="ml-8">
          <p className="bg-stone-300 pr-40 mb-1">TITLE</p>
          <p className="bg-stone-300 pr-40 mb-1">{like.headline}</p>
          <p className="bg-stone-300 pr-40 mb-1">TEXT</p>
        </div>
      </div>
    </div>
  );
}

export default SavedJobs;
