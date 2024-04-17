import { BsArrowDownCircle } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import JobList from '../JobList/JobList';
import JobSearchForm from '../JobList/JobSearchForm';
import { LiaKissWinkHeartSolid } from 'react-icons/lia';
import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaInstagramSquare } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa';

export default function LandingPage() {
	return (
		<>
			<section className="bg-stone-400 h-screen" id="hero">
				<div className="container flex flex-col-reverse items-center px-6 mx-auto mt-10 space-y-0 md:space-y-0 md:flex-grow">
					<div className="flex flex-col items-center justify-center mt-64 space-y-12 md:w-1/2">
						<p className="max-w-sm text-left md:text-left pl-4 pr-4">
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat.
						</p>
						<div className="flex justify-center md:justify-center">
							<Link to="/signin" className="p-3 px-12  bg-stone-100">
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
			<div className="bg-stone-100 min-h-4 flex justify-center  ">
				<h6 className="mt-2 flex-col font-semi-bold items-center justify-center text-center text-2xl">
					TEXT
				</h6>
			</div>
			<JobSearchForm />
			<div className="min-h-96 mt-10">
				<h6 className="mt-2 flex-col font-semi-bold items-center justify-center text-center text-2xl mb-10">
					Såhär går det till
				</h6>

				<div className="flex mr-10 ms-10 mb-20">
					<div>
						<button className="p-5 px-6 pt-2 baseline">
							<LiaKissWinkHeartSolid size="2rem" />
						</button>
						<h6 className="font-bold text-xl">1. lorem ipsum</h6>
						<p>lorem ipsum lorem ipsum lorem </p>
					</div>

					<div>
						<button className="p-5 px-6 pt-2 baseline">
							<LiaKissWinkHeartSolid size="2rem" />
						</button>
						<h6 className="font-bold text-xl">1. lorem ipsum</h6>
						<p>lorem ipsum lorem ipsum lorem </p>
					</div>
				</div>
				<div className="flex mr-10 ms-10 min-h-52">
					<div>
						<button className="p-5 px-6 pt-2 baseline">
							<LiaKissWinkHeartSolid size="2rem" />
						</button>
						<h6 className="font-bold text-xl">1. lorem ipsum</h6>
						<p>lorem ipsum lorem ipsum lorem </p>
					</div>

					<div>
						<button className="p-5 px-6 pt-2 baseline">
							<LiaKissWinkHeartSolid size="2rem" />
						</button>
						<h6 className="font-bold text-xl">1. lorem ipsum</h6>
						<p>lorem ipsum lorem ipsum lorem </p>
					</div>
				</div>
				<div className="flex justify-center md:justify-center">
					<Link to="/signin" className="p-3 px-40 font-bold bg-stone-300">
						CTA?
					</Link>
				</div>
				<h6 className="mt-2 font-semi-bold mt-20 ms-10 text-2xl">TEXT</h6>
			</div>
			<p className="ms-10 mr-10 mt-5 mb-10">
				Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
				tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
				veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
				commodo consequat.
			</p>
			<div>
				<div className="bg-stone-400">
					<div className="flex justify-center">
						<h2 className="inline bg-slate-100 p-2.5 pl-5 pr-5 font-bold mt-10 mb-10 text-3xl">
							LOGO
						</h2>
					</div>
					<div className="text-center mb-10">
						<h3 className="mb-5 font-bold text-xl">TEXT</h3>
						<p className="mb-3">Min sida</p>
						<p className="mb-3">Sök jobb</p>
					</div>
					<h2 className="flex justify-center font-bold mb-3 text-xl">
						Följ oss på sociala medier
					</h2>
					<div className="flex justify-center">
						<button className="p-5 px-6 pt-2 baseline">
							<AiFillTwitterCircle size="2rem" />
						</button>
						<button className="p-5 px-6 pt-2 baseline">
							<FaInstagramSquare size="2rem" />
						</button>
						<button className="p-5 px-6 pt-2 baseline">
							<FaFacebook size="2rem" />
						</button>
					</div>
					<h3 className="flex justify-center text-xl font-bold mb-7 mt-4">
						Ladda ner vår app
					</h3>
					<div className="flex justify-center justify-evenly ">
						<div className="">
							<Link to="/signin" className="p-3 px-6 font-bold bg-stone-300">
								App Store
							</Link>
						</div>
						<div className="">
							<Link to="/signin" className="p-3 px-6 font-bold bg-stone-300">
								Google Play
							</Link>
						</div>
					</div>
					<p className="flex justify-center pt-12 pb-7 text-xs ">
						Copyright bla bla bla
					</p>
				</div>
			</div>
		</>
	);
}
