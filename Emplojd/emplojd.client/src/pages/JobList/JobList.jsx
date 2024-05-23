import JobSearchForm from "./JobSearchForm";
import Footer from "../../components/Footer";

import HeaderSearchJob from "../../components/Header/HeaderSearchJob";

function JobList() {
  return (
    <main className="flex flex-col  h-screen     bg-gradient-to-tl from-purple-400 to-sky-500  bg-cover bg-no-repeat  lg:pb-20">
      <HeaderSearchJob>
        <h1 className="text-xl font-Glockenspiel cursor-pointer">EMPLOJD</h1>
      </HeaderSearchJob>
      <main className=" px-5 pb-[90px] ">
        <JobSearchForm />
      </main>
      <Footer />
    </main>
  );
}

export default JobList;
