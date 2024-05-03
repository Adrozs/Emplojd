import { useState, useEffect } from "react";
import JobItem from "./JobItem";
import { Link, useLocation } from "react-router-dom";
import { getJobs } from "../../services/apiJobs";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import HeaderSearchJob from "../../components/Header/HeaderSearchJob";

function JobSearch() {
  const { state } = useLocation();
  const [jobs, setJobs] = useState([]);
  const { query } = state || {};
  const [searchWord, setSearchWord] = useState("");
  const [sortedJobs, setSortedJobs] = useState([]);
  const [sortBy, setSortBy] = useState("date"); // Default sorting by date

  useEffect(() => {
    if (state && state.jobsData) {
      setJobs(state.jobsData);
      setSortedJobs(state.jobsData); // Initialize sorted jobs with initial data
    }
  }, [state]);

  useEffect(() => {
    if (query) {
      setSearchWord(query.city ? query.city : query.job ? query.job : "");
    }
  }, [query]);

  useEffect(() => {
    if (!searchWord) return;
    document.title = `Emplojd - ${searchWord}`;

    return () => {
      document.title = "Emplojd";
    };
  }, [searchWord]);

  useEffect(() => {
    // Apply sorting whenever jobs or sortBy changes
    sortJobs();
  }, [jobs, sortBy]);

  // Filter function
  function sortJobs() {
    let sorted = [...jobs];
    if (sortBy === "date") {
      sorted.sort(
        (a, b) => new Date(b.publication_date) - new Date(a.publication_date)
      );
    } else if (sortBy === "dateold") {
      sorted.sort(
        (a, b) => new Date(a.publication_date) - new Date(b.publication_date)
      );
    } else if (sortBy === "a-z") {
      sorted.sort((a, b) => {
        if (a.headline && b.headline) {
          return a.headline.localeCompare(b.headline);
        } else {
          return 0;
        }
      });
    } else if (sortBy === "z-a") {
      sorted.sort((a, b) => {
        if (a.headline && b.headline) {
          return b.headline.localeCompare(a.headline);
        } else {
          return 0;
        }
      });
    }
    setSortedJobs(sorted);
  }

  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  return (
    <>
      <HeaderSearchJob>
        <img src="/LogoEmplojd.png" alt="" className="w-[45px]" />
      </HeaderSearchJob>
      <main className="flex flex-col items-center max-w-4xl mx-auto">
        <div className="w-[90%] bg-white text-center text-2xl py-4 rounded-[11px] sm:mt-4 lg:mt-10">
          <p className="font-semibold text-stone-500">
            <span className="font-semibold text-stone-800">
              Sökresultat för
            </span>
            <br />
            <span className="text-[#0783F6]">{searchWord}</span>
          </p>
        </div>
        <div className="w-[90%] flex justify-between my-3">
          <p>Alla resultat</p>
          <div className="bg-white px-2 flex items-center gap-1 justify-center cursor-pointer">
            <HiAdjustmentsHorizontal />

            <select
              value={sortBy}
              onChange={handleSortChange}
              className="outline-none"
            >
              <option value="date">Senaste först</option>
              <option value="dateold">Äldsta först</option>
              <option value="a-z"> Titel A-Ö</option>
              <option value="z-a">Titel Ö-A</option>
            </select>
          </div>
        </div>
        <ul className="w-full flex flex-col items-center gap-5">
          {sortedJobs.map((job) => (
            <JobItem job={job} key={job.id}>
              <Link
                className="items-center justify-center flex mt-2 w-full py-2 h-7 bg-customBlue rounded-[4px] text-white text-lg"
                to={{
                  pathname: `/job/${job.id}`,
                  state: { jobId: job.id },
                }}
              >
                Läs mer <span className="text-xl"> &rarr;</span>
              </Link>
            </JobItem>
          ))}
        </ul>
      </main>
    </>
  );
}

export async function loader(url) {
  const fetchJob = getJobs(url);
  return fetchJob;
}

export default JobSearch;
