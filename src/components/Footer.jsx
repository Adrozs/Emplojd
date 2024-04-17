import { AiFillTwitterCircle } from 'react-icons/ai';
import { FaFacebook } from 'react-icons/fa';
import { FaInstagramSquare } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Footer() {
	return (
		<>
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
							<AiFillTwitterCircle size="2.5rem" />
						</button>
						<button className="p-5 px-6 pt-2 baseline">
							<FaInstagramSquare size="2.5rem" />
						</button>
						<button className="p-5 px-6 pt-2 baseline">
							<FaFacebook size="2.5rem" />
						</button>
					</div>
					<h3 className="flex justify-center text-xl font-bold mb-7 mt-4">
						Ladda ner vår app
					</h3>
					<div className="flex justify-center justify-evenly ">
						<div className="ml-5">
							<Link to="/signin" className="p-3 px-6 font-bold bg-stone-300">
								App Store
							</Link>
						</div>
						<div>
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
