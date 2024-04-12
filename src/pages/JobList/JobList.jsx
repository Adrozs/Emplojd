import { Link } from "react-router-dom";
function JobList() {
  return (
    <div>
      JobList
      <form>
        <h2></h2>
        <label>
          <span>Yrke:</span>
          <input type="text" placeholder="företag, yrke, plats" />
        </label>
      </form>
      <Link to="/jobsearch">Hitta jobb</Link>
    </div>
  );
}
export default JobList;
