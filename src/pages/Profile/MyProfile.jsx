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
            <div className="flex flex-col z-10 bg-gradient-to-b from-[#CA81ED] to-[#4086C6] text-white p-4 w-44 rounded-xl">
              <h2 className="font-semibold">Min Profil</h2>
              <h3 className="text-xs text-">Inga ändringar att spara</h3>
            </div>
            <div className="bg-gradient-to-b from-[#cb81ed52] to-[#4085c647] size-32 -top-4 rounded-full col-start-2 row-span-2 relative overflow-hidden border-2 border-customBlue">
              <img
                src={profilePic || "path_to_default_image.jpg"}
                className="rounded-full w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-0 hover:bg-opacity-30 opacity-0 hover:opacity-75 transition-opacity duration-300 cursor-pointer">
                <FaPlus onClick={triggerFileInput}
                size="2rem"
                fill="white"
                 />
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
            <ListForm/>
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
