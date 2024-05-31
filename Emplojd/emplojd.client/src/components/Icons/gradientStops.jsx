import React from "react";
import { useDarkMode } from "./DarkModeHook";

const GradientStops = () => {
  const { isDarkMode } = useDarkMode();
  return (
    <>
      <stop stopColor={isDarkMode ? "#A78BFA" : "#A78BFA"} offset="0" />
      <stop stopColor={isDarkMode ? "#5B21B6" : "#0EA5E9"} offset="1" />
    </>
  );
};

export default GradientStops;
