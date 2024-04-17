import JobSearchForm from "./JobSearchForm";
import Footer from "../../components/Footer";

function JobList() {
  return (
    <main className="flex flex-col mt-4 p-5 h-screen">
      <JobSearchForm />
      <Footer />
    </main>
  );
}

export default JobList;
