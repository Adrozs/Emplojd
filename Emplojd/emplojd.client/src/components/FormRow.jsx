import React, { useState } from 'react';
import { CheckBoxSVG, ErrorBox, TypingSVG } from './Icons/FormRowSvg';

function FormRow({
	type,
	name,
	id,
	value,
	handleChange,
	labelText,
	placeholder,
	compareValue,
	labelBgColor = 'transparent',
	disabled = false,
	maxLength,
	rows,
}) {
	const [isTouched, setIsTouched] = useState(false);
	const [isValid, setIsValid] = useState(false);
	const [isTyping, setIsTyping] = useState(false);
	const [matchError, setMatchError] = useState('');
	const [validationError, setValidationError] = useState('');
	const [isFocused, setIsFocused] = useState(false);

	const validateInput = (value) => {
		if (value === '') {
			return '';
		}
		if (type === 'email') {
			const valid = /\S+@\S+\.\S+/.test(value);
			return valid ? '' : 'Ogiltig e-postadress.';
		} else if (type === 'password') {
			const valid =
				/[A-Z]/.test(value) &&
				/[a-z]/.test(value) &&
				/\d/.test(value) &&
				/[!@#$%^&*(),.?":{}|<>]/.test(value) &&
				value.length >= 8;
			return valid ? '' : 'Lösenordet behöver: >8, A-Z, a-z, 0-9, #@$!.';
		}
		return '';
	};

	const handleInputChange = (e) => {
		const newValue = e.target.value;
		handleChange(e);
		setIsTyping(true);
	};

	const handleBlur = () => {
		setIsTyping(false);
		setIsFocused(false);
		setIsTouched(true);
		const errorMessage = validateInput(value);
		setValidationError(errorMessage);
		const currentIsValid = errorMessage === '' && value !== '';
		setIsValid(currentIsValid);

		if (
			(name === 'emailConfirmed' &&
				compareValue.toLowerCase() !== value.toLowerCase()) ||
			(name === 'passwordConfirmed' && compareValue !== value)
		) {
			setIsValid(false);
			setMatchError(
				name === 'emailConfirmed'
					? 'E-postadressen du angav stämmer inte överens.'
					: 'Lösenorden du angav stämmer inte överens.'
			);
		} else {
			setMatchError('');
		}
	};

	const inputClassName = () => {
		let baseClass =
			'px-4 py-2 text-black rounded-xl border-2 flex-grow outline-sky-800 dark:bg-slate-700 dark:text-white flex-grow pr-10';
		if (disabled) {
			return (
				baseClass +
				' border-gray-300 bg-transparent dark:bg-transparent dark:border-gray-600 cursor-not-allowed'
			);
		}
		if (value === '') {
			return baseClass + ' border-gray-300';
		}
		if (!isTouched) {
			return baseClass + ' hover:border-gray-400 dark:border-slate-500';
		} else if (isValid) {
			return baseClass + ' border-sky-800 dark:border-emerald-600';
		} else {
			return baseClass + ' border-red-400 dark:border-red-600';
		}
	};
	const textAreaClassName = (rows) => {
		return `${inputClassName()} ${isFocused ? `rows-${rows}` : ''}`;
	};

	return (
		<div>
			<label
				htmlFor={name}
				className={`text-lg mb-2 font-semibold px-2 inline-block py-1 rounded-lg ${labelBgColor} ${
					disabled
						? 'text-gray-300 dark:text-gray-600'
						: 'text-black dark:text-white'
				}`}
			>
				{labelText || name}
			</label>
			<div className="relative flex items-center text-gray-400 dark:text-white">
				{type === 'textarea' ? (
					<textarea
						id={id}
						name={name}
						value={value}
						onChange={handleInputChange}
						onBlur={handleBlur}
						onClick={() => {
							setIsTyping(true);
							setIsTouched(false);
						}}
						onFocus={() => setIsFocused(true)}
						placeholder={placeholder}
						className={textAreaClassName(rows)}
						disabled={disabled}
						rows={isFocused ? rows : 1}
						maxLength={maxLength}
					/>
				) : (
					<div className="flex relative w-full items-center">
						<input
							type={type}
							id={id}
							name={name}
							value={value}
							onChange={handleInputChange}
							onBlur={handleBlur}
							onFocus={() => setIsFocused(true)}
							placeholder={placeholder}
							className={inputClassName()}
							disabled={disabled}
							style={{ paddingRight: '3rem' }}
						/>
						{disabled ? (
							<TypingSVG isTyping={false} />
						) : value === '' ? (
							<TypingSVG isTyping={false} />
						) : !isFocused && isTouched && !isValid ? (
							<ErrorBox />
						) : isTouched && isValid ? (
							<CheckBoxSVG />
						) : (
							<TypingSVG isTyping={isTyping} />
						)}
					</div>
				)}
			</div>
			{(matchError || validationError) && !isFocused && (
				<div className="text-red-400 dark:text-red-500 text-sm mt-1 pl-2">
					&bull; {matchError || validationError}
				</div>
			)}
		</div>
	);
}

export default FormRow;
