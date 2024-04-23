import { Link } from 'react-router-dom';
import { SiPokemon } from 'react-icons/si';
import { MdWork } from 'react-icons/md';

function SavedJobs() {
	return (
		<>
			<div className="bg-stone-300 p-1 ml-5 mr-40 flex mb-6 ">
				<h6 className="mt-2  font-semi-bold text-xl">SPARADE JOBB</h6>
			</div>

			<div className=" justify-evenly flex flex-row p-1 text-6xl rounded mr-5">
				<MdWork />
				<MdWork />
				<MdWork />
				<MdWork />
			</div>

			<div className=" justify-evenly flex flex-row p-1 text-xs mt-3 mr-6">
				<p className="bg-stone-300 p-1 text-center">FÖRETAG</p>
				<p className="bg-stone-300 p-1 text-center">FÖRETAG</p>
				<p className="bg-stone-300 p-1 text-center">FÖRETAG</p>
				<p className="bg-stone-300 p-1 text-center">FÖRETAG</p>
			</div>

			<div className="min-h-96 mt-10 flex-row">
				<div className="bg-stone-300 p-1 ml-5 mr-40 flex mb-6 ">
					<h6 className="mt-2  font-semi-bold text-xl">ANSÖKTA JOBB</h6>
				</div>

				<div className="flex ms-10 mb-20 ml-20">
					<div className="flex items-center mr-12 ">
						<MdWork className="text-6xl" />
						<div className="ml-8">
							<p className="bg-stone-300 p-1 mb-1">TITLE</p>
							<p className="bg-stone-300 p-1 mb-1">SUBTITLE</p>
							<p className="bg-stone-300 p-1 mb-1">TEXT</p>
						</div>
					</div>
				</div>

				<div className="flex">
					<Link to="/signin" className=" ml-5 p-7 px-28 font-bold bg-stone-300">
						FORTSÄTT LETA
					</Link>
				</div>
			</div>
		</>
	);
}
export default SavedJobs;
