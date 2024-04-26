import { Link } from 'react-router-dom';
import { MdWork } from 'react-icons/md';

function NoEarlierCoverLetter() {
	return (
		<>
			<div className="bg-stone-300 flex justify-center items-center mb-6">
				<h6 className="font-semi-bold text-xl text-center">
					MITT PERSONLIGA BREV
				</h6>
			</div>

			<div className="flex justify-around p-1 text-xs mt-3 mr-6">
				<p className="bg-stone-300 p-1 text-center pl-3 pr-3">FÖRETAG</p>
				<p className="bg-stone-300 p-1 text-center pl-3 pr-3">FÖRETAG</p>
			</div>

			<div className="flex justify-around  p-1 text-xs mt-3 mr-6">
				<p className="bg-stone-300 p-1 text-center pl-3 pr-3">FÖRETAG</p>
				<p className="bg-stone-300 p-1 text-center pl-3 pr-3">FÖRETAG</p>
			</div>

			<div className=" mt-10 flex-row">
				<div className="flex ms-10 mb-5 ml-20">
					<div className="flex items-center mr-12 ">
						<MdWork className="text-6xl" />
						<div className="ml-8">
							<p className="bg-stone-300  pr-40 mb-1">TITLE</p>
							<p className="bg-stone-300  pr-40 mb-1">SUBTITLE</p>
							<p className="bg-stone-300  pr-40 mb-1">TEXT</p>
						</div>
					</div>
				</div>

				<div className="flex mb-10">
					<Link
						to="/joblist"
						className=" ml-5 p-7 px-28 font-bold bg-stone-300"
					>
						FORTSÄTT LETA
					</Link>
				</div>
			</div>
		</>
	);
}
export default NoEarlierCoverLetter;
