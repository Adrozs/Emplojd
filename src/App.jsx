//Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Pages
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import JobSearch, { loader as searchLoader } from "./pages/JobSearch/JobSearch";
import JobList from "./pages/JobList/JobList";
import JobInfo, { loader as jobLoader } from "./pages/JobInfo/JobInfo";
import Homepage from "./pages/Homepage";
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Homepage /> },
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
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
