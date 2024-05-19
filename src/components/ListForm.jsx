import React, { useState } from "react";
import AccountForm from "./AccountForm";

function App() {
  const [words, setWords] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [inputState, setInputState] = useState({
    isTouched: false,
    isValid: false,
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setInputState({ ...inputState, isTouched: false });
  };

  const handleSubmit = () => {
    if (inputValue.trim() !== "") {
      setWords([...words, inputValue]);
      setInputValue("");
      setInputState({
        isTouched: true,
        isValid: true,
      });
      if (words.length >= 5) {
        setError("Max antal ord: 5st.");
      } else {
        setError("");
      }
    }
  };

  const handleRemoveWord = (index) => {
    const newWords = words.filter((_, i) => i !== index);
    setWords(newWords);
    if (newWords.length <= 5) {
      setError("");
    }
  };

  

  return (
    <div className="flex justify-center items-center">
      <div className="rounded-lg w-full">
        <form onSubmit={(e) => e.preventDefault()} className="mb-4">
          <AccountForm
            type="text"
            name="Beskriv dig själv med några ord"
            value={inputValue}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            onClick={() => {
                setIsTyping(true);
                setIsTouched(false);
              }}
            placeholder="Påbörja nytt ord med ENTER"
            showIcons={false}
            inputState={inputState}
            error={error}
            words={words}
            handleRemoveWord={handleRemoveWord}
          />
        </form>
      </div>
    </div>
  );
}

export default App;
