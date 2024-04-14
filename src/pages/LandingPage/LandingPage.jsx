import React from 'react';
import { BsArrowDownCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';

const LandingPage = () => {
	return (
		<>
			<Link to="/signin">Logga in</Link>
			<section class="bg-gray-400 h-screen" id="hero">
				<div class="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-grow">
					<div class="flex flex-col mt-64 space-y-12 md:w-1/2">
						<p class="max-w-sm text-left md:text-left pl-4 pr-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat.
						</p>
						<div class="flex justify-center md:justify-center">
							<button class="p-3 px-12 pt-2 baseline bg-gray-200">CTA</button>
						</div>
						<div class="max-w-sm text-center md:text-center">
							<p>Lorem ipsum dolor sit amet</p>
							<div class="flex justify-center md:justify-center">
								<button class="p-5 px-6 pt-2 baseline">
									<BsArrowDownCircle size="2rem" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
		</>
	);
};

export default LandingPage;
