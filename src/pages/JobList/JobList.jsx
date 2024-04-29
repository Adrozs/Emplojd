import JobSearchForm from "./JobSearchForm";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

function JobList() {
  return (
    <main className="flex flex-col  p-5 h-screen">
      <Header />
      <JobSearchForm />
      <Footer />
    </main>
  );
}

export default JobList;
