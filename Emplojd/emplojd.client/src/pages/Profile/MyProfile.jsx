import React, { useState, useEffect, useRef } from "react";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import FormRow from "../../components/FormRow";
import Footer from "../../components/Footer";
import { LoginRightArrow } from "../../components/Icons/AuthFormSvg";
import ListForm from "../../components/ListForm";
import { FaPlus } from "react-icons/fa";
import { useDarkMode } from "../../components/Icons/DarkModeHook";
import Loader from "../../ui/Loader";
import axios from "axios";

function MyProfile() {
  const initialState = {
    email: "",
    isMember: true,
    firstname: "",
    lastname: "",
  };

  const [values, setValues] = useState(initialState);
  const [selectedOption, setSelectedOption] = useState("none");
  const [profilePic, setProfilePic] = useState("");
  const [unsavedChanges, setUnsavedChanges] = useState(false);
  const [interests, setInterests] = useState([]);
  const [descriptiveWords, setDescriptiveWords] = useState([]);
  const prevValues = useRef(values);
  const prevProfilePic = useRef(profilePic);
  const prevSelectedOption = useRef(selectedOption);
  const fileInputRef = useRef(null);
  const { isDarkMode } = useDarkMode();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      setIsLoading(true);
      const authToken = localStorage.getItem("authToken");

      if (!authToken) {
        console.error("No auth token found");
        return;
      }

      try {
        const response = await fetch(
          `https://emplojdserver20240531231628.azurewebsites.net/api/UserProfile/GetUserProfile`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${authToken}`,
            },
          }
        );

        if (!response.ok) {
          const errorText = await response.text();
          setIsLoading(false);
          console.error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
          throw new Error(
            `HTTP error! status: ${response.status}, message: ${errorText}`
          );
        }
        setIsLoading(false);
        const data = await response.json();
        setValues({
          firstname: data.firstname || "",
          lastname: data.lastname || "",
          isMember: data.isMember || false,
        });
        setProfilePic(data.profilePic || "");
        setInterests(data.interests || []);
        setDescriptiveWords(data.descriptiveWords || []);
      } catch (error) {
        setIsLoading(false);
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUserProfile();
  }, []);

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePic(e.target.result);
      };
      reader.readAsDataURL(file);
      setUnsavedChanges(true);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setUnsavedChanges(true);
  };

  const handleListFormChange = (type, value) => {
    if (type === "interests") {
      setInterests(value);
    } else if (type === "descriptiveWords") {
      setDescriptiveWords(value);
    }
    setUnsavedChanges(true);
  };

  const handleRadioChange = (option) => {
    setSelectedOption(option);
    setUnsavedChanges(true);
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const authToken = localStorage.getItem("authToken");

    const interestsArray = interests || [];
    const descriptiveWordsArray = descriptiveWords || [];

    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      interests: interestsArray,
      descriptiveWords: descriptiveWordsArray,
    };

    console.log("Data being sent:", data);

    try {
      const response = await axios.post(
        "https://emplojdserver20240531231628.azurewebsites.net/api/UserProfile/CreateUserProfile",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      console.log("Success:", response.data);
    } catch (error) {
      if (error.response) {
        console.error(
          `HTTP error! status: ${error.response.status}, message: ${error.response.data}`
        );
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  useEffect(() => {
    const isDifferent = (prev, current) =>
      JSON.stringify(prev) !== JSON.stringify(current);

    if (
      isDifferent(prevValues.current, values) ||
      isDifferent(prevProfilePic.current, profilePic) ||
      isDifferent(prevSelectedOption.current, selectedOption)
    ) {
      setUnsavedChanges(true);
    } else {
      setUnsavedChanges(false);
    }

    prevValues.current = values;
    prevProfilePic.current = profilePic;
    prevSelectedOption.current = selectedOption;
  }, [values, profilePic, selectedOption]);

  const wordBgColorInterests = isDarkMode ? "bg-indigo-500" : "bg-sky-100";
  const wordBgColorDescriptiveWords = isDarkMode
    ? "bg-indigo-500"
    : "bg-purple-100";

  const baseClasses =
    "w-full h-16 rounded-xl text-white text-xl mb-32 flex px-8 justify-between items-center md:mb-12 ls:mb-28 lg:mb-52 xl:mb-80 xxl:mb-9";
  const enabledClasses =
    "bg-[#0783F6] hover:bg-[#045199] active:bg-[#066DCC] dark:bg-indigo-500 dark:hover:bg-indigo-600 dark:active:bg-indigo-700";
  const disabledClasses =
    "bg-gray-300 hover:bg-gray-300 active:bg-gray-300 cursor-not-allowed dark:bg-gray-500 dark:hover:bg-gray-400 dark:active:bg-gray-400";

  return (
    <>
      <HeaderOtherPages />
      <div className="flex flex-col h-screen justify-between dark:bg-gray-800">
        <div className="px-5 dark:bg-gray-800">
          <div className="grid grid-cols-[auto_1fr] mt-6 justify-items-center md:mt-12 ls:mt-28 lg:mt-44 xl:mt-48 xxl:mt-64">
            <div className="grid z-10 bg-gradient-to-140-sky-violet dark:bg-dark-gradient-to-140-purple-slate text-white p-4 w-48 rounded-xl">
              <h2 className="font-semibold">Min Profil</h2>
              <h3 className="row-start-2 text-xs">
                {unsavedChanges
                  ? "Ej sparade ändringar"
                  : "Inga ändringar att spara"}
              </h3>
              {unsavedChanges ? (
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="row-start-2 ml-2"
                >
                  <g clipPath="url(#clip0_1137_1448)">
                    <rect y="0.5" width="16" height="16" rx="8" fill="white" />
                    <path
                      d="M8 16.5C10.1217 16.5 12.1566 15.6571 13.6569 14.1569C15.1571 12.6566 16 10.6217 16 8.5C16 6.37827 15.1571 4.34344 13.6569 2.84315C12.1566 1.34285 10.1217 0.5 8 0.5C5.87827 0.5 3.84344 1.34285 2.34315 2.84315C0.842855 4.34344 0 6.37827 0 8.5C0 10.6217 0.842855 12.6566 2.34315 14.1569C3.84344 15.6571 5.87827 16.5 8 16.5ZM8 4.5C8.41562 4.5 8.75 4.83437 8.75 5.25V8.75C8.75 9.16562 8.41562 9.5 8 9.5C7.58437 9.5 7.25 9.16562 7.25 8.75V5.25C7.25 4.83437 7.58437 4.5 8 4.5ZM7 11.5C7 11.2348 7.10536 10.9804 7.29289 10.7929C7.48043 10.6054 7.73478 10.5 8 10.5C8.26522 10.5 8.51957 10.6054 8.70711 10.7929C8.89464 10.9804 9 11.2348 9 11.5C9 11.7652 8.89464 12.0196 8.70711 12.2071C8.51957 12.3946 8.26522 12.5 8 12.5C7.73478 12.5 7.48043 12.3946 7.29289 12.2071C7.10536 12.0196 7 11.7652 7 11.5Z"
                      fill="#DC2626"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_1137_1448">
                      <rect
                        y="0.5"
                        width="16"
                        height="16"
                        rx="8"
                        fill="white"
                      />
                    </clipPath>
                  </defs>
                </svg>
              ) : (
                <svg
                  width="16"
                  height="17"
                  viewBox="0 0 16 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="row-start-2 ml-2"
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
                      <rect
                        y="0.5"
                        width="16"
                        height="16"
                        rx="8"
                        fill="white"
                      />
                    </clipPath>
                  </defs>
                </svg>
              )}
            </div>
            <div className="bg-gradient-to-b from-[#cb81ed52] to-[#4085c647] size-32 -top-4 rounded-full col-start-2 row-span-2 relative overflow-hidden border-2 border-customBlue">
              <img
                src={profilePic || "path_to_default_image.jpg"}
                className="rounded-full w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-white dark:bg-slate-900 bg-opacity-0 hover:bg-opacity-30 opacity-0 hover:opacity-75 transition-opacity duration-300 cursor-pointer">
                <FaPlus onClick={triggerFileInput} size="2rem" fill="white" />
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleProfilePicChange}
              />
            </div>
          </div>
          <>{isLoading && <Loader />} </>

          <div>
            <div className="mb-4 dark:text-white">
              <FormRow
                type="firstname"
                labelText="Förnamn"
                name="firstname"
                value={values.firstname}
                handleChange={handleChange}
              />
              <FormRow
                type="lastname"
                labelText="Efternamn"
                name="lastname"
                value={values.lastname}
                handleChange={handleChange}
              />
            </div>
            <div className="dark:text-white">
              <ListForm
                wordBgColor={wordBgColorInterests}
                name="Mina intressen"
                type="interests"
                onChange={(value) => handleListFormChange("interests", value)}
                value={interests}
              />
              <ListForm
                wordBgColor={wordBgColorDescriptiveWords}
                name="Beskrivning av mig"
                type="descriptiveWords"
                onChange={(value) =>
                  handleListFormChange("descriptiveWords", value)
                }
                value={descriptiveWords}
              />
            </div>
            <div className="pb-6 rounded-lg max-w-md">
              <div className="flex items-center mb-4">
                <div className="text-line mb-2 font-semibold flex items-center top-1 relative px-2 py-1 rounded-lg dark:text-white">
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
                    onChange={() => handleRadioChange("none")}
                  />
                  <span className="ml-2 text-gray-700 dark:text-white">
                    Ingen signatur
                  </span>
                </label>
                <label className="inline-flex items-center mb-2">
                  <input
                    type="radio"
                    className="form-radio text-sky-700"
                    checked={selectedOption === "ai"}
                    onChange={() => handleRadioChange("ai")}
                  />
                  <span className="ml-2 text-gray-700 dark:text-white">
                    Låt AI generera signaturer i mina brev
                  </span>
                </label>
                <label className="inline-flex items-center mb-2">
                  <input
                    type="radio"
                    className="form-radio text-sky-700"
                    checked={selectedOption === "custom"}
                    onChange={() => handleRadioChange("custom")}
                  />
                  <span className="ml-2 text-gray-700 dark:text-white">
                    Skapa egen signatur
                  </span>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={!unsavedChanges}
              onClick={handleSubmit}
              className={`${baseClasses} ${
                unsavedChanges ? enabledClasses : disabledClasses
              }`}
            >
              {" "}
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
