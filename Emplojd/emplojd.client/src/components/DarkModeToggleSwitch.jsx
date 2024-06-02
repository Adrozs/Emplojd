import React from "react";
import {
  GradientGearSVG,
  GradientMoonSVG,
  GrayGearSVG,
  GrayMoonSVG,
} from "./Icons/MenySvg";
import { useDarkMode } from "./Icons/DarkModeHook";

const DarkModeToggleSwitch = () => {
  const { isDarkMode, setIsDarkMode } = useDarkMode();

  const toggleSwitch = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <div className="flex justify-center items-center space-x-4">
      <span className="text-2xl">
        {isDarkMode ? <GrayGearSVG /> : <GradientGearSVG />}
      </span>
      <div
        onClick={toggleSwitch}
        className={`relative inline-block w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
          isDarkMode
            ? "bg-dark-gradient-to-140-purple-slate"
            : "bg-gradient-to-140-sky-violet"
        }`}
      >
        <div
          className={`absolute w-8 h-8 bg-white rounded-full shadow-md transform transition-transform duration-300 ${
            isDarkMode ? "translate-x-8" : ""
          }`}
        />
      </div>
      <span className="text-2xl">
        {isDarkMode ? <GradientMoonSVG /> : <GrayMoonSVG />}
      </span>
    </div>
  );
};

export default DarkModeToggleSwitch;
