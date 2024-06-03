import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
	SearchSVG,
	ProfileSVG,
	HeartSVG,
	LetterSVG,
	LogInSVG,
	LogOutSVG,
	CancelSVG,
	MyCvSVG,
} from './Icons/MenySvg';
import { removeUserFromLocalStorage } from '../utils/localStorage';
import DarkModeToggleSwitch from './DarkModeToggleSwitch';
import EmplojdLogo from './Icons/EmplojdLogoSVG';

function Modal({ onClose, menu }) {
	const { isLoggedIn, logout } = useAuth();
	const navigate = useNavigate();

	const [isDarkMode, setIsDarkMode] = useState(false);

	const handleSignOut = () => {
		removeUserFromLocalStorage();
		logout();
		navigate('/signin');
		console.log('User signed out.');
	};

	const handleToggle = () => {
		setIsDarkMode(!isDarkMode);
	};

	useEffect(() => {
		function handleEscape(event) {
			if (event.key === 'Escape') {
				onClose();
			}
		}

		function handleClickOutside(event) {
			const modalContent = document.querySelector('.modal-content');
			if (menu && modalContent && !modalContent.contains(event.target)) {
				onClose();
			}
		}

		document.addEventListener('keydown', handleEscape);
		document.addEventListener('mousedown', handleClickOutside);

		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [onClose, menu]);

	return (
		<>
			{menu && (
				<nav className="fixed z-40 inset-0 overflow-y-auto bg-opacity-75 flex justify-end items-start">
					<div className="bg-gray-100 max-w-lg w-[15rem] h-[30rem] z-1 modal-content drop-shadow-xl rounded-b-xl rounded-tl-xl dark:bg-customDarkBg">
						<div className="p-5 flex flex-col h-[100%] text-gray-300 justify-between">
							<div className="flex justify-between">
								{isLoggedIn ? (
									<button
										onClick={handleSignOut}
										className="flex items-end gap-4 text-gray-700 dark:text-white"
									>
										{' '}
										<LogOutSVG isDarkMode={isDarkMode} />
										<span> Logga ut</span>
									</button>
								) : (
									<button className="flex items-center gap-4 text-gray-700 dark:text-white">
										{' '}
										<LogInSVG isDarkMode={isDarkMode} />
										<Link to="/signin">
											<span> Logga in</span>
										</Link>
									</button>
								)}
								<button onClick={() => onClose(!menu)} className="self-end">
									<CancelSVG
										className="bg-white bg-clip-border"
										isDarkMode={isDarkMode}
									/>
								</button>
							</div>
							<div className="flex flex-col  mx-auto">
								<NavItem isDarkMode={isDarkMode} isLoggedIn={isLoggedIn}>
									<SearchSVG isDarkMode={isDarkMode} />
									<Link
										to={isLoggedIn ? '/joblist' : '#'}
										className={isLoggedIn ? '' : 'pointer-events-none'}
									>
										<span
											className={`font-medium ${
												isLoggedIn
													? 'text-gray-700 dark:text-white'
													: 'text-gray-400 cursor-none'
											}`}
										>
											Sök jobb
										</span>
									</Link>
								</NavItem>
								<NavItem isDarkMode={isDarkMode} isLoggedIn={isLoggedIn}>
									<ProfileSVG isDarkMode={isDarkMode} />
									<Link
										to={isLoggedIn ? '/MyProfile' : '#'}
										className={isLoggedIn ? '' : 'pointer-events-none'}
									>
										<span
											className={`font-medium ${
												isLoggedIn
													? 'text-gray-700 dark:text-white'
													: 'text-gray-400 cursor-none'
											}`}
										>
											Min profil
										</span>
									</Link>
								</NavItem>
								<NavItem isDarkMode={isDarkMode} isLoggedIn={isLoggedIn}>
									<MyCvSVG isDarkMode={isDarkMode} />
									<Link
										to={isLoggedIn ? '/SavedCV' : '#'}
										className={isLoggedIn ? '' : 'pointer-events-none'}
									>
										<span
											className={`font-medium ml-1 ${
												isLoggedIn
													? 'text-gray-700 dark:text-white'
													: 'text-gray-400 cursor-none'
											}`}
										>
											Mitt CV
										</span>
									</Link>
								</NavItem>
								<div className="flex flex-col">
									<NavItem isDarkMode={isDarkMode} isLoggedIn={isLoggedIn}>
										<HeartSVG isDarkMode={isDarkMode} />
										<Link
											to={isLoggedIn ? '/saved' : '#'}
											className={isLoggedIn ? '' : 'pointer-events-none'}
										>
											<span
												className={`font-medium ${
													isLoggedIn
														? 'text-gray-700 dark:text-white'
														: 'text-gray-400 cursor-none'
												}`}
											>
												Sparade jobb
											</span>
										</Link>
									</NavItem>
									<NavItem isDarkMode={isDarkMode} isLoggedIn={isLoggedIn}>
										<LetterSVG isDarkMode={isDarkMode} />
										<Link
											to={isLoggedIn ? '/coverletter' : '#'}
											className={isLoggedIn ? '' : 'pointer-events-none'}
										>
											<span
												className={`font-medium ${
													isLoggedIn
														? 'text-gray-700 dark:text-white'
														: 'text-gray-400 cursor-none'
												}`}
											>
												Sparade brev
											</span>
										</Link>
									</NavItem>
								</div>
							</div>
							<div className="flex flex-col gap-6">
								<div className="flex justify-center">
									<EmplojdLogo className="w-28 dark:fill-white" />
								</div>
								<DarkModeToggleSwitch onToggle={handleToggle} />
							</div>
						</div>
					</div>
				</nav>
			)}
		</>
	);
}

function NavItem({ children }) {
	return (
		<div className="flex items-center gap-4 flex-grow mt-4 text-lg">
			{children}
		</div>
	);
}

export default Modal;
