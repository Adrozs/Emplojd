import JobSearchForm from "./JobSearchForm";
import Footer from "../../components/Footer";
import EmplojdLogo from "../../components/Icons/EmplojdLogoSVG";

import HeaderSearchJob from "../../components/Header/HeaderSearchJob";

function JobList() {
  return (
    <>
      <main className="flex flex-col min-h-full bg-gradient-to-tl-purple-sky dark:bg-dark-gradient-to-140-purple-slate lg:pb-20">
        <HeaderSearchJob>
          <EmplojdLogo className="w-28 fill-white" />
        </HeaderSearchJob>
        <div className="px-5 pb-24 ">
          <JobSearchForm />
        </div>
      </main>
      <Footer />
    </>
  );
}

export default JobList;
