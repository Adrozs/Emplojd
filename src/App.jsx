//Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";
// Pages
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import JobSearch, { loader as menuLoader } from "./pages/JobSearch/JobSearch";
import JobList from "./pages/JobList/JobList";
import JobInfo from "./pages/JobInfo/JobInfo";
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
        loader: menuLoader,
        errorElement: <Error />,
      },
      { path: "/joblist", element: <JobList /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      { path: "/profile", element: <Profile /> },
      {
        path: "/job/:jobId",
        element: <JobInfo />,
        // loader: orderLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
