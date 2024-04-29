import JobSearchForm from "./JobSearchForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function JobList() {
  return (
    <main className="flex flex-col  h-screen">
      <Header />
      <main className=" px-5">
        <JobSearchForm />
      </main>
      <Footer />
    </main>
  );
}

export default JobList;
