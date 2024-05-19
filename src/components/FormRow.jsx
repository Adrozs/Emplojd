import React, { useState } from "react";
import { CheckBoxSVG, ErrorBox, TypingSVG } from "./Icons/FormRowSvg";

function FormRow({
  type,
  name,
  value,
  handleChange,
  labelText,
  placeholder,
  compareValue,
}) {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [matchError, setMatchError] = useState("");
  const [validationError, setValidationError] = useState("");

const validateInput = (value) => {
  if (type === "email") {
    const valid = /\S+@\S+\.\S+/.test(value);
    return valid ? "" : "Ogiltig e-postadress.";
  } else if (type === "password") {
    const valid =
      /[A-Z]/.test(value) &&
      /[a-z]/.test(value) &&
      /\d/.test(value) &&
      /[!@#$%^&*(),.?":{}|<>]/.test(value) &&
      value.length >= 8;
    return valid ? "" : "Lösenordet behöver: >8, A-Z, a-z, 0-9, #@$!.";
  }
  return "";
};

const handleInputChange = (e) => {
  const newValue = e.target.value;
  setIsValid(validateInput(newValue) === "");
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
  const errorMessage = validateInput(value);
  setValidationError(errorMessage);
  const currentIsValid = errorMessage === "";
  setIsValid(currentIsValid);

  if (
    (name === "emailConfirmed" &&
      compareValue.toLowerCase() !== value.toLowerCase()) ||
    (name === "passwordConfirmed" && compareValue !== value)
  ) {
    setIsValid(false);
    setMatchError(
      name === "emailConfirmed"
        ? "E-postadressen du angav stämmer inte överens."
        : "Lösenorden du angav stämmer inte överens."
    );
  } else {
    setMatchError("");
  }
};


  const inputClassName = () => {
    if (!isTouched) {
      return "px-4 py-2 text-black rounded-xl bg-[#F0F0F0] border-2 flex-grow outline-sky-800 hover:border-gray-400";
    } else if (isValid) {
      return "px-4 py-2 text-black rounded-xl bg-[#F0F0F0] border-sky-800 border-2 flex-grow outline-sky-800";
    } else {
      return "px-4 py-2 text-black rounded-xl bg-[#F0F0F0] border-red-400 border-2 flex-grow outline-sky-800";
    }
  };

  return (
    <div className="flex flex-col pb-6">
      <label
        htmlFor={name}
        className="text-lg mb-2 font-semibold px-2"
      >
        {labelText || name}
      </label>
      <div className="relative flex items-center text-gray-400">
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
        />
        {isTouched && !isValid ? (
          <ErrorBox />
        ) : isTouched && isValid ? (
          <CheckBoxSVG />
        ) : (
          <TypingSVG isTyping={isTyping} />
        )}
      </div>
      {(matchError || validationError) && (
        <div className="text-red-400 text-sm mt-1 pl-2">
          &bull; {matchError || validationError}
        </div>
      )}
    </div>
  );
}

export default FormRow;