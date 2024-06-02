import React, { useState, useRef } from "react";
import CvFileSelecter from "./CvFileSelecter";
import DatePick from "./DatePick";
import FormRow from "./FormRow";
import AddNewButton from "./AddNewButton";

const CvManager = () => {
  const [fileName, setFileName] = useState("INGEN FIL ÄR VALD");
  const [manualInputEnabled, setManualInputEnabled] = useState(false);
  const [values, setValues] = useState({
    educationTitle: "",
    schoolName: "",
    jobTitle: "",
    companyName: "",
    workDescription: "",
  });
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

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
  return (
    <div className="mx-4 mb-20 mt-10 dark:bg-slate-800">
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
          value={values.educationTitle}
          placeholder="Ange namn på utbildning"
          handleChange={handleChange}
          disabled={!manualInputEnabled}
        />
        <FormRow
          type="text"
          name="Skolans namn"
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
      />

      <AddNewButton disabled={!manualInputEnabled} />

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
          value={values.jobTitle}
          placeholder="Ange jobbtitel"
          handleChange={handleChange}
          disabled={!manualInputEnabled}
        />
        <FormRow
          type="text"
          name="Företagsnamn"
          value={values.companyName}
          placeholder="Ange företagsnamn"
          handleChange={handleChange}
          disabled={!manualInputEnabled}
        />
        <FormRow
          type="textarea"
          name="Arbetsuppgifter (max 500 tecken)"
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
      />

      <AddNewButton disabled={!manualInputEnabled} />
    </div>
  );
};
export default CvManager;
