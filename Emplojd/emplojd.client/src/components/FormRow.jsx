import React, { useState } from 'react';
import { CheckBoxSVG, ErrorBox, TypingSVG } from './Icons/FormRowSvg';

function FormRow({
	type,
	name,
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
		setIsValid(validateInput(newValue) === '');
		handleChange(e);
		if (!isTyping) {
			setIsTyping(true);
		}
		if (isTouched && !newValue) {
			setIsTouched(false);
		}
	};

	const handleBlur = () => {
		setIsTouched(true);
		setIsTyping(false);
		setIsFocused(false);
		const errorMessage = validateInput(value);
		setValidationError(errorMessage);
		const currentIsValid = errorMessage === '';
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
			'px-4 py-2 text-black rounded-xl border-2 flex-grow outline-sky-800 dark:bg-slate-700 dark:text-white';
		if (disabled) {
			return baseClass + ' border-gray-300 bg-gray-100 cursor-not-allowed';
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
		<div className="pb-6">
			<label
				htmlFor={name}
				className={`text-lg mb-2 font-semibold px-2 inline-block py-1 rounded-lg ${labelBgColor}`}
			>
				{labelText || name}
			</label>
			<div className="relative flex items-center text-gray-400 dark:text-white">
				{type === 'textarea' ? (
					<textarea
						id={name}
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
					<input
						type={type}
						id={name}
						name={name}
						value={value}
						onChange={handleInputChange}
						onBlur={handleBlur}
						onClick={() => {
							setIsTyping(true);
							setIsTouched(false);
						}}
						placeholder={placeholder}
						className={inputClassName()}
						disabled={disabled}
					/>
				)}
				{disabled ? (
					<TypingSVG isTyping={false} />
				) : isTouched && !isValid ? (
					<ErrorBox />
				) : isTouched && isValid ? (
					<CheckBoxSVG />
				) : (
					<TypingSVG isTyping={isTyping} />
				)}
			</div>
			{(matchError || validationError) && (
				<div className="text-red-400 dark:text-red-500 text-sm mt-1 pl-2">
					&bull; {matchError || validationError}
				</div>
			)}
		</div>
	);
}

export default FormRow;
