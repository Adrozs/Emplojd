import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getJobs } from "../../services/apiJobs";
//icons
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { FaBullhorn } from "react-icons/fa";
// uuid
import { v4 as uuidv4 } from "uuid";

function JobList() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [job, setJob] = useState("");
  const [jobsData, setJobsData] = useState(null);

  const inputEl = useRef(null);
  useEffect(() => {
    inputEl.current.focus();
  }, []);

  // Flytta initialiseringen av latest utanför useState
  let initialLatest = [];
  const storedValue = localStorage.getItem("searchHistory");
  if (storedValue) {
    initialLatest = JSON.parse(storedValue);
  }

  const [latest, setLatest] = useState(initialLatest);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (city && job) {
        data = await getJobs(city + "+" + job);
        setLatest((items) => [...items, { id: uuidv4(), city, job }]);
        setCity("");
        setJob("");
      } else if (city && !job) {
        data = await getJobs(city);
        setLatest((items) => [...items, { id: uuidv4(), city }]);
        setCity("");
      } else if (!city && job) {
        data = await getJobs(job);
        setLatest((items) => [...items, { id: uuidv4(), job }]);
        setJob("");
      } else {
        return;
      }
      setJobsData(data);
      navigate("/jobsearch", {
        state: { jobsData: data, query: { city, job } },
      });
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  //spara tidigare sökningar
  useEffect(
    function () {
      localStorage.setItem("searchHistory", JSON.stringify(latest));
    },
    [latest]
  );

  //ta bort tidigare sökningar
  function handleDeleteHistory(id) {
    setLatest((latest) => latest.filter((search) => search.id !== id));
  }

  return (
    <main className="mt-14 p-5">
      <div className="p-3 pb-10 bg-stone-200">
        <h2 className="mt-3 mb-2 text-center text-2xl font-[600]">
          Hitta rätt jobb för dig
        </h2>
        <form className="max-w-sm mx-auto bg-white p-3" onSubmit={handleSubmit}>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-stone-400 dark:text-white">
              Ange title, företag, nyckelord
            </label>
            <input
              type="text"
              value={job}
              ref={inputEl}
              onChange={(e) => setJob(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="...."
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-stone-400 dark:text-white">
              Ange stad
            </label>
            <select
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="...."
            >
              <option value=" ">Hela landet</option>
              <option value="Stockholm">Stockholm</option>
              <option value="Göteborg">Göteborg</option>
              <option value="Malmö">Malmö</option>
              <option value="Uppsala">Uppsala</option>
              <option value="Linköping">Linköping</option>
              <option value="Västerås">Västerås</option>
              <option value="Örebro">Örebro</option>
              <option value="Norrköping">Norrköping</option>
              <option value="Helsingborg">Helsingborg</option>
              <option value="Jönköping">Jönköping</option>
              <option value="Södertälje">Södertälje</option>
            </select>
          </div>

          <button
            type="submit"
            className="text-white bg-stone-400 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
          >
            Sök
          </button>
        </form>
        <div className="mt-3 max-w-sm mx-auto text-sm text-center border-0 mb-6">
          <div className="flex items-center justify-center gap-2">
            <FaBullhorn className="mt-1" />
            <Link className="text-[13px] underline " to={"/profile"}>
              Har du laddat upp ditt cv än?
            </Link>
          </div>
        </div>
        {latest.length !== 0 && (
          <div className="mt-4 max-w-sm mx-auto text-sm">
            <p>Dina senaste sökningar:</p>
            <ul className="mt-2">
              {latest.reverse().map((search, index) => (
                <Items
                  search={search}
                  key={index}
                  onDelete={handleDeleteHistory}
                  setCity={setCity}
                  setJob={setJob}
                />
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}

export function Items({ search, index, onDelete, setCity, setJob }) {
  return (
    <li>
      {
        <DisplaySearchHistory
          setCity={setCity}
          setJob={setJob}
          search={search}
          key={index}
          onDelete={() => onDelete(search.id)}
        />
      }
    </li>
  );
}

export function DisplaySearchHistory({ search, onDelete, setCity, setJob }) {
  const handleClickForSearchAgain = () => {
    if (search.city && search.job) {
      setCity(search.city);
      setJob(search.job);
    } else if (search.city && !search.job) {
      setCity(search.city);
    } else if (search.job && !search.city) {
      setJob(search.job);
    }
  };

  return (
    <div className="flex gap-2 justify-between bg-stone-300 mb-3 p-1">
      <div className="flex gap-5">
        <button onClick={handleClickForSearchAgain}>
          <PiClockCounterClockwiseBold />
        </button>
        {search.city && !search.job && <div>{search.city} </div>}
        {search.job && !search.city && <div>{search.job} </div>}
        {search.city && search.job && (
          <div>
            {search.job} inom {search.city}
          </div>
        )}
      </div>
      <button onClick={onDelete}>
        <img src="/trash.png" alt="papperskorg" className="h-[14px]" />
      </button>
    </div>
  );
}

export default JobList;
