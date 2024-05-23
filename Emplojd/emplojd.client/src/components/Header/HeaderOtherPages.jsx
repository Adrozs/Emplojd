import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

import Modal from "../Modal";

const DynamicSVG = () => {
  const strokeWidth = `calc(100vh / 9)`;

  return (
    <svg viewBox="0 0 360 94" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_989_1081)">
        <path
          d="M377 12.0652L335.946 15.7609L288.291 20.7015C260.831 23.5485 233.091 21.9408 206.143 15.9407L183.37 10.8699C124.604 -2.2148 63.6725 -2.14683 4.93623 11.069V11.069C1.99347 11.7311 -1.01358 12.0652 -4.02991 12.0652H-6.00001"
          stroke="url(#paint0_linear_989_1081)"
          style={{ strokeWidth }}
        />
      </g>
      <defs>
        <filter
          id="filter0_d_989_1081"
          x="-22.2468"
          y="-78.3936"
          width="429.223"
          height="171.962"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dx="5" dy="-4" />
          <feGaussianBlur stdDeviation="10" />
          <feComposite in2="hardAlpha" operator="out" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_989_1081"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow_989_1081"
            result="shape"
          />
        </filter>
        <linearGradient
          id="paint0_linear_989_1081"
          x1="5.96877"
          y1="-9"
          x2="12.3505"
          y2="58.3957"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0.25" stopColor="#A78BFA" />
          <stop offset="1" stopColor="#0EA5E9" />
        </linearGradient>
      </defs>
    </svg>
  );
};

const HeaderOtherPages = () => {
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu(!menu);
  }
  return (
    <header className="flex justify-between w-full h-24 items-start">
      <div className="flex w-full">
        <DynamicSVG className="w-full h-full" />
        <div className="flex absolute w-full pt-2">
          <nav className="flex justify-between w-full items-center">
            <div className="p-2">
              <Link to="/">
                <h1 className="font-Glockenspiel text-2xl cursor-pointer text-white">
                  EMPLOJD
                </h1>
              </Link>
            </div>
            <div className="flex items-center cursor-pointer pr-5">
              <div className="text-white">
                <RxHamburgerMenu size={46} onClick={handleMenu} />
              </div>
              {menu && <Modal onClose={setMenu} menu={menu} />}
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default HeaderOtherPages;
