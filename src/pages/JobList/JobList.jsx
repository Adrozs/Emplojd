import JobSearchForm from "./JobSearchForm";

function JobList() {
  return (
    <main className="flex flex-col mt-4 p-5 h-screen">
      <JobSearchForm />
      <footer className="h-full w-full flex items-center justify-center bg-stone-500">
        <div className="text-xl">Footer</div>
      </footer>
    </main>
  );
}

export default JobList;
