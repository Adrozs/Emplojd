import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { getJobs } from "../../services/apiJobs";
//icons
import { PiClockCounterClockwiseBold } from "react-icons/pi";
import { FaBullhorn } from "react-icons/fa";
// uuid
import { v4 as uuidv4 } from "uuid";
import Tooltip from "../../components/Tooltip";
function JobSearchForm() {
  const navigate = useNavigate();
  const [city, setCity] = useState("");
  const [job, setJob] = useState("");
  const [jobsData, setJobsData] = useState(null);

  // const inputEl = useRef(null);
  // useEffect(() => {
  //   inputEl.current.focus();
  // }, []);

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
    <div className="p-3 bg-white pb-12 rounded-[20px] max-w-lg mx-auto">
      <h2 className="mt-3 mb-2 text-center text-2xl font-[600]">
        Hitta rätt jobb för dig
      </h2>
      <SearchForm
        handleSubmit={handleSubmit}
        setCity={setCity}
        setJob={setJob}
        job={job}
        city={city}
        latest={latest}
      />
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
  );
}

export function SearchForm({
  handleSubmit,
  setJob,
  setCity,
  job,
  city,
  latest,
}) {
  return (
    <form
      className="mx-6 bg-white p-3 rounded-[10px]"
      onSubmit={handleSubmit}
    >
      <div className="mb-5">
        <label className="block mb-2 font-medium text-stone-400 dark:text-white">
          Ange title, företag, nyckelord
        </label>
        <input
          type="text"
          value={job}
          onChange={(e) => setJob(e.target.value)}
          className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg  block w-full p-2.5 "
          placeholder="...."
        />
      </div>
      <div className="mb-5">
        <label className="block mb-2  font-medium text-stone-400 dark:text-white">
          Ange stad
        </label>
        <select
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="shadow-sm bg-gray-50 border border-gray-300 text-stone-800 text-sm rounded-lg  block w-full p-2.5 "
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
        className="text-white bg-customBlue hover:bg-sky-500 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-[4px]  px-5 py-2 text-center w-full text-lg"
      >
        Sök
      </button>
    </form>
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
    <div className="flex gap-2 justify-between bg-white mb-3 p-1 border-2">
      <div className="flex gap-5">
        <button onClick={handleClickForSearchAgain}>
          <PiClockCounterClockwiseBold size={18} className="text-customBlue" />
        </button>
        {search.city && !search.job && (
          <div onClick={handleClickForSearchAgain}>{search.city} </div>
        )}
        {search.job && !search.city && (
          <div onClick={handleClickForSearchAgain}>{search.job} </div>
        )}
        {search.city && search.job && (
          <div onClick={handleClickForSearchAgain}>
            {search.job} inom {search.city}
          </div>
        )}
      </div>
      <Tooltip tooltip="Ta bort">
        <button onClick={onDelete}>
          <img src="/trash.png" alt="papperskorg" className="h-[14px]" />
        </button>
      </Tooltip>
    </div>
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

export default JobSearchForm;
