import { Link } from 'react-router-dom';
import { MdWork } from 'react-icons/md';
import { FaLongArrowAltRight } from 'react-icons/fa';

function NoEarlierCoverLetter() {
	return (
		<>
			<div className="bg-stone-300 flex justify-center p-3 items-center mt-10 mb-6 ml-10 mr-10">
				<h6 className="font-bold text-xl text-center">MITT PERSONLIGA BREV</h6>
			</div>

			<div className="bg-stone-300 flex  mb-6">
				<p className="text-l">
					Här har du full åtkomst till dina tidigare skapade personliga brev.{' '}
				</p>
			</div>

			<div className="flex justify-around text-xs mt-3 mr-6">
				<p className="bg-stone-300 p-20 text-center pl-3 pr-3">FÖRETAG</p>
				<p className="bg-stone-300 p-20 text-center pl-3 pr-3">FÖRETAG</p>
			</div>

			<div className="flex justify-around  p-1 text-xs mt-3 mr-6">
				<p className="bg-stone-300 p-1 text-center pl-3 pr-3">FÖRETAG</p>
				<p className="bg-stone-300 p-1 text-center pl-3 pr-3">FÖRETAG</p>
			</div>

			<div className=" mt-10 flex">
				<div className="flex mb-10">
					<Link
						to="/joblist"
						className=" ml-5 p-7 px-28 font-bold bg-stone-300 flex items-center"
					>
						HITTA JOBB <FaLongArrowAltRight className="ml-10" />
					</Link>
				</div>
			</div>
		</>
	);
}
export default NoEarlierCoverLetter;
