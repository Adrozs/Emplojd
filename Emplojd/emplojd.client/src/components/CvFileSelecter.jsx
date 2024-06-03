import { FaArrowUpFromBracket, FaRegTrashCan } from "react-icons/fa6";
import { useState, useRef } from "react";
import { FaDownload } from "react-icons/fa6";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";

export default function CvFileSelecter({
  manualInputEnabled,
  disabled = false,
}) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInput = useRef(null);

  const handleFileButtonClick = () => {
    if (!manualInputEnabled) {
      fileInput.current.click();
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleTrashClick = (e) => {
    e.stopPropagation();
    setSelectedFile(null);
  };

  const handleUpload = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (selectedFile) {
      const formData = new FormData();
      formData.append("ResumeFile", selectedFile);

      try {
        const response = await fetch(
          "https://emplojdserver20240531231628.azurewebsites.net/api/UploadResume",
          {
            method: "POST",
            body: formData,
          }
        );

        if (response.ok) {
          console.log("File uploaded successfully");
          toast.success("CV uppladdat");
          setIsLoading(false);
        } else {
          console.error("File upload failed");
          toast.error("Gick inte ladda upp CV, vänligen försök igen senare");
          setIsLoading(false);
        }
      } catch (error) {
        console.error("Error uploading file:", error);
        setIsLoading(false);
      }
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <form onSubmit={handleUpload}>
        <div className="mb-2">
          <label
            className={`font-semibold pl-1 dark:text-white ${
              disabled
                ? "text-gray-300 dark:text-gray-600"
                : "text-black dark:text-white"
            }`}
          >
            Ladda upp ditt CV (pdf, docx)
          </label>
        </div>
        <div
          className={`flex-col border-2 rounded-2xl justify-center items-center bg-gradient-to-r-custom h-22 w-auto ${
            manualInputEnabled
              ? "cursor-not-allowed bg-transparent dark:border-gray-600"
              : ""
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
                <span>{selectedFile.name}</span>
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

        <button
          className=" flex items-center gap-2 my-1 cursor-pointer dark:text-white text-[15px]"
          onClick={handleUpload}
        >
          <FaDownload />{" "}
          <span className="border-b-[1px] border-black mt-1 dark:border-white">
            {" "}
            Ladda upp{" "}
          </span>
        </button>
      </form>
    </>
  );
}
