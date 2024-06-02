import React, { useState } from "react";
import ReactDatePicker from "react-datepicker";
import { FaCalendarDays } from "react-icons/fa6";

const DatePick = ({ name, labelText, disabled = false }) => {
  const [startdate, setStartDate] = useState(new Date());
  const [enddate, setEndDate] = useState(new Date());

  const inputClassName = () => {
    let baseClass = "w-full rounded-xl border-2 outline-sky-800 px-4 py-2 dark:bg-slate-700";
    if (disabled) {
      return baseClass + " border-gray-300 dark:border-gray-600 bg-transparent dark:bg-transparent cursor-not-allowed";
    } else {
      return baseClass + " flex-grow hover:border-gray-400";
    }
  };
  return (
    <>
      {" "}
      <label
        htmlFor={name}
        className={`text-lg mb-2 font-semibold px-2 inline-block py-1 rounded-lg  ${
          disabled ? "text-gray-300 dark:text-gray-600" : "text-black dark:text-white"
        }`}
      >
        {" "}
        {labelText}
      </label>
      <div className="flex justify-between pb-4">
        <div className="relative flex items-center text-gray-400 w-full max-w-xs">
          <ReactDatePicker
            id={name}
            name={name}
            selected={startdate}
            onChange={(date) => setStartDate(date)}
            className={inputClassName()}
            disabled={disabled}
            popperPlacement="top-end"
          />
          <FaCalendarDays className="absolute right-4 text-gray-400" />
        </div>

        <div className="relative flex items-center text-gray-400 w-full max-w-xs ml-4">
          <ReactDatePicker
            selected={enddate}
            onChange={(date) => setEndDate(date)}
            className={inputClassName()}
            disabled={disabled}
            popperPlacement="top-end"
          />
          <FaCalendarDays className="absolute right-4 text-gray-400" />
        </div>
      </div>
    </>
  );
};

export default DatePick;
