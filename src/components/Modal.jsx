import React, { useEffect } from "react";

function Modal({ onClose, menu }) {
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
        <div className="fixed z-10 inset-0 overflow-y-auto bg-opacity-75 flex justify-end items-start">
          <div className="bg-stone-300  w-[30%] h-[40%] z-1 modal-content mt-12">
            <ul className="p-4 flex flex-col">
              <button>X</button>
              <li>Meny</li>
              <li>Meny</li>
              <li>Meny</li>
              <li>Meny</li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
