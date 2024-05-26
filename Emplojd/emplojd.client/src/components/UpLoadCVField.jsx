import { FaArrowUpFromBracket, FaCheck, FaRegTrashCan } from 'react-icons/fa6';
import { useState, useRef } from 'react';

export default function UpLoadCVField() {
	const [isExpanded, setIsExpanded] = useState(false);
	const [continueWithCV, setContinueWithCV] = useState(false);
	const [selectedFile, setSelectedFile] = useState(null);
	const [fileToContinueWith, setFileToContinueWith] = useState(null);

	const fileInput = useRef(null);

	const handleClick = () => {
		setIsExpanded(!isExpanded);
	};

	const handleFileButtonClick = () => {
		// Trigger the file input click event
		fileInput.current.click();
	};

	const handleFileChange = (event) => {
		// Update the selectedFile state with the name of the selected file
		setSelectedFile(event.target.files[0].name);
	};

	const handleTrashClick = () => {
		setSelectedFile(null);
	};

	const handleContinueWithCVClick = () => {
		setContinueWithCV(true);
		setFileToContinueWith(selectedFile);
	};

	return (
		<>
			<div
				className={`flex-col bg-gray-100 border-2 border-gray-700 rounded-lg p-5 justify-center items-center ${
					continueWithCV
						? 'h-22 w-auto'
						: isExpanded
						? 'h-48 w-auto bg-sky-800 text-gray-100'
						: 'h-22 w-auto'
				}`}
			>
				<div className="flex ">
					1. Ladda upp CV (valfritt){' '}
					{continueWithCV ? (
						<FaCheck className="ml-3 mt-1" />
					) : (
						<FaArrowUpFromBracket
							className="ml-3 mt-1 text-lg"
							onClick={handleClick}
						/>
					)}
				</div>

				{continueWithCV && (
					<div className="mt-2">Vald fil: {fileToContinueWith}</div>
				)}

				{isExpanded && !continueWithCV && (
					<div>
						<div className="mt-4 flex items-center">
							{selectedFile ? (
								<>
									<div>Du har valt filen:</div>
								</>
							) : (
								'Ingen fil är vald.'
							)}
						</div>

						{selectedFile && (
							<div className="flex mt-3 text-sm underline">
								{selectedFile}{' '}
								<FaRegTrashCan className="ml-3" onClick={handleTrashClick} />
							</div>
						)}

						{/* När denna knapp klickas, triggar den klickhändelsen på den dolda filinputen */}
						<button
							className="border-2 rounded-lg p-1 pl-3 pr-3 mt-4 bg-gray-100 text-black"
							onClick={handleFileButtonClick}
						>
							{selectedFile ? 'Ändra vald fil' : 'Välj fil'}
						</button>

						{selectedFile && (
							<button
								className="border-2 rounded-lg p-1 pl-3 pr-3 mt-4 bg-gray-100 text-black ml-3"
								onClick={handleContinueWithCVClick}
							>
								Fortsätt med CV
							</button>
						)}

						{/* Denna filinput är dold. När en fil väljs, uppdateras selectedFile state med filnamnet */}
						<input
							type="file"
							ref={fileInput}
							style={{ display: 'none' }}
							onChange={handleFileChange}
						/>

						{/* Om ingen fil har valts, visa "Fortsätt utan CV"-knappen */}
						{!selectedFile && (
							<button className="border-2 rounded-lg p-1 pl-6 pr-6 ml-6">
								Fortsätt utan CV
							</button>
						)}
					</div>
				)}
			</div>
		</>
	);
}
