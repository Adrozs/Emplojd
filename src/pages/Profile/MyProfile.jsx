import React, { useState } from "react";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import FormRow from "../../components/FormRow";
import Footer from "../../components/Footer";
import { LoginRightArrow } from "../../components/Icons/AuthFormSvg";

function MyProfile() {
  const initialState = {
    email: "",
    emailConfirmed: "",
    password: "",
    passwordConfirmed: "",
    isMember: true,
  };

  const [values, setValues] = useState(initialState);

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
      <div className="flex flex-col h-screen justify-between" >
        <div className="mx-4">
          <div className="grid grid-cols-[auto_1fr] mt-6 justify-items-center md:mt-12 ls:mt-28 lg:mt-44 xl:mt-48 xxl:mt-64">
            <div className="flex flex-col z-10 bg-gradient-to-b from-[#CA81ED] to-[#4086C6] text-white p-4 w-44 rounded-xl">
              <h2 className="font-semibold">Min Profil</h2>
              <h3 className="text-xs text-">Inga ändringar att spara</h3>
            </div>
            <div className="bg-gradient-to-b from-[#cb81ed52] to-[#4085c647] size-32 -top-4 rounded-full col-start-2 row-span-2 relative overflow-hidden border-2 border-customBlue">
              <img
                src={profilePic || "path_to_default_image.jpg"}
                className="rounded-full w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-0 hover:bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 cursor-pointer">
                <svg
                  onClick={triggerFileInput}
                  xmlns="http://www.w3.org/2000/svg"
                  width="4em"
                  height="4em"
                  viewBox="0 0 24 24"
                >
                  <g fill="white" fillRule="evenodd" clipRule="evenodd">
                    <path d="M6.64 9.788a.75.75 0 0 1 .53.918a5 5 0 0 0 7.33 5.624a.75.75 0 1 1 .75 1.3a6.501 6.501 0 0 1-9.529-7.312a.75.75 0 0 1 .919-.53M8.75 6.37a6.5 6.5 0 0 1 9.529 7.312a.75.75 0 1 1-1.45-.388A5.001 5.001 0 0 0 9.5 7.67a.75.75 0 1 1-.75-1.3" />
                    <path d="M5.72 9.47a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 1 1-1.06 1.06l-1.97-1.97l-1.97 1.97a.75.75 0 0 1-1.06-1.06zm9 1.5a.75.75 0 0 1 1.06 0l1.97 1.97l1.97-1.97a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 0-1.06" />
                  </g>
                </svg>
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
                labelText="Email"
                handleChange={handleChange}
              />
            </div>
            <button
              className="w-full bg-[#0783F6] h-16 rounded-xl text-white text-xl hover:bg-[#045199] active:bg-[#066DCC] mb-20 flex px-8 justify-between items-center md:mb-12 ls:mb-28 lg:mb-52 xl:mb-80 xxl:mb-96"
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
