import React, { useState } from "react";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import FormRow from "../../components/FormRow";
import Footer from "../../components/Footer";
import { LoginRightArrow } from "../../components/Icons/AuthFormSvg";
import ListForm from "../../components/ListForm";
import { FaPlus } from "react-icons/fa";

function MyProfile() {
  const initialState = {
    email: "",
    emailConfirmed: "",
    password: "",
    passwordConfirmed: "",
    isMember: true,
  };

  const [values, setValues] = useState(initialState);
  const [selectedOption, setSelectedOption] = useState("none");

  const [profilePic, setProfilePic] = useState("");

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const fileInputRef = React.createRef();

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <HeaderOtherPages />
      <div className="flex flex-col h-screen justify-between">
        <div className="mx-4">
          <div className="grid grid-cols-[auto_1fr] mt-6 justify-items-center md:mt-12 ls:mt-28 lg:mt-44 xl:mt-48 xxl:mt-64">
            <div className="grid z-10 bg-gradient-to-r-custom text-white p-4 w-48 rounded-xl">
              <h2 className="font-semibold">Min Profil</h2>
              <h3 className="row-start-2 text-xs text-">
                Inga ändringar att spara
              </h3>
              <svg
                width="16"
                height="17"
                viewBox="0 0 16 17"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="row-start-2"
              >
                <g clipPath="url(#clip0_1137_1454)">
                  <rect y="0.5" width="16" height="16" rx="8" fill="white" />
                  <path
                    d="M8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.37827 15.1571 4.34344 13.6569 2.84315C12.1566 1.34285 10.1217 0.5 8 0.5C5.87827 0.5 3.84344 1.34285 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 10.6217 0.842855 12.6566 2.34315 14.1569C3.84344 15.6571 5.87827 16.5 8 16.5ZM11.5312 7.03125L7.53125 11.0312C7.2375 11.325 6.7625 11.325 6.47188 11.0312L4.47188 9.03125C4.17813 8.7375 4.17813 8.2625 4.47188 7.97188C4.76563 7.68125 5.24063 7.67813 5.53125 7.97188L7 9.44063L10.4688 5.96875C10.7625 5.675 11.2375 5.675 11.5281 5.96875C11.8188 6.2625 11.8219 6.7375 11.5281 7.02812L11.5312 7.03125Z"
                    fill="#84CC16"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_1137_1454">
                    <rect y="0.5" width="16" height="16" rx="8" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <div className="bg-gradient-to-b from-[#cb81ed52] to-[#4085c647] size-32 -top-4 rounded-full col-start-2 row-span-2 relative overflow-hidden border-2 border-customBlue">
              <img
                src={profilePic || "path_to_default_image.jpg"}
                className="rounded-full w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-0 hover:bg-opacity-30 opacity-0 hover:opacity-75 transition-opacity duration-300 cursor-pointer">
                <FaPlus onClick={triggerFileInput} size="2rem" fill="white" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePicChange}
              />
            </div>
          </div>
          <div>
            <div className="mb-8">
              <FormRow
                type="firstname"
                labelText="Förnamn"
                handleChange={handleChange}
              />
              <FormRow
                type="lastname"
                labelText="Efternamn"
                handleChange={handleChange}
              />
              <FormRow
                type="email"
                name="email"
                labelText="Email"
                value={values.email}
                handleChange={handleChange}
                placeholder="your.email@email.com"
              />
            </div>
            <ListForm />
            <ListForm />
            <div className="pb-6 px-2 rounded-lg max-w-md">
              <div className="flex items-center mb-4">
                <div className="text-lg text-line mb-2 font-semibold flex items-center top-1 relative">
                  Signatur
                </div>
                <div className="ml-2 bg-purple-400 px-2.5 py-1 rounded-full text-sm text-white font-semibold flex items-center justify-center">
                  ?
                </div>
              </div>
              <div className="flex flex-col px-2">
                <label className="inline-flex items-center mb-2">
                  <input
                    type="radio"
                    className="form-radio text-sky-700"
                    checked={selectedOption === "none"}
                    onChange={() => setSelectedOption("none")}
                  />
                  <span className="ml-2 text-gray-700">Ingen signatur</span>
                </label>
                <label className="inline-flex items-center mb-2">
                  <input
                    type="radio"
                    className="form-radio text-sky-700"
                    checked={selectedOption === "ai"}
                    onChange={() => setSelectedOption("ai")}
                  />
                  <span className="ml-2 text-gray-700">
                    Låt AI generera signaturer i mina brev
                  </span>
                </label>
                <label className="inline-flex items-center mb-2">
                  <input
                    type="radio"
                    className="form-radio text-sky-700"
                    checked={selectedOption === "custom"}
                    onChange={() => setSelectedOption("custom")}
                  />
                  <span className="ml-2 text-gray-700">
                    Skapa egen signatur
                  </span>
                </label>
              </div>
            </div>

            <button
              className="w-full bg-[#0783F6] h-16 rounded-xl text-white text-xl hover:bg-[#045199] active:bg-[#066DCC] mb-32 flex px-8 justify-between items-center md:mb-12 ls:mb-28 lg:mb-52 xl:mb-80 xxl:mb-96"
              type="submit"
            >
              Spara ändringar <LoginRightArrow />
            </button>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default MyProfile;
