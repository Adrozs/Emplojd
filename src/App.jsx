//Imports
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
// Pages
import SignIn from './pages/SignIn/SignIn';
import SignUp from './pages/SignUp/SignUp';
import Profile from './pages/Profile/Profile';
import JobSearch, { loader as searchLoader } from './pages/JobSearch/JobSearch';
import JobList from './pages/JobList/JobList';
import JobInfo, { loader as jobLoader } from './pages/JobInfo/JobInfo';
import AppLayout from './ui/AppLayout';
import Error from './ui/Error';
import LandingPage from './pages/LandingPage/LandingPage';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './routes/ProtectedRoute';
import ApplyNow from './pages/ApplyNow/ApplyNow';
import SavedJobs from './pages/Profile/SavedJobs';
import NoEarlierCoverLetter from './pages/Profile/NoEarlierCoverLetter';
import CreateProfile from './pages/Profile/CreateProfile';

const router = createBrowserRouter([
	{
		element: <AppLayout />,
		errorElement: <Error />,
		children: [
			{ path: '/', element: <LandingPage /> },
			{
				path: '/jobsearch',
				element: (
					<ProtectedRoute>
						<JobSearch />
					</ProtectedRoute>
				),
				loader: searchLoader,
				errorElement: <Error />,
			},
			{
				path: '/joblist',
				element: (
					<ProtectedRoute>
						<JobList />
					</ProtectedRoute>
				),
				errorElement: <Error />,
			},
			{ path: '/signup', element: <SignUp /> },
			{ path: '/signin', element: <SignIn /> },
			{
				path: '/profile',
				element: (
					<ProtectedRoute>
						<Profile />
					</ProtectedRoute>
				),
			},
			{
				path: '/CreateProfile',
				element: (
					<ProtectedRoute>
						<CreateProfile />
					</ProtectedRoute>
				),
			},
			{
				path: '/saved',
				element: <SavedJobs />,
			},
			{
				path: '/NoEarlierCoverLetter',
				element: <NoEarlierCoverLetter />,
			},
			{
				path: '/job/:jobId',
				element: (
					<ProtectedRoute>
						<JobInfo />
					</ProtectedRoute>
				),
				loader: jobLoader,
				errorElement: <Error />,
			},
			{
				path: '/job/:jobId/apply',
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
		</AuthProvider>
	);
}

export default App;
