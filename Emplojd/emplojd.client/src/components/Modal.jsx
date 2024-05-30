import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  SearchSVG,
  ProfileSVG,
  HeartSVG,
  LetterSVG,
  LogInSVG,
  LogOutSVG,
  CancelSVG,
  MyCvSVG,
} from "./Icons/MenySvg";
import { removeUserFromLocalStorage } from "../utils/localStorage";
import DarkModeToggleSwitch from "./DarkModeToggleSwitch";

function Modal({ onClose, menu }) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    removeUserFromLocalStorage();
    logout();
    navigate("/signin");
    console.log("User signed out.");
  };

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    function handleClickOutside(event) {
      const modalContent = document.querySelector(".modal-content");
      if (menu && modalContent && !modalContent.contains(event.target)) {
        onClose();
      }
    }

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose, menu]);

  return (
    <>
      {menu && (
        <nav className="fixed z-40 inset-0 overflow-y-auto bg-opacity-75 flex justify-end items-start">
          <div className="bg-gray-100 max-w-lg w-[15rem] h-[30rem] z-1 modal-content drop-shadow-xl rounded-b-xl rounded-tl-xl dark:bg-customDarkBg">
            <div className="p-5 flex flex-col h-[100%] text-gray-300 justify-between">
              <div className="flex justify-between">
                {isLoggedIn ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-end gap-4 text-gray-700 dark:text-white"
                  >
                    {" "}
                    <LogOutSVG />
                    <span> Logga ut</span>
                  </button>
                ) : (
                  <button className="flex items-center gap-4 text-gray-700 dark:text-white">
                    {" "}
                    <LogInSVG />
                    <Link to="/signin">
                      <span> Logga in</span>
                    </Link>
                  </button>
                )}
                <button onClick={() => onClose(!menu)} className="self-end">
                  <CancelSVG className="bg-white bg-clip-border"/>
                </button>
              </div>
              <div className="flex flex-col  mx-auto">
                <NavItem>
                  <SearchSVG />{" "}
                  <Link to="/joblist">
                    <span className="text-gray-700 font-medium dark:text-white">Sök Jobb</span>
                  </Link>
                </NavItem>
                <NavItem>
                  <ProfileSVG />
                  <Link to="/MyProfile">
                    <span className="text-gray-700 font-medium dark:text-white">Min Profil</span>
                  </Link>
                </NavItem>
                <div className="flex flex-col">
                  <NavItem>
                    <HeartSVG />
                    {isLoggedIn ? (
                      <Link to="/saved">
                        <span className="text-gray-700 font-medium dark:text-white">
                          Sparade jobb
                        </span>
                      </Link>
                    ) : (
                      <span className="text-gray-400 font-medium ">
                        Sparade jobb
                      </span>
                    )}
                  </NavItem>
                  <NavItem>
                    <LetterSVG />
                    {isLoggedIn ? (
                      <Link to="/NoEarlierCoverLetter">
                        <span className="text-gray-700 font-medium dark:text-white">
                          Sparade brev
                        </span>
                      </Link>
                    ) : (
                      <span className="text-gray-400 font-medium">
                        Sparade brev
                      </span>
                    )}
                  </NavItem>
                  <NavItem>
                    <MyCvSVG />
                    {isLoggedIn ? (
                      <Link to="/NoEarlierCoverLetter">
                        <span className="text-gray-700 font-medium dark:text-white">Mitt CV</span>
                      </Link>
                    ) : (
                      <span className="text-gray-400 font-medium">Mitt CV</span>
                    )}
                  </NavItem>
                </div>
              </div>
              <div className="flex flex-col gap-6">
                <div className="font-Glockenspiel text-gray-700 text-2xl text-center dark:text-white">
                  EMPLOJD
                </div>
                <DarkModeToggleSwitch />
              </div>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

function NavItem({ children }) {
  return (
    <div className="flex items-center gap-4 flex-grow mt-4 text-lg">
      {children}
    </div>
  );
}

export default Modal;
