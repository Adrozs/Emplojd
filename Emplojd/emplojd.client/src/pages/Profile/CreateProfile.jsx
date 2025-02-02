import React, { useState } from "react";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import Footer from "../../components/Footer";
import FormRow from "../../components/FormRow";
import ListForm from "../../components/ListForm";
import "react-datepicker/dist/react-datepicker.css";
import CvManager from "../../components/CvManager";
import { useDarkMode } from "../../components/Icons/DarkModeHook";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../../ui/Loader";

function CreateProfile() {
  const initialState = {
    firstname: "",
    lastname: "",
    email: "",
    emailConfirmed: "",
    password: "",
    passwordConfirmed: "",
    isMember: true,
  };

  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState(initialState);
  const [interests, setInterests] = useState([]);
  const [descriptiveWords, setDescriptiveWords] = useState([]);
  const { isDarkMode } = useDarkMode();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const messages = [
    "Börja hitta jobb direkt efter du har skapat din jobbprofil!",
    <>
      <span className="font-semibold">{`Snyggt ${values.firstname}!`}</span>{" "}
      <br /> Nu behöver vi bara fråga några saker till!
    </>,
    "Nu är du nästan färdig med din jobbprofil! Använd dig av ditt CV för att få ännu bättre personliga brev!",
  ];

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleListFormChange = (type, value) => {
    if (type === "interests") {
      setInterests(value);
    } else if (type === "descriptiveWords") {
      setDescriptiveWords(value);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const authToken = localStorage.getItem("authToken");

    const interestsArray = interests || [];
    const descriptiveWordsArray = descriptiveWords || [];

    const data = {
      firstname: values.firstname,
      lastname: values.lastname,
      interests: interestsArray,
      descriptiveWords: descriptiveWordsArray,
    };

    // console.log("Data being sent:", data);

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
      setIsLoading(false);
      // console.log("Success:", response.data);
      navigate("/joblist");
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.error(
          `HTTP error! status: ${error.response.status}, message: ${error.response.data}`
        );
      } else {
        console.error("Error:", error.message);
      }
    }
  };
  const wordBgColorInterests = isDarkMode ? "bg-indigo-500" : "bg-sky-100";
  const wordBgColorDescriptiveWords = isDarkMode
    ? "bg-indigo-500"
    : "bg-purple-100";

  return (
    <>
      <HeaderOtherPages />
      <div className="flex justify-center">
        <div className="w-full">
          <h2 className="p-4 text-2xl font-bold mb-4 dark:text-white">
            Skapa jobbprofil
          </h2>
          <p className="bg-blue-100 dark:bg-gray-900 dark:text-white p-4 rounded-lg mb-4 mx-8">
            {messages[currentStep - 1]}
          </p>

          <div className="flex justify-center my-4">
            {[1, 2, 3].map((step) => (
              <span
                key={step}
                className={`w-3 h-3 mx-1 rounded-full ${
                  currentStep === step ? "bg-blue-500" : "bg-gray-300"
                }`}
              ></span>
            ))}
          </div>

          <div className="mb-6 min-h-[40vh]">
            {currentStep === 1 && (
              <div className="mx-4">
                <FormRow
                  type="text"
                  name="firstname"
                  labelText="Förnamn"
                  value={values.firstname}
                  placeholder="Ange ditt förnamn"
                  handleChange={handleChange}
                />
                <FormRow
                  type="text"
                  name="lastname"
                  labelText="Efternamn"
                  placeholder="Ange ditt efternamn"
                  value={values.lastname}
                  handleChange={handleChange}
                />
              </div>
            )}

            {currentStep === 2 && (
              <div className="mx-4 dark:text-white">
                <ListForm
                  wordBgColor={wordBgColorInterests}
                  name="Vad är dina intressen?"
                  labelBgColor="none"
                  onChange={(value) => handleListFormChange("interests", value)}
                  value={interests}
                />
                <ListForm
                  wordBgColor={wordBgColorInterests}
                  name="Beskriv dig själv med några ord"
                  labelBgColor="none"
                  onChange={(value) =>
                    handleListFormChange("descriptiveWords", value)
                  }
                  value={descriptiveWords}
                />
              </div>
            )}

            {currentStep === 3 && <CvManager />}
          </div>

          <div className="flex justify-around items-center shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.3)] bg-gray-100 dark:bg-slate-800 h-52">
            <button
              className="border-2 border-sky-500 dark:border-indigo-700 p-6 rounded-xl text-white text-xl  mb-2 flex justify-between items-center"
              onClick={prevStep}
              disabled={currentStep === 1}
            >
              <svg
                height="24"
                width="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="flex items-center fill-sky-500 dark:fill-indigo-700"
              >
                <path d="M24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12ZM12.7031 6.32812C13.1438 5.8875 13.8562 5.8875 14.2922 6.32812C14.7281 6.76875 14.7328 7.48125 14.2922 7.91719L10.2141 11.9953L14.2922 16.0734C14.7328 16.5141 14.7328 17.2266 14.2922 17.6625C13.8516 18.0984 13.1391 18.1031 12.7031 17.6625L7.82812 12.7969C7.3875 12.3563 7.3875 11.6438 7.82812 11.2078L12.7031 6.32812Z" />
              </svg>
            </button>
            <button
              className="bg-sky-500 h-16 rounded-xl text-white text-lg hover:bg-[#045199] active:bg-[#066DCC] dark:bg-indigo-700 mb-2 flex px-8 items-center"
              onClick={currentStep === 3 ? handleSubmit : nextStep}
              disabled={
                currentStep === 3 && (!values.firstname || !values.lastname)
              }
            >
              {currentStep === 3 ? "Spara och avsluta" : "Spara och fortsätt"}
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="ml-6"
              >
                <path
                  d="M0 12C0 15.1826 1.26428 18.2348 3.51472 20.4853C5.76516 22.7357 8.8174 24 12 24C15.1826 24 18.2348 22.7357 20.4853 20.4853C22.7357 18.2348 24 15.1826 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2348 1.26428 15.1826 0 12 0C8.8174 0 5.76516 1.26428 3.51472 3.51472C1.26428 5.76516 0 8.8174 0 12ZM11.2969 17.6719C10.8562 18.1125 10.1438 18.1125 9.70781 17.6719C9.27188 17.2313 9.26719 16.5188 9.70781 16.0828L13.7859 12.0047L9.70781 7.92656C9.26719 7.48594 9.26719 6.77344 9.70781 6.3375C10.1484 5.90156 10.8609 5.89687 11.2969 6.3375L16.1719 11.2031C16.6125 11.6438 16.6125 12.3562 16.1719 12.7922L11.2969 17.6719Z"
                  fill="#F5F5F5"
                />
              </svg>
            </button>
            {isLoading && <Loader />}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default CreateProfile;
