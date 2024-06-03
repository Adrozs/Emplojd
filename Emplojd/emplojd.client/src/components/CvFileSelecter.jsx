import { FaArrowUpFromBracket, FaRegTrashCan } from "react-icons/fa6";
import { useState, useRef } from "react";

export default function CvFileSelecter({ manualInputEnabled, disabled=false }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const fileInput = useRef(null);

  const handleFileButtonClick = () => {
    if (!manualInputEnabled) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0].name);
  };

  const handleTrashClick = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  return (
    <>
      <div className="mb-2">
        <label
          className={`font-semibold pl-1 dark:text-white ${
            disabled ? "text-gray-300 dark:text-gray-600" : "text-black dark:text-white"
          }`}
        >
          Ladda upp ditt CV (pdf, docx)
        </label>
      </div>
      <div
        className={`flex-col border-2 rounded-2xl justify-center items-center bg-gradient-to-r-custom h-22 w-auto ${
          manualInputEnabled ? "cursor-not-allowed bg-transparent dark:border-gray-600" : ""
        }`}
        onClick={handleFileButtonClick}
      >
        <div
          className={`flex text-gray-400 pl-3 p-3 rounded-xl m-[2px] relative ${
            manualInputEnabled
              ? "cursor-not-allowed bg-transparent "
              : "cursor-pointer bg-white dark:bg-slate-700"
          }`}
        >
          {" "}
          {selectedFile ? (
            <>
              <span>{selectedFile}</span>
              <FaRegTrashCan
                className="ml-3 mt-1 text-lg absolute right-5"
                fill="currentColor"
                onClick={handleTrashClick}
              />
            </>
          ) : (
            <>
              <span>Välj fil (pdf, docx)</span>
              <FaArrowUpFromBracket
                className="ml-3 mt-1 text-lg absolute right-5"
                fill="currentColor"
              />
            </>
          )}
        </div>
        <input
          type="file"
          ref={fileInput}
          style={{ display: "none" }}
          onChange={handleFileChange}
        />
      </div>
    </>
  );
}
