import React, { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import { useDarkMode } from "../components/Icons/DarkModeHook";

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
  wordTextColor = "text-gray-800",
  wordBgColor = "bg-purple-100",
  errorBgColor = "bg-red-200",
  labelBgColor = "bg-purple-100",
}) {
  const [isTouched, setIsTouched] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const { isDarkMode } = useDarkMode();

  useEffect(() => {
    if (inputState) {
      setIsTouched(inputState.isTouched);
      setIsValid(inputState.isValid);
    }
  }, [inputState]);

  useEffect(() => {
    if (words.length > 0) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [words]);

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    handleChange(e);
    if (!isTyping) {
      setIsTyping(true);
      setIsTouched(true);
    }
    if (isTouched && !newValue) {
      setIsTouched(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
    setIsTouched(false);
  };

  const handleBlur = () => {
    setIsFocused(false);
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
      return `px-2 pt-4 rounded-xl border-2 flex-grow bg-white dark:bg-slate-700 dark:text-white ${
        isFocused
          ? "border-sky-800 dark:border-gray-400"
          : "hover:border-gray-400 dark:border-slate-500"
      }`;
    } else if (isValid) {
      return "px-2 pt-4 rounded-xl border-sky-800 border-2 bg-white flex-grow dark:border-emerald-600 dark:bg-slate-700 ";
    } else {
      return "px-2 pt-4 rounded-xl border-red-400 border-2 bg-white flex-grow dark:border-red-600 dark:bg-slate-700 ";
    }
  };

  return (
    <div>
      <label
        htmlFor={name}
        className={`inline-block mb-2 font-semibold px-2 py-1 rounded-lg ${labelBgColor}`}
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
              onFocus={handleFocus}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              onClick={() => {
                setIsTyping(true);
                setIsTouched(false);
              }}
              placeholder={placeholder}
              className="appearance-none border-none w-full text-gray-700 px-2 leading-tight focus:outline-none dark:bg-slate-700 dark:text-white"
            />
            <button
              type="button"
              onClick={handleSubmit}
              className={`relative text-sm rounded -top-[6px] p-2 h-2 ${
                !isValid && isTouched
                  ? isDarkMode
                    ? "text-red-600"
                    : "text-red-400"
                  : isValid && isTouched
                  ? isDarkMode
                    ? "text-emerald-600"
                    : "text-sky-800"
                  : isDarkMode
                  ? "text-gray-600"
                  : "text-gray-400"
              }`}
            >
              <FaPlus
                fill={
                  isDarkMode && isTyping  ? "#9ca3af" : isTyping ? "#075985" : "currentColor"
                }
              />
            </button>
          </div>
          <div className="flex flex-wrap gap-2 bg-white m-2 dark:bg-slate-700">
            {words.map((word, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index >= 5 ? errorBgColor : wordBgColor
                } rounded-lg px-3 py-1`}
              >
                <button
                  onClick={() => handleRemoveWord(index)}
                  className={`flex items-center ${wordTextColor} hover:text-purple-700`}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="8 8 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="fill-black dark:fill-white"
                  >
                    <path
                      d="M16 9.5C17.7239 9.5 19.3772 10.1848 20.5962 11.4038C21.8152 12.6228 22.5 14.2761 22.5 16C22.5 17.7239 21.8152 19.3772 20.5962 20.5962C19.3772 21.8152 17.7239 22.5 16 22.5C14.2761 22.5 12.6228 21.8152 11.4038 20.5962C10.1848 19.3772 9.5 17.7239 9.5 16C9.5 14.2761 10.1848 12.6228 11.4038 11.4038C12.6228 10.1848 14.2761 9.5 16 9.5ZM16 24C18.1217 24 20.1566 23.1571 21.6569 21.6569C23.1571 20.1566 24 18.1217 24 16C24 13.8783 23.1571 11.8434 21.6569 10.3431C20.1566 8.84285 18.1217 8 16 8C13.8783 8 11.8434 8.84285 10.3431 10.3431C8.84285 11.8434 8 13.8783 8 16C8 18.1217 8.84285 20.1566 10.3431 21.6569C11.8434 23.1571 13.8783 24 16 24ZM13.4688 13.4688C13.175 13.7625 13.175 14.2375 13.4688 14.5281L14.9375 15.9969L13.4688 17.4656C13.175 17.7594 13.175 18.2344 13.4688 18.525C13.7625 18.8156 14.2375 18.8187 14.5281 18.525L15.9969 17.0562L17.4656 18.525C17.7594 18.8187 18.2344 18.8187 18.525 18.525C18.8156 18.2312 18.8187 17.7562 18.525 17.4656L17.0562 15.9969L18.525 14.5281C18.8187 14.2344 18.8187 13.7594 18.525 13.4688C18.2312 13.1781 17.7562 13.175 17.4656 13.4688L15.9969 14.9375L14.5281 13.4688C14.2344 13.175 13.7594 13.175 13.4688 13.4688Z"
                    />
                  </svg>
                </button>
                <span className="ml-1">{word}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccountForm;
