//Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Pages
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import JobSearch, { loader as searchLoader } from "./pages/JobSearch/JobSearch";
import JobList from "./pages/JobList/JobList";
import JobInfo, { loader as jobLoader } from "./pages/JobInfo/JobInfo";

import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import LandingPage from "./pages/LandingPage/LandingPage";
import ApplyNow from "./pages/ApplyNow/ApplyNow";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <LandingPage /> },
      {
        path: "/jobsearch",
        element: <JobSearch />,
        loader: searchLoader,
        errorElement: <Error />,
      },
      { path: "/joblist", element: <JobList />, errorElement: <Error /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/profile", element: <Profile /> },
      {
        path: "/job/:jobId",
        element: <JobInfo />,
        loader: jobLoader,
        errorElement: <Error />,
      },
      {
        path: "/job/:jobId/apply",
        element: <ApplyNow />,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
