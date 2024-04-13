import { useNavigate, Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { getJobs } from "../../services/apiJobs";

function JobList() {
  const [city, setCity] = useState("");
  const [job, setJob] = useState("");
  const [jobsData, setJobsData] = useState(null);
  const [latest, setLatest] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // useEffect(() => {
  //   if (city === "" || job === "") return;
  //   else {
  //     const fetchData = async () => {
  //       try {
  //         const data = await getJobs(city + "+" + job);
  //         setJobsData(data);
  //       } catch (error) {
  //         console.error("Error fetching jobs:", error);
  //       }
  //     };
  //     fetchData();
  //   }
  // }, [city, job]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let data;
      if (city && job) {
        data = await getJobs(city + "+" + job);
        setLatest((items) => [...items, { city, job }]);
        setCity("");
        setJob("");
      } else if (city && !job) {
        data = await getJobs(city);
        setLatest((items) => [...items, { city }]);
        setCity("");
      } else if (!city && job) {
        data = await getJobs(job);
        setLatest((items) => [...items, { job }]);
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

  return (
    <div className="p-5">
      <div className="p-3 pb-10 bg-stone-200">
        <h2 className="m-3 text-center text-xl font-bold">
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
              onChange={(e) => setJob(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="...."
            />
          </div>
          <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-stone-400 dark:text-white">
              Ange stad
            </label>
            <input
              type="text"
              name="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              placeholder="...."
            />
          </div>

          <button
            type="submit"
            className="text-white bg-stone-400 hover:bg-stone-800 focus:ring-4 focus:outline-none focus:ring-stone-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center w-full"
          >
            Sök
          </button>
        </form>
        <div className="mt-3 max-w-sm mx-auto text-sm text-center border-0 mb-6">
          <Link className="text-[12px] underline " to={"/profile"}>
            Har du laddat upp ditt cv än?
          </Link>
        </div>
        {latest.length !== 0 && (
          <div className="mt-4 max-w-sm mx-auto text-sm">
            <p>Dina senaste sökningar:</p>
            <ul>
              {latest.reverse().map((search, index) => (
                <Items search={search} key={index} />
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}

export function Items({ search }) {
  return (
    <li>
      {search.city && !search.job && <>Stad: {search.city}</>}
      {search.job && !search.city && <>Jobb: {search.job}</>}
      {search.city && search.job && (
        <>
          Stad: {search.city}, Jobb: {search.job}
        </>
      )}
    </li>
  );
}

export default JobList;
