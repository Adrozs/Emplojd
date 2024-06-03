import React from "react";
import { FaPlus } from "react-icons/fa6";

const AddNewButton = ({ disabled }) => {
  return (
    <button
      type="submit"
      className={`flex-grow font-bold w-full h-14 rounded-xl text-lg mb-2 flex px-8 items-center mt-2 ${
        disabled
          ? "text-gray-300 dark:text-gray-600 border-gray-300 border-2 dark:border-gray-600 cursor-not-allowed"
          : " bg-sky-500 text-white dark:bg-indigo-600 dark:text-white"
      }`}
      disabled={disabled}
    >
      <div className="flex justify-between w-full">
        <h2>Spara och lägg till ny</h2>
        <FaPlus className="font-bold text-2xl" />
      </div>
    </button>
  );
};

export default AddNewButton;
