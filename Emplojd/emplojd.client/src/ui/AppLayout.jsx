import { Outlet, useNavigation } from 'react-router-dom';
import Loader from './Loader';
function AppLayout() {
	const navigation = useNavigation();
	const isLoading = navigation.state === 'loading';

	return (
		<div className="layout bg-[#ECEEF0] dark:bg-gray-800">
			{isLoading && <Loader />}
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default AppLayout;
