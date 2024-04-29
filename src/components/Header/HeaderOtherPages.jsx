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
    <header className="flex justify-between w-full  h-[65px] py-2 items-center">
      <nav className="flex justify-between w-full items-center">
        <div className="p-2">
          <Link to="/">
            <h1 className="text-xl font-Glockenspiel cursor-pointer">
              EMPLOJD
            </h1>
          </Link>
        </div>
        <div className="flex items-center cursor-pointer pr-5">
          <RxHamburgerMenu size={46} onClick={handleMenu} />
          {menu && <Modal onClose={setMenu} menu={menu} />}
        </div>
      </nav>
    </header>
  );
};

export default HeaderOtherPages;
