import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

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
          <div className="bg-gray-100 max-w-lg w-[15rem] h-[25rem] z-1 modal-content drop-shadow-xl rounded-b-xl rounded-tl-xl">
            <div className="p-5 flex flex-col h-[100%] text-gray-300 justify-between">
              <div className="flex flex-col mt-24">
                <NavItem>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M19.4996 9.74857C19.4996 11.8998 18.8013 13.887 17.6249 15.4993L23.5584 21.4375C24.1442 22.0233 24.1442 22.9748 23.5584 23.5606C22.9725 24.1465 22.0211 24.1465 21.4352 23.5606L15.5017 17.6224C13.8895 18.8035 11.9023 19.4971 9.75101 19.4971C4.36586 19.4971 0.00244141 15.1337 0.00244141 9.74857C0.00244141 4.36342 4.36586 0 9.75101 0C15.1362 0 19.4996 4.36342 19.4996 9.74857ZM9.75101 16.4976C10.6373 16.4976 11.5149 16.323 12.3337 15.9838C13.1526 15.6447 13.8966 15.1475 14.5233 14.5208C15.15 13.8941 15.6471 13.1501 15.9863 12.3313C16.3255 11.5125 16.5 10.6349 16.5 9.74857C16.5 8.86228 16.3255 7.98466 15.9863 7.16584C15.6471 6.34701 15.15 5.603 14.5233 4.9763C13.8966 4.3496 13.1526 3.85247 12.3337 3.5133C11.5149 3.17413 10.6373 2.99956 9.75101 2.99956C8.86472 2.99956 7.98711 3.17413 7.16828 3.5133C6.34945 3.85247 5.60545 4.3496 4.97874 4.9763C4.35204 5.603 3.85491 6.34701 3.51574 7.16584C3.17657 7.98466 3.002 8.86228 3.002 9.74857C3.002 10.6349 3.17657 11.5125 3.51574 12.3313C3.85491 13.1501 4.35204 13.8941 4.97874 14.5208C5.60545 15.1475 6.34945 15.6447 7.16828 15.9838C7.98711 16.323 8.86472 16.4976 9.75101 16.4976Z"
                      fill="url(#paint0_linear_874_7)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_874_7"
                        x1="12.0001"
                        y1="0"
                        x2="12.0001"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A78BFA" />
                        <stop offset="1" stop-color="#0EA5E9" />
                      </linearGradient>
                    </defs>
                  </svg>{" "}
                  <Link to="/joblist">
                    <span className="text-gray-700 font-bold">
                      Hitta Jobb
                    </span>
                  </Link>
                </NavItem>
                <NavItem>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M18.7031 18.0094C17.6672 16.2094 15.7219 15 13.5 15H10.5C8.27812 15 6.33281 16.2094 5.29688 18.0094C6.94688 19.8469 9.3375 21 12 21C14.6625 21 17.0531 19.8422 18.7031 18.0094ZM0 12C0 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12C24 15.1826 22.7357 18.2348 20.4853 20.4853C18.2348 22.7357 15.1826 24 12 24C8.8174 24 5.76516 22.7357 3.51472 20.4853C1.26428 18.2348 0 15.1826 0 12ZM12 12.75C12.8951 12.75 13.7535 12.3944 14.3865 11.7615C15.0194 11.1285 15.375 10.2701 15.375 9.375C15.375 8.47989 15.0194 7.62145 14.3865 6.98851C13.7535 6.35558 12.8951 6 12 6C11.1049 6 10.2465 6.35558 9.61351 6.98851C8.98058 7.62145 8.625 8.47989 8.625 9.375C8.625 10.2701 8.98058 11.1285 9.61351 11.7615C10.2465 12.3944 11.1049 12.75 12 12.75Z"
                      fill="url(#paint0_linear_874_16)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_874_16"
                        x1="12"
                        y1="0"
                        x2="12"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A78BFA" />
                        <stop offset="1" stop-color="#0EA5E9" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <Link to="/MyProfile">
                    <span className="text-gray-700 font-bold">
                      Min Profil
                    </span>
                  </Link>
                </NavItem>
                <div className="flex flex-col">
                  <NavItem>
                    <svg
                      width="24"
                      height="22"
                      viewBox="0 0 24 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.23125 12.8433L10.7016 20.7512C11.0531 21.0793 11.5172 21.2621 12 21.2621C12.4828 21.2621 12.9469 21.0793 13.2984 20.7512L21.7687 12.8433C23.1938 11.5168 24 9.65584 24 7.71053V7.43865C24 4.16209 21.6328 1.36834 18.4031 0.829279C16.2656 0.473029 14.0906 1.17147 12.5625 2.69959L12 3.26209L11.4375 2.69959C9.90938 1.17147 7.73438 0.473029 5.59688 0.829279C2.36719 1.36834 0 4.16209 0 7.43865V7.71053C0 9.65584 0.80625 11.5168 2.23125 12.8433Z"
                        fill="url(#paint0_linear_874_28)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_874_28"
                          x1="12"
                          y1="0.737915"
                          x2="12"
                          y2="21.2621"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#A78BFA" />
                          <stop offset="1" stop-color="#0EA5E9" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <Link to="/saved">
                      <span className="text-gray-500 font-semibold">
                      &#8212; Sparade jobb
                      </span>
                    </Link>
                  </NavItem>
                  <NavItem>
                    <svg
                      width="24"
                      height="18"
                      viewBox="0 0 24 18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M2.25 0C1.00781 0 0 1.00781 0 2.25C0 2.95781 0.332813 3.62344 0.9 4.05L11.1 11.7C11.6344 12.0984 12.3656 12.0984 12.9 11.7L23.1 4.05C23.6672 3.62344 24 2.95781 24 2.25C24 1.00781 22.9922 0 21.75 0H2.25ZM0 5.25V15C0 16.6547 1.34531 18 3 18H21C22.6547 18 24 16.6547 24 15V5.25L13.8 12.9C12.7312 13.7016 11.2688 13.7016 10.2 12.9L0 5.25Z"
                        fill="url(#paint0_linear_874_24)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_874_24"
                          x1="12"
                          y1="0"
                          x2="12"
                          y2="18"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#A78BFA" />
                          <stop offset="1" stop-color="#0EA5E9" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <Link to="/NoEarlierCoverLetter">
                      <span className="text-gray-500 font-semibold">
                      &#8212; Personliga brev
                      </span>
                    </Link>
                  </NavItem>
                </div>
              </div>
              <div className="flex justify-between">
                {isLoggedIn ? (
                  <button
                    onClick={handleSignOut}
                    className="flex items-end gap-4 text-gray-700"
                  >
                    {" "}
                    <svg
                      width="24"
                      height="22"
                      viewBox="0 0 24 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M23.5605 12.0595C24.1465 11.4735 24.1465 10.5219 23.5605 9.93591L17.5602 3.93562C16.9743 3.34965 16.0227 3.34965 15.4367 3.93562C14.8507 4.52158 14.8507 5.47319 15.4367 6.05916L18.8775 9.49995H9.00044C8.17071 9.49995 7.50037 10.1703 7.50037 11C7.50037 11.8298 8.17071 12.5001 9.00044 12.5001H18.8775L15.4367 15.9409C14.8507 16.5269 14.8507 17.4785 15.4367 18.0644C16.0227 18.6504 16.9743 18.6504 17.5602 18.0644L23.5605 12.0641V12.0595ZM7.50037 3.49966C8.33009 3.49966 9.00044 2.82931 9.00044 1.99958C9.00044 1.16986 8.33009 0.499512 7.50037 0.499512H4.50022C2.01572 0.499512 0 2.51524 0 4.99973V17.0003C0 19.4848 2.01572 21.5005 4.50022 21.5005H7.50037C8.33009 21.5005 9.00044 20.8302 9.00044 20.0005C9.00044 19.1707 8.33009 18.5004 7.50037 18.5004H4.50022C3.67049 18.5004 3.00015 17.83 3.00015 17.0003V4.99973C3.00015 4.17 3.67049 3.49966 4.50022 3.49966H7.50037Z"
                        fill="url(#paint0_linear_874_31)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_874_31"
                          x1="12"
                          y1="0.499512"
                          x2="12"
                          y2="21.5005"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#A78BFA" />
                          <stop offset="1" stop-color="#0EA5E9" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <span>
                      {" "}
                      Logga ut
                    </span>
                  </button>
                ) : (
                  <button className="flex items-center gap-4 text-gray-700">
                    {" "}
                    <svg
                      width="24"
                      height="22"
                      viewBox="0 0 24 22"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M16.5 3.5H19.5C20.3297 3.5 21 4.17031 21 5V17C21 17.8297 20.3297 18.5 19.5 18.5H16.5C15.6703 18.5 15 19.1703 15 20C15 20.8297 15.6703 21.5 16.5 21.5H19.5C21.9844 21.5 24 19.4844 24 17V5C24 2.51562 21.9844 0.5 19.5 0.5H16.5C15.6703 0.5 15 1.17031 15 2C15 2.82969 15.6703 3.5 16.5 3.5ZM16.0594 12.0594C16.6453 11.4734 16.6453 10.5219 16.0594 9.93594L10.0594 3.93594C9.47344 3.35 8.52188 3.35 7.93594 3.93594C7.35 4.52188 7.35 5.47344 7.93594 6.05938L11.3766 9.5H1.5C0.670312 9.5 0 10.1703 0 11C0 11.8297 0.670312 12.5 1.5 12.5H11.3766L7.93594 15.9406C7.35 16.5266 7.35 17.4781 7.93594 18.0641C8.52188 18.65 9.47344 18.65 10.0594 18.0641L16.0594 12.0641V12.0594Z"
                        fill="url(#paint0_linear_874_33)"
                      />
                      <defs>
                        <linearGradient
                          id="paint0_linear_874_33"
                          x1="12"
                          y1="0.5"
                          x2="12"
                          y2="21.5"
                          gradientUnits="userSpaceOnUse"
                        >
                          <stop stop-color="#A78BFA" />
                          <stop offset="1" stop-color="#0EA5E9" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <Link to="/signin">
                      <span>
                        {" "}
                        Logga in
                      </span>
                    </Link>
                  </button>
                )}
                <button onClick={() => onClose(!menu)} className="self-end">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24ZM8.20312 8.20312C8.64375 7.7625 9.35625 7.7625 9.79219 8.20312L11.9953 10.4062L14.1984 8.20312C14.6391 7.7625 15.3516 7.7625 15.7875 8.20312C16.2234 8.64375 16.2281 9.35625 15.7875 9.79219L13.5844 11.9953L15.7875 14.1984C16.2281 14.6391 16.2281 15.3516 15.7875 15.7875C15.3469 16.2234 14.6344 16.2281 14.1984 15.7875L11.9953 13.5844L9.79219 15.7875C9.35156 16.2281 8.63906 16.2281 8.20312 15.7875C7.76719 15.3469 7.7625 14.6344 8.20312 14.1984L10.4062 11.9953L8.20312 9.79219C7.7625 9.35156 7.7625 8.63906 8.20312 8.20312Z"
                      fill="url(#paint0_linear_874_30)"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_874_30"
                        x1="12"
                        y1="0"
                        x2="12"
                        y2="24"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop stop-color="#A78BFA" />
                        <stop offset="1" stop-color="#0EA5E9" />
                      </linearGradient>
                    </defs>
                  </svg>
                </button>
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
