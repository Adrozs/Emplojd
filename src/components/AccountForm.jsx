import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";

function AccountForm({
  type,
  name,
  value,
  handleChange,
  handleSubmit,
  labelText,
  placeholder,
  inputState,
  error,
  words = [],
  handleRemoveWord,
}) {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [validationError, setValidationError] = useState("");

  useEffect(() => {
    if (inputState) {
      setIsTouched(inputState.isTouched);
      setIsValid(inputState.isValid);
    }
  }, [inputState]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
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
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSubmit();
    }
  };

  const inputClassName = () => {
    if (!isTouched) {
      return "px-4 py-2 text-gray-400 rounded-xl border-2 flex-grow bg-white outline-sky-800 hover:border-gray-400";
    } else if (isValid) {
      return "px-4 py-2 text-sky-800 rounded-xl border-sky-800 border-2 flex-grow bg-white outline-sky-800";
    } else {
      return "px-4 py-2 text-red-400 rounded-xl border-red-400 border-2 flex-grow bg-white outline-sky-800";
    }
  };

  return (
    <div className="flex flex-col pb-6 w-full">
      <label
        htmlFor={name}
        className="form-label text-lg mb-2 font-semibold px-2"
      >
        {labelText || name}
      </label>
      <div className="relative w-full">
        <div className={inputClassName()}>
          <div className="flex items-center p-2 gap-2">
            <input
              type={type}
              id={name}
              name={name}
              value={value}
              onChange={handleInputChange}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onClick={() => {
                setIsTyping(true);
                setIsTouched(false);
              }}
              placeholder={placeholder}
              className="appearance-none  border-none w-full text-gray-700 py-1 px-2 leading-tight focus:outline-none"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className="text-sm rounded p-2"
            >
              <FaPlus fill={isTyping ? "#075985" : "currentColor"} />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 bg-white mt-2">
            {words.map((word, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index >= 5
                    ? "bg-red-200 text-red-700"
                    : "bg-purple-100 text-purple-700"
                } rounded-lg px-3 py-1`}
              >
                <button
                  onClick={() => handleRemoveWord(index)}
                  className="flex items-center text-gray-700 hover:text-purple-700"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="8 8 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M16 9.5C17.7239 9.5 19.3772 10.1848 20.5962 11.4038C21.8152 12.6228 22.5 14.2761 22.5 16C22.5 17.7239 21.8152 19.3772 20.5962 20.5962C19.3772 21.8152 17.7239 22.5 16 22.5C14.2761 22.5 12.6228 21.8152 11.4038 20.5962C10.1848 19.3772 9.5 17.7239 9.5 16C9.5 14.2761 10.1848 12.6228 11.4038 11.4038C12.6228 10.1848 14.2761 9.5 16 9.5ZM16 24C18.1217 24 20.1566 23.1571 21.6569 21.6569C23.1571 20.1566 24 18.1217 24 16C24 13.8783 23.1571 11.8434 21.6569 10.3431C20.1566 8.84285 18.1217 8 16 8C13.8783 8 11.8434 8.84285 10.3431 10.3431C8.84285 11.8434 8 13.8783 8 16C8 18.1217 8.84285 20.1566 10.3431 21.6569C11.8434 23.1571 13.8783 24 16 24ZM13.4688 13.4688C13.175 13.7625 13.175 14.2375 13.4688 14.5281L14.9375 15.9969L13.4688 17.4656C13.175 17.7594 13.175 18.2344 13.4688 18.525C13.7625 18.8156 14.2375 18.8187 14.5281 18.525L15.9969 17.0562L17.4656 18.525C17.7594 18.8187 18.2344 18.8187 18.525 18.525C18.8156 18.2312 18.8187 17.7562 18.525 17.4656L17.0562 15.9969L18.525 14.5281C18.8187 14.2344 18.8187 13.7594 18.525 13.4688C18.2312 13.1781 17.7562 13.175 17.4656 13.4688L15.9969 14.9375L14.5281 13.4688C14.2344 13.175 13.7594 13.175 13.4688 13.4688Z"
                      fill="#374151"
                    />
                  </svg>
                </button>
                <span className="ml-1">{word}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {(validationError || error) && (
        <div className="text-red-400 text-sm mt-1 pl-2">
          &bull; {validationError || error}
        </div>
      )}
    </div>
  );
}

export default AccountForm;
