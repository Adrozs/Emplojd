//Imports
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Pages
import {
  SignIn,
  JobList,
  LandingPage,
  ApplyNow,
  SavedJobs,
  NoEarlierCoverLetter,
  CreateProfile,
  MyProfile,
  SavedJobsReadMore,
  ConfirmEmail,
  ConfirmAccount,
  ForgotPassword,
  ResetPassword,
  SavedCV,
  CoverLetterReadMore,
} from "./pages/index";
import JobSearch, { loader as searchLoader } from "./pages/JobSearch/JobSearch";
import JobInfo, { loader as jobLoader } from "./pages/JobInfo/JobInfo";

//Ui
import AppLayout from "./ui/AppLayout";
import Error from "./ui/Error";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./routes/ProtectedRoute";
import { DarkModeProvider } from "./components/Icons/DarkModeHook";

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
        path: "/confirm-email",
        element: (
          <ProtectedRoute>
            <ConfirmEmail />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/confirm-account",
        element: (
          <ProtectedRoute>
            <ConfirmAccount />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/forgot-password",
        element: (
          <ProtectedRoute>
            <ForgotPassword />
          </ProtectedRoute>
        ),
        errorElement: <Error />,
      },
      {
        path: "/reset-password",
        element: (
          <ProtectedRoute>
            <ResetPassword />
          </ProtectedRoute>
        ),
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

      { path: "/signin", element: <SignIn /> },

      {
        path: "/MyProfile",
        element: (
          <ProtectedRoute>
            <MyProfile />
          </ProtectedRoute>
        ),
      },
      {
        path: "/SavedCV",
        element: (
          <ProtectedRoute>
            <SavedCV />
          </ProtectedRoute>
        ),
      },
      {
        path: "/createprofile",
        element: <CreateProfile />,
      },
      {
        path: "/saved",
        element: (
          <ProtectedRoute>
            <SavedJobs />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved/:jobId",
        element: (
          <ProtectedRoute>
            <SavedJobsReadMore />
          </ProtectedRoute>
        ),
      },
      {
        path: "/coverletter",
        element: (
          <ProtectedRoute>
            <NoEarlierCoverLetter />
          </ProtectedRoute>
        ),
      },
      {
        path: "/coverletter/:jobId",
        element: (
          <ProtectedRoute>
            <CoverLetterReadMore />
          </ProtectedRoute>
        ),
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
      <DarkModeProvider>
        <RouterProvider router={router} />
        <ToastContainer position="top-center" />
      </DarkModeProvider>
    </AuthProvider>
  );
}

export default App;
