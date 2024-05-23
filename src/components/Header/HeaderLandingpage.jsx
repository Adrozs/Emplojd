import React, { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

import Modal from "../Modal";
import { Link } from "react-router-dom";
const Header = ({ children }) => {
  const [menu, setMenu] = useState(false);

  function handleMenu() {
    setMenu(!menu);
  }
  return (
    <header className="flex justify-between w-full  h-[65px] py-2 items-center">
      <nav className="flex justify-between w-full items-center">
        <div className="p-2">
          <Link to="/">{children}</Link>
        </div>
        <div className="flex items-center cursor-pointer pr-5">
          <div className="text-white">
            <RxHamburgerMenu size={46} onClick={handleMenu} />
          </div>
          {menu && <Modal onClose={setMenu} menu={menu} />}
        </div>
      </nav>
    </header>
  );
};

export default Header;
