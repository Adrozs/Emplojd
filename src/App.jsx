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
import LandingPage from "./pages/LandingPage/LandingPage";
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
        element: <ProtectedRoute><JobSearch /></ProtectedRoute>,
        loader: searchLoader,
        errorElement: <Error />,
      },
      { path: "/joblist", element: <ProtectedRoute><JobList /></ProtectedRoute>, errorElement: <Error /> },
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
        path: "/job/:jobId",
        element: (
          <ProtectedRoute>
            <JobInfo />
          </ProtectedRoute>
        ),
        loader: jobLoader,
        errorElement: <Error />,
      },
    ],
  },
]);

function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
