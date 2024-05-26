import React, { useState } from "react";
import { Link } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";

import Modal from "../Modal";

const HeaderOtherPages = () => {
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu(!menu);
  }
  return (
    <header className="flex justify-between w-full h-24 items-start">
      <div className="w-full">
        <svg
          viewBox="0 0 360 108"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="-top-4 absolute md:-top-12 ls:-top-28 lg:-top-44 xl:-top-64 xxl:-top-96"
        >
          <g filter="url(#filter0_d_1273_1292)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M208.773 70.8864C233.46 66.2583 258.683 65.1877 283.674 67.7072L328.462 72.2227L350.206 75.0001H376V-11.9999H355.74L338.339 -14.2226L292.401 -18.854C259.149 -22.2063 225.59 -20.7819 192.742 -14.624L173.105 -10.9427C117.714 -0.558667 60.8905 -0.403079 5.4437 -10.4836C-0.105408 -11.4925 -5.73404 -11.9999 -11.3741 -11.9999H-12V75.0001H-11.3741C-10.9529 75.0001 -10.5326 75.038 -10.1183 75.1133C55.7764 87.0933 123.308 86.9084 189.136 74.5677L208.773 70.8864Z"
              fill="url(#paint0_linear_1273_1292)"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_1273_1292"
              x="-32"
              y="-36.6204"
              width="428"
              height="144.583"
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
              <feOffset dy="4" />
              <feGaussianBlur stdDeviation="10" />
              <feComposite in2="hardAlpha" operator="out" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.05 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_1273_1292"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_1273_1292"
                result="shape"
              />
            </filter>
            <linearGradient
              id="paint0_linear_1273_1292"
              x1="324.031"
              y1="-20.6204"
              x2="290.964"
              y2="136.714"
              gradientUnits="userSpaceOnUse"
            >
              <stop offset="0.145906" stopColor="#A78BFA" />
              <stop offset="1" stopColor="#0EA5E9" />
            </linearGradient>
          </defs>
        </svg>

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
