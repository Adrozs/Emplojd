export default function Footer() {
	return (
		<>
			<div className="bg-stone-400">
				<h2>LOGO</h2>
				<h3>TEXT</h3>
				<p>Min sida</p>
				<p>Sök jobb</p>
				<h2>Följ oss på sociala medier</h2>
				<button className="p-5 px-6 pt-2 baseline">
					<LiaKissWinkHeartSolid size="2rem" />
				</button>
				<button className="p-5 px-6 pt-2 baseline">
					<LiaKissWinkHeartSolid size="2rem" />
				</button>
				<button className="p-5 px-6 pt-2 baseline">
					<LiaKissWinkHeartSolid size="2rem" />
				</button>
				<h3>Ladda ner vår app</h3>
				<div className="flex justify-center md:justify-center">
					<Link to="/signin" className="p-3 px-40 font-bold bg-stone-300">
						CTA?
					</Link>
				</div>
				<div className="flex justify-center md:justify-center">
					<Link to="/signin" className="p-3 px-40 font-bold bg-stone-300">
						CTA?
					</Link>
				</div>
				<p>Copyright bla bla bla</p>
			</div>
			;
		</>
	);
}
