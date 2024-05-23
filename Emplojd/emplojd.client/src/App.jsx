//Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import {
  SignIn,
  SignUp,
  Profile,
  JobList,
  LandingPage,
  ApplyNow,
  SavedJobs,
  NoEarlierCoverLetter,
  CreateProfile,
  MyProfile,
  SavedJobsReadMore,
} from "./pages/index";
import JobSearch, { loader as searchLoader } from "./pages/JobSearch/JobSearch";
import JobInfo, { loader as jobLoader } from "./pages/JobInfo/JobInfo";

//Ui
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";

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
      {
        path: "/joblist",
        element: <JobList />,
        errorElement: <Error />,
      },

      { path: "/signin", element: <SignIn /> },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/MyProfile",
        element: <MyProfile />,
      },
      {
        path: "/CreateProfile",
        element: <CreateProfile />,
      },
      {
        path: "/saved",
        element: <SavedJobs />,
      },
      {
        path: "/saved/:jobId",
        element: <SavedJobsReadMore />,
      },
      {
        path: "/NoEarlierCoverLetter",
        element: <NoEarlierCoverLetter />,
      },
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
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer position="top-center" />
    </AuthProvider>
  );
}

export default App;
