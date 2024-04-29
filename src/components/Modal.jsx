import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { BsFillSuitcaseLgFill } from "react-icons/bs";
import { FaUser } from "react-icons/fa";
import { IoDocumentText, IoClose } from "react-icons/io5";
import { FaHeart } from "react-icons/fa6";
import { TbMailStar, TbLogin2 } from "react-icons/tb";
function Modal({ onClose, menu }) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
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
        <nav className="fixed z-10 inset-0 overflow-y-auto bg-opacity-75 flex justify-end items-start">
          <div className="bg-white max-w-lg w-[20rem] h-[25rem] z-1 modal-content ">
            <div className="p-4 flex flex-col text-stone-300 h-[100%]">
              <button onClick={() => onClose(!menu)} className="self-end">
                <IoClose size={46} />
              </button>
              <div className="flex-[75%]">
                <NavItem>
                  <BsFillSuitcaseLgFill size={30} />{" "}
                  <span className="text-stone-700 font-semibold">
                    HITTA JOBB
                  </span>
                </NavItem>
                <NavItem>
                  <FaUser size={30} />
                  <span className="text-stone-700 font-semibold">
                    MIN PROFIL
                  </span>
                </NavItem>
                <div className="flex flex-col items-end">
                  <div className="flex flex-col">
                    <NavItem className="self-end">
                      <IoDocumentText size={30} />
                      <span className="text-stone-700 font-semibold">
                        MINA ANSÖKNINGAR
                      </span>
                    </NavItem>
                    <NavItem>
                      <FaHeart size={30} />
                      <span className="text-stone-700 font-semibold">
                        MINA SPARADE JOBB
                      </span>
                    </NavItem>
                    <NavItem>
                      <TbMailStar size={30} />
                      <span className="text-stone-700 font-semibold">
                        PERSONLIGA BREV
                      </span>
                    </NavItem>
                  </div>
                </div>
              </div>
              <div className="justify-end">
                {isLoggedIn && (
                  <button
                    onClick={handleSignOut}
                    className="flex items-end gap-4 text-lg"
                  >
                    {" "}
                    <TbLogin2 size={30} />
                    <span className="text-stone-700 font-semibold">
                      {" "}
                      Log out
                    </span>
                  </button>
                )}
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
