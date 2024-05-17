import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import Modal from "../Modal";
import { Link } from "react-router-dom";

const HeaderSearchJob = ({ children }) => {
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu(!menu);
  }

  return (
    <header className="flex justify-between w-full  h-[65px] py-2 items-center flex-col relative  mb-12 lg:mb-[96px]">
      <div className="w-full relative">
        <nav className="flex justify-between w-full items-center ">
          <div className=" p-2 text-white">
            <Link to="/">{children}</Link>
          </div>
          <div className="flex items-center cursor-pointer pr-5 text-white">
            <RxHamburgerMenu size={46} onClick={handleMenu} />
            {menu && <Modal onClose={setMenu} menu={menu} />}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderSearchJob;
