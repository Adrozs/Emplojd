import { Link } from 'react-router-dom';

import { FaLongArrowAltRight } from 'react-icons/fa';

function NoEarlierCoverLetter() {
	return (
		<>
			<div className="bg-stone-300 flex justify-center p-3 items-center mt-10 mb-4 ml-10 mr-10">
				<h6 className="font-bold text-xl text-center">MITT PERSONLIGA BREV</h6>
			</div>

			<div className="bg-stone-400 flex  mb-9 ml-7 mr-7">
				<p className="text-l p-2">
					Här har du full åtkomst till dina tidigare skapade personliga brev.
				</p>
			</div>

			<div className="flex justify-around text-xs mt-5 mr-6 ">
				<p className="bg-stone-300 p-20 text-center pb-40"></p>

				<p className="bg-stone-300 p-20 text-center  "></p>
			</div>

			<div className="flex justify-around text-xs mt-5 mr-6">
				<p className="bg-stone-300 p-20 text-center  pb-40"></p>
				<p className="bg-stone-300 p-20 text-center  "></p>
			</div>

			<div className=" mt-10 flex">
				<div className="flex mb-10">
					<Link
						to="/joblist"
						className=" ml-5 p-7 px-28 font-bold bg-stone-300 flex items-center"
					>
						HITTA JOBB <FaLongArrowAltRight className="ml-10 text-3xl" />
					</Link>
				</div>
			</div>
		</>
	);
}
export default NoEarlierCoverLetter;

// Still to do:
// fix boxes centering
// Center hitta jobb
// fix Arrow icon size and position
