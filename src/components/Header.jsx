import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { RxHamburgerMenu } from "react-icons/rx";

import Modal from "./Modal";
const Header = () => {
  const [menu, setMenu] = useState(false);

  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate("/signin");
    console.log("User signed out.");
  };

  function handleMenu() {
    setMenu(!menu);
  }
  return (
    <header className="flex justify-between w-full px-6 h-[50px] p-2 items-center">
      <nav className="flex justify-between w-full">
        <div className=" bg-stone-300  p-2 px-5">
          <h1>LOGO</h1>
        </div>
        <div className="flex items-center ">
          <RxHamburgerMenu size={30} onClick={handleMenu} />
          {menu && <Modal onClose={setMenu} menu={menu} />}
          {isLoggedIn && (
            <button className="" onClick={handleSignOut}>
              Sign Out
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
