import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiJobs";
import JobItem from "./JobItem";
function JobSearch() {
  const menu = useLoaderData();

  return (
    <ul>
      {menu.map((job) => (
        <JobItem job={job} key={job.id} />
      ))}
    </ul>
  );
}

export async function loader() {
  const menu = await getMenu();
  console.log(menu);
  return menu;
}

export default JobSearch;
