import { BsArrowDownCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import JobSearchForm from '../JobList/JobSearchForm';
import { SiPokemon } from 'react-icons/si';
import Footer from '../../components/Footer';

function SavedJobs() {
	return (
		<>
			<section className="bg-stone-400 pb-20" id="hero">
				<div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-grow">
					<div className="flex flex-col items-center justify-center mt-64 space-y-12 md:w-1/2">
						<p className="max-w-sm text-left md:text-left pl-4 pr-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat.
						</p>
						<div className="flex justify-center md:justify-center">
							<Link to="/signin" className="p-3 px-12 mb-20 bg-stone-100">
								CTA
							</Link>
						</div>
						<div className="max-w-sm text-center md:text-center">
							<p>Lorem ipsum dolor sit amet</p>
							<div className="flex justify-center md:justify-center">
								<button className="p-5 px-6 pt-2 baseline">
									<BsArrowDownCircle size="2rem" />
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>
			<div className="bg-stone-200 min-h-4 flex justify-center  ">
				<h6 className="mt-2 flex-col font-semi-bold items-center justify-center text-center text-2xl">
					TEXT
				</h6>
			</div>
			<JobSearchForm />
			<div className="min-h-96 mt-10">
				<h6 className="mt-2 flex-col font-bold items-center justify-center text-center text-2xl mb-10">
					Såhär går det till
				</h6>

				<div className="flex mr-10 ms-10 mb-20 ml-20">
					<div className="mr-12">
						<button className="p-5 px-6 pt-2 baseline">
							<SiPokemon size="4rem" />
						</button>
						<h6 className="font-bold text-xl">1. lorem ipsum</h6>
						<p>lorem ipsum lorem ipsum lorem </p>
					</div>

					<div>
						<button className="p-5 px-6 pt-2 baseline">
							<SiPokemon size="4rem" />
						</button>
						<h6 className="font-bold text-xl">2. lorem ipsum</h6>
						<p>lorem ipsum lorem ipsum lorem </p>
					</div>
				</div>

				<div className="flex mr-10 ms-10 mb-10 ml-20">
					<div className="mr-12">
						<button className="p-5 px-6 pt-2 baseline">
							<SiPokemon size="4rem" />
						</button>
						<h6 className="font-bold text-xl">3. lorem ipsum</h6>
						<p>lorem ipsum lorem ipsum lorem </p>
					</div>

					<div>
						<button className="p-5 px-6 pt-2 baseline">
							<SiPokemon size="4rem" />
						</button>
						<h6 className="font-bold text-xl">4. lorem ipsum</h6>
						<p>lorem ipsum lorem ipsum lorem </p>
					</div>
				</div>

				<div className="flex justify-center md:justify-center">
					<Link to="/signin" className=" ml-5 p-3 px-40 font-bold bg-stone-300">
						CTA?
					</Link>
				</div>
				<h6 className="font-bold mt-20 ms-10 text-2xl">TEXT</h6>
			</div>
			<p className="ms-10 mr-10 mt-5 mb-10">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat.
			</p>
			<Footer />
		</>
	);
}
export default SavedJobs;
