import React from 'react';
import { FaPlus } from 'react-icons/fa6';

const AddNewButton = () => {
	return (
		<button className="flex-grow font-bold w-full h-14 rounded-xl text-sky-500 text-lg mb-2 flex px-8 items-center border-sky-500 border-2 mt-2">
			<div className="flex justify-between w-full">
				<h2>Lägg till ny</h2>
				<FaPlus className=" font-bold text-2xl" />
			</div>
		</button>
	);
};

export default AddNewButton;
