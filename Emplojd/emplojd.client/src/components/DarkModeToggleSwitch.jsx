import React, { useState, useEffect } from "react";
import {
  GradientGearSVG,
  GradientMoonSVG,
  GrayGearSVG,
  GrayMoonSVG,
} from "./Icons/MenySvg";

const DarkModeToggleSwitch = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const displayMode = localStorage.getItem("theme");
    return displayMode === "dark";
  });

  useEffect(() => {
    const html = document.documentElement;
    if (isDarkMode) {
      html.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      html.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleSwitch = () => {
    setIsDarkMode(!isDarkMode);
  };
  return (
    <div className="flex justify-center items-center space-x-4">
      <span className="text-2xl">
        {isDarkMode ? <GrayGearSVG /> : <GradientGearSVG />}
      </span>
      <div
        onClick={toggleSwitch}
        className={`relative inline-block w-16 h-8 rounded-full cursor-pointer transition-colors duration-300 ${
          isDarkMode ? "bg-sky-800" : "bg-sky-500"
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
