import React, { useState, useEffect } from 'react';
import AccountForm from './AccountForm';

function ListForm({
	wordBgColor = 'bg-purple-100',
	name = 'name',
	labelBgColor = 'transparent',
	onChange,
	value = [],
}) {
	const [words, setWords] = useState(value);
	const [inputValue, setInputValue] = useState('');
	const [inputState, setInputState] = useState({
		isTouched: false,
		isValid: false,
	});
	const [error, setError] = useState('');

	useEffect(() => {
		setWords(value);
	}, [value]);

	useEffect(() => {
		if (words.length > 5) {
			setInputState({
				isTouched: true,
				isValid: false,
			});
			setError('Max antal ord: 5st.');
		} else {
			setInputState((prevState) => ({
				...prevState,
				isValid: true,
			}));
			setError('');
		}
	}, [words]);

	const handleChange = (e) => {
		setInputValue(e.target.value);
		setInputState({ ...inputState, isTouched: false });
	};

	const handleSubmit = () => {
		if (inputValue.trim() !== '') {
			const newWords = [...words, inputValue];
			setWords(newWords);
			setInputValue('');
			setInputState({
				isTouched: true,
				isValid: true,
			});
			if (newWords.length > 5) {
				setError('Max antal ord: 5st.');
			} else {
				setError('');
			}
			if (onChange) onChange(newWords);
		}
	};

	const handleRemoveWord = (index) => {
		const newWords = words.filter((_, i) => i !== index);
		setWords(newWords);
		if (newWords.length <= 5) {
			setError('');
		}
		if (onChange) onChange(newWords);
	};

	return (
		<form onSubmit={(e) => e.preventDefault()} className="mb-4">
			<AccountForm
				type="text"
				name={name}
				value={inputValue}
				handleChange={handleChange}
				handleSubmit={handleSubmit}
				placeholder="Lägg till ord med ENTER"
				showIcons={false}
				inputState={inputState}
				error={error}
				words={words}
				handleRemoveWord={handleRemoveWord}
				wordTextColor="text-blue-700"
				wordBgColor={wordBgColor}
				errorTextColor="text-red-700"
				errorBgColor="bg-red-200"
				labelBgColor={labelBgColor}
			/>
		</form>
	);
}

export default ListForm;
