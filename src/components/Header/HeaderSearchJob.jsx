import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import Modal from "../Modal";

const HeaderSearchJob = () => {
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu(!menu);
  }

  return (
    <header className="flex justify-between w-full  h-[65px] py-2 items-center flex-col relative bg-white mb-12">
      <div className="w-full relative">
        <nav className="flex justify-between w-full items-center">
          <div className="   p-2 ">
            <h1 className="text-xl font-Glockenspiel">EMPLOJD</h1>
          </div>
          <div className="flex items-center cursor-pointer pr-5">
            <RxHamburgerMenu size={46} onClick={handleMenu} />
            {menu && <Modal onClose={setMenu} menu={menu} />}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1440 100"
            className="absolute bottom-[-30px] rotate-180 w-full sm:bottom-[-50px] md:bottom-[-70px] lg:md:bottom-[-100px]"
          >
            <path
              fill="#fff"
              fillOpacity="1"
              d="M0,80L80,72C160,64,320,48,480,48C640,48,800,64,960,72C1120,80,1280,80,1360,80L1440,80L1440,160L1360,160C1280,160,1120,160,960,160C800,160,640,160,480,160C320,160,160,160,80,160L0,160Z"
            ></path>
          </svg>
        </nav>
      </div>
    </header>
  );
};

export default HeaderSearchJob;
