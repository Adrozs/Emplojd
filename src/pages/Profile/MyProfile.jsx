import React, { useState } from "react";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";

function MyProfile() {
  const [answerData, setAnswerData] = useState([
    { question: "FRÅGA 1", answer: "SVAR, SVAR, SVAR, SVAR" },
    { question: "FRÅGA 2", answer: "SVAR, SVAR, SVAR, SVAR" },
    { question: "FRÅGA 3", answer: "SVAR, SVAR, SVAR, SVAR" },
    { question: "FRÅGA 4", answer: "SVAR, SVAR, SVAR, SVAR" },
    { question: "FRÅGA 5", answer: "SVAR, SVAR, SVAR, SVAR" },
  ]);

  const [profileData, setProfileData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [profilePic, setProfilePic] = useState("");

  const updateAnswer = (index, newAnswer) => {
    const updatedQaData = [...answerData];
    updatedQaData[index].answer = newAnswer;
    setAnswerData(updatedQaData);
  };

  const updateProfile = (field, value) => {
    setProfileData((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

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

  const fileInputRef = React.createRef();

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      <HeaderOtherPages />
      <div
        className="flex flex-col min-h-screen gap-2 m-4"
        style={{ minHeight: "calc(100vh - 170px)" }}
      >
        <div className="flex bg-stone-300 h-12 items-center p-4 w-64 mb-4">
          MIN JOBBPROFIL
        </div>
        <div className="grid grid-cols-[auto_1fr] mb-8 gap-2">
          <div className="bg-stone-300 size-36 rounded-full col-start-1 row-span-4 relative overflow-hidden">
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
                <g fill="currentColor" fill-rule="evenodd" clip-rule="evenodd">
                  <path d="M6.64 9.788a.75.75 0 0 1 .53.918a5 5 0 0 0 7.33 5.624a.75.75 0 1 1 .75 1.3a6.501 6.501 0 0 1-9.529-7.312a.75.75 0 0 1 .919-.53M8.75 6.37a6.5 6.5 0 0 1 9.529 7.312a.75.75 0 1 1-1.45-.388A5.001 5.001 0 0 0 9.5 7.67a.75.75 0 1 1-.75-1.3" />
                  <path d="M5.72 9.47a.75.75 0 0 1 1.06 0l2.5 2.5a.75.75 0 1 1-1.06 1.06l-1.97-1.97l-1.97 1.97a.75.75 0 0 1-1.06-1.06zm9 1.5a.75.75 0 0 1 1.06 0l1.97 1.97l1.97-1.97a.75.75 0 1 1 1.06 1.06l-2.5 2.5a.75.75 0 0 1-1.06 0l-2.5-2.5a.75.75 0 0 1 0-1.06" />
                </g>
              </svg>
            </div>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleProfilePicChange}
              className="hover"
            />
          </div>
          {Object.entries(profileData).map(([field, value]) => (
            <div
              key={field}
              className="bg-stone-300 h-8 w-full col-start-2 pl-2 items-center flex"
            >
              <input
                className="bg-transparent outline-none w-full h-full"
                type="text"
                value={value}
                onChange={(e) => updateProfile(field, e.target.value)}
                placeholder={field.toUpperCase()}
              />
            </div>
          ))}
        </div>
        <div className="flex bg-stone-300 h-8 items-center p-4 w-48 mb-4">
          OM MIG
        </div>
        <div>
          {answerData.map((item, index) => (
            <div key={index} className="mb-4">
              <div className="bg-stone-300 p-2 w-56 h-8 flex items-center mb-4">
                {item.question}
              </div>
              <div className="bg-stone-300 p-2 w-full h-20 flex items-center">
                <input
                  className="bg-transparent outline-none w-full h-full"
                  type="text"
                  value={item.answer}
                  onChange={(e) => updateAnswer(index, e.target.value)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default MyProfile;
