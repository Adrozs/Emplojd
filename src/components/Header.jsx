import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import Modal from "./Modal";
const Header = () => {
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu(!menu);
  }
  return (
    <header className="flex justify-between w-full px-6 h-[65px] p-2 items-center">
      <nav className="flex justify-between w-full items-center">
        <div className="   p-2 px-5">
          <h1 className="text-xl font-Glockenspiel">EMPLOJD</h1>
        </div>
        <div className="flex items-center ">
          <RxHamburgerMenu size={46} onClick={handleMenu} />
          {menu && <Modal onClose={setMenu} menu={menu} />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
