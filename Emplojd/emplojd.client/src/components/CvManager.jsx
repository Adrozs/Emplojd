import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import CvFileSelecter from "./CvFileSelecter";
import DatePick from "./DatePick";
import FormRow from "./FormRow";
import AddNewButton from "./AddNewButton";
import { toast } from "react-toastify";
import Loader from "../ui/Loader";

const CvManager = () => {
  const [fileName, setFileName] = useState("INGEN FIL ÄR VALD");
  const [manualInputEnabled, setManualInputEnabled] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState({
    educationTitle: "",
    schoolName: "",
    startDate: "",
    endDate: "",
    jobTitle: "",
    companyName: "",
    workDescription: "",
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handleDateChange = (dateType, date) => {
    setValues((prev) => ({ ...prev, [dateType]: date }));
  };

  useEffect(() => {
    console.log(values);
  }, [values]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
    }
  };
  const handleDeleteFile = () => {
    setFileName("INGEN FIL ÄR VALD");
    fileInputRef.current.value = null;
  };

  const triggerFileInput = (event) => {
    event.stopPropagation();
    fileInputRef.current.click();
  };

  const resetFormValues = () => {
    setValues({
      educationTitle: "",
      schoolName: "",
      startDate: "",
      endDate: "",
      jobTitle: "",
      companyName: "",
      workDescription: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const authToken = localStorage.getItem("authToken");

    const data = {
      positionEducation: values.educationTitle,
      schoolWorkplace: values.schoolName,
      startDate: values.startDate,
      endDate: values.endDate,
      cvText: "",
      isEducation: true,
    };

    console.log("Data being sent:", data);

    try {
      const response = await axios.post(
        "https://emplojdserver20240531231628.azurewebsites.net/api/UserProfile/AddCvManually",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setIsLoading(false);
      console.log("Success:", response.data);
      resetFormValues();
      toast.success("Utbildning sparad");
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.error(
          `HTTP error! status: ${
            error.response.status
          }, message: ${JSON.stringify(error.response.data)}`
        );

        toast.error("Något gick fel, vänligen försök igen");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleWorkSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const authToken = localStorage.getItem("authToken");

    const data = {
      positionEducation: values.jobTitle,
      schoolWorkplace: values.companyName,
      startDate: values.startDate,
      endDate: values.endDate,
      cvText: values.workDescription,
      isEducation: false,
    };

    console.log("Data being sent:", data);

    try {
      const response = await axios.post(
        "https://emplojdserver20240531231628.azurewebsites.net/api/UserProfile/AddCvManually",
        data,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${authToken}`,
          },
        }
      );
      setIsLoading(false);
      console.log("Success:", response.data);
      resetFormValues();
      toast.success("Arbetslivserfarenhet sparad");
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        console.error(
          `HTTP error! status: ${error.response.status}, message: ${error.response.data}`
        );

        toast.error("Något gick fel, vänligen försök igen");
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  return (
    <div className="mx-4 mb-20 mt-10 dark:bg-slate-800 md:mb-40">
      <CvFileSelecter
        fileName={fileName}
        handleFileChange={handleFileChange}
        handleDeleteFile={handleDeleteFile}
        fileInputRef={fileInputRef}
        triggerFileInput={triggerFileInput}
        disabled={manualInputEnabled}
        manualInputEnabled={manualInputEnabled}
      />

      <div className="flex items-center my-4 pl-2">
        <input
          type="checkbox"
          id="manualInput"
          name="manualInput"
          className="mr-2"
          checked={manualInputEnabled}
          onChange={() => setManualInputEnabled((prev) => !prev)}
        />
        <label htmlFor="manualInput" className="text-gray-700 dark:text-white">
          Ange information manuellt
        </label>
      </div>
      <form onSubmit={handleSubmit}>
        <h2
          className={`text-xl font-bold ml-2 ${
            manualInputEnabled
              ? "cursor-pointer text-black dark:text-white"
              : "cursor-not-allowed text-gray-300 dark:text-gray-600"
          }`}
        >
          Utbildning
        </h2>
        <div className="mb-6">
          <FormRow
            type="text"
            name="Utbildningstitel"
            id="educationTitle"
            value={values.educationTitle}
            placeholder="Ange namn på utbildning"
            handleChange={handleChange}
            disabled={!manualInputEnabled}
          />
          <FormRow
            type="text"
            name="Skolans namn"
            id="schoolName"
            value={values.schoolName}
            placeholder="Ange namn på skolan/lärosäte"
            handleChange={handleChange}
            disabled={!manualInputEnabled}
          />
        </div>
        <DatePick
          name="Studieperiod"
          labelText="Studieperiod (från - till)"
          disabled={!manualInputEnabled}
          onDateChange={handleDateChange}
        />

        <AddNewButton disabled={!manualInputEnabled} />
      </form>
      {isLoading && <Loader />}
      <form onSubmit={handleWorkSubmit}>
        <h2
          className={`text-xl font-bold ml-2 mt-6 ${
            manualInputEnabled
              ? "cursor-pointer text-black dark:text-white"
              : "cursor-not-allowed text-gray-300 dark:text-gray-600"
          }`}
        >
          Arbetslivserfarenhet
        </h2>
        <div className="mb-6 mt-2">
          <FormRow
            type="text"
            name="Jobbtitel"
            id="jobTitle"
            value={values.jobTitle}
            placeholder="Ange jobbtitel"
            handleChange={handleChange}
            disabled={!manualInputEnabled}
          />
          <FormRow
            type="text"
            name="Företagsnamn"
            id="companyName"
            value={values.companyName}
            placeholder="Ange företagsnamn"
            handleChange={handleChange}
            disabled={!manualInputEnabled}
          />
          <FormRow
            type="textarea"
            name="Arbetsuppgifter (max 500 tecken)"
            id="workDescription"
            value={values.workDescription}
            placeholder="Beskriv dina arbetsuppgifter"
            handleChange={handleChange}
            disabled={!manualInputEnabled}
            maxLength={500}
            rows={5}
          />
        </div>

        <DatePick
          name="Anställningsperiod"
          labelText="Anställningsperiod (från - till)"
          disabled={!manualInputEnabled}
          onDateChange={handleDateChange}
        />

        <AddNewButton disabled={!manualInputEnabled} />
      </form>
    </div>
  );
};

export default CvManager;
