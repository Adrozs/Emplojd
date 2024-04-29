import JobSearchForm from "./JobSearchForm";
import Footer from "../../components/Footer";

import HeaderSearchJob from "../../components/Header/HeaderSearchJob";

function JobList() {
  return (
    <main className="flex flex-col  h-screen ">
      <HeaderSearchJob />
      <main className=" px-5 pb-[90px] bg-[#ECEEF0]">
        <JobSearchForm />
      </main>
      <Footer />
    </main>
  );
}

export default JobList;
