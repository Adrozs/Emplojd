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
        element: (
          <ProtectedRoute>
            <JobSearch />
          </ProtectedRoute>
        ),
        loader: searchLoader,
        errorElement: <Error />,
      },
      {
        path: "/joblist",
        element: (
          <ProtectedRoute>
            <JobList />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      { path: "/signup", element: <SignUp /> },
      { path: "/signin", element: <SignIn /> },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <Profile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/MyProfile",
        element: (
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/CreateProfile",
        element: (
          <ProtectedRoute>
            <CreateProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved",
        element: <SavedJobs />,
      },
      {
        path: "/NoEarlierCoverLetter",
        element: <NoEarlierCoverLetter />,
      },
      {
        path: "/job/:jobId",
        element: (
          <ProtectedRoute>
            <JobInfo />
          </ProtectedRoute>
        ),
        loader: jobLoader,
        errorElement: <Error />,
      },
      {
        path: "/job/:jobId/apply",
        element: (
          <ProtectedRoute>
            <ApplyNow />
          </ProtectedRoute>
        ),
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
