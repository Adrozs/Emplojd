import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

//icons
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { PiClockCounterClockwiseBold } from 'react-icons/pi';
import { FaBullhorn } from 'react-icons/fa';
// uuid
import { v4 as uuidv4 } from 'uuid';
import Tooltip from '../../components/Tooltip';
import { getJobsBackend } from '../../utils/backendserver';
import { toast } from 'react-toastify';

function JobSearchForm() {
	const navigate = useNavigate();
	const [city, setCity] = useState('');
	const [job, setJob] = useState('');
	const [jobsData, setJobsData] = useState(null);

	// Flytta initialiseringen av latest utanför useState
	let initialLatest = [];
	const storedValue = localStorage.getItem('searchHistory');
	if (storedValue) {
		initialLatest = JSON.parse(storedValue);
	}

	const [latest, setLatest] = useState(initialLatest);
	const token = localStorage.getItem('authToken');

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (token) {
			try {
				let data;
				if (city && job) {
					data = await getJobsBackend(city + '+' + job);
					setLatest((items) => [...items, { id: uuidv4(), city, job }]);
					setCity('');
					setJob('');
				} else if (city && !job) {
					data = await getJobsBackend(city);
					setLatest((items) => [...items, { id: uuidv4(), city }]);
					setCity('');
				} else if (!city && job) {
					data = await getJobsBackend(job);
					setLatest((items) => [...items, { id: uuidv4(), job }]);
					setJob('');
				} else {
					return;
				}
				setJobsData(data);
				window.scrollTo(0, 0);
				navigate('/jobsearch', {
					state: { jobsData: data, query: { city, job } },
				});
			} catch (error) {
				console.error('Error fetching jobs:', error);
			}
		} else {
			toast.error('Du måste vara inloggad för att söka jobb.');
		}
	};

	//spara tidigare sökningar
	useEffect(
		function () {
			localStorage.setItem('searchHistory', JSON.stringify(latest));
		},
		[latest]
	);

	//ta bort tidigare sökningar
	function handleDeleteHistory(id) {
		setLatest((latest) => latest.filter((search) => search.id !== id));
	}
	return (
		<div className="py-6 px-4 bg-white dark:bg-gray-800 rounded-[20px] max-w-lg mx-auto md:mb-52">
			<h2 className="mt-3 mb-2 text-center text-2xl font-[600] dark:text-white">
				Hitta rätt jobb för dig
			</h2>
			<SearchForm
				handleSubmit={handleSubmit}
				setCity={setCity}
				setJob={setJob}
				job={job}
				city={city}
				latest={latest}
			/>
			<div className="mt-3 max-w-sm mx-auto text-sm text-center border-0 mb-6">
				<div className="flex items-center justify-center gap-2">
					<FaBullhorn className="mt-1 dark:fill-white" />
					<Link
						className="text-[13px] underline dark:text-white"
						to={'/myprofile'}
					>
						Har du laddat upp ditt cv än?
					</Link>
				</div>
			</div>
			{latest.length !== 0 && (
				<div className="mt-4 max-w-sm mx-auto text-sm">
					<p className="mx-6 dark:text-white">Dina senaste sökningar:</p>
					<ul className="mt-2">
						{latest
							.slice(-5)
							.reverse()
							.map((search, index) => (
								<Items
									search={search}
									key={index}
									onDelete={handleDeleteHistory}
									setCity={setCity}
									setJob={setJob}
								/>
							))}
					</ul>
				</div>
			)}
		</div>
	);
}

export function SearchForm({
	handleSubmit,
	setJob,
	setCity,
	job,
	city,
	bgColor,
}) {
	return (
		<form
			className={`my-4 p-6 rounded-2xl ${
				bgColor ? bgColor : 'bg-white dark:bg-gray-800'
			}`}
			onSubmit={handleSubmit}
		>
			<div className="mb-5">
				<label className="block mb-2 font-medium text-gray-900 dark:text-white">
					Ange titel, företag, nyckelord
				</label>
				<input
					type="text"
					value={job}
					onChange={(e) => setJob(e.target.value)}
					className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:text-white dark:bg-neutral-800 dark:border-neutral-700"
					placeholder="Sök"
				/>
			</div>
			<div className="mb-5">
				<label className="block mb-2  font-medium text-gray-900 dark:text-white">
					Ange stad
				</label>
				<select
					value={city}
					onChange={(e) => setCity(e.target.value)}
					className="shadow-sm bg-gray-50 border border-gray-300 text-stone-800 text-sm rounded-lg  block w-full p-2.5 dark:text-white dark:bg-neutral-800 dark:border-neutral-700"
					placeholder="Sök"
				>
					<option value=" ">Hela landet</option>
					<option value="Stockholm">Stockholm</option>
					<option value="Göteborg">Göteborg</option>
					<option value="Malmö">Malmö</option>
					<option value="Uppsala">Uppsala</option>
					<option value="Linköping">Linköping</option>
					<option value="Västerås">Västerås</option>
					<option value="Örebro">Örebro</option>
					<option value="Norrköping">Norrköping</option>
					<option value="Helsingborg">Helsingborg</option>
					<option value="Jönköping">Jönköping</option>
					<option value="Södertälje">Södertälje</option>
				</select>
			</div>

			<button
				type="submit"
				className=" flex items-center justify-center  text-white bg-customBlue hover:bg-sky-600 focus:ring-4 focus:outline-none focus:ring-stone-300 rounded-[12px]  px-5 py-2 text-center w-full gap-2"
			>
				<FaMagnifyingGlass size={15} />
				Sök
			</button>
		</form>
	);
}

export function DisplaySearchHistory({ search, onDelete, setCity, setJob }) {
	const handleClickForSearchAgain = () => {
		if (search.city && search.job) {
			setCity(search.city);
			setJob(search.job);
		} else if (search.city && !search.job) {
			setCity(search.city);
		} else if (search.job && !search.city) {
			setJob(search.job);
		}
	};

	return (
		<div className="flex gap-2 justify-between items-center bg-white dark:text-white dark:bg-slate-700 dark:border-slate-800 mb-3 border-2 mx-6 px-3 h-12 rounded-xl">
			<div className="flex gap-5">
				<Tooltip tooltip="Sök igen">
					<button onClick={handleClickForSearchAgain}>
						{' '}
						<PiClockCounterClockwiseBold
							size={16}
							viewBox="20 28 208 200"
							className="text-customBlue relative top-0.5"
						/>
					</button>
				</Tooltip>
				{search.city && !search.job && (
					<div onClick={handleClickForSearchAgain}>{search.city} </div>
				)}
				{search.job && !search.city && (
					<div onClick={handleClickForSearchAgain}>{search.job} </div>
				)}
				{search.city && search.job && (
					<div onClick={handleClickForSearchAgain}>
						{search.job} inom {search.city}
					</div>
				)}
			</div>
			<Tooltip tooltip="Ta bort">
				<button onClick={onDelete}>
					<img
						src="/trash.png"
						alt="papperskorg"
						className="h-[16px] relative top-0.5"
					/>
				</button>
			</Tooltip>
		</div>
	);
}

export function Items({ search, index, onDelete, setCity, setJob }) {
	return (
		<li>
			{
				<DisplaySearchHistory
					setCity={setCity}
					setJob={setJob}
					search={search}
					key={index}
					onDelete={() => onDelete(search.id)}
				/>
			}
		</li>
	);
}

export default JobSearchForm;
