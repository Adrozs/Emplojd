import React, {useState, useCallback} from "react";

function FormRow({ type, name, value, handleChange, labelText, placeholder }) {
  const [inputValue, setInputValue] = useState(value);

  const stableHandleChange = useCallback((event) => {
    const newValue = event.target.value;
    setInputValue(newValue);
    handleChange(newValue, name);
  }, [handleChange, name]);


  return (
    <div className="flex flex-col pb-6">
      <label htmlFor={name} className="form-label text-lg mb-2 font-semibold">
        {labelText || name}
      </label>
      <div className="flex relative items-center">
        {inputValue ? (
          <svg
            width="16"
            height="12"
            viewBox="0 0 24 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-5 z-10 pointer-events-none"
          >
            <path
              d="M23.4978 0.930338C24.1674 1.59991 24.1674 2.68728 23.4978 3.35685L9.78507 17.0696C9.1155 17.7392 8.02812 17.7392 7.35855 17.0696L0.502176 10.2132C-0.167392 9.54366 -0.167392 8.45628 0.502176 7.78672C1.17174 7.11715 2.25912 7.11715 2.92869 7.78672L8.57449 13.4272L21.0767 0.930338C21.7462 0.26077 22.8336 0.26077 23.5032 0.930338H23.4978Z"
              fill="#62AEF5"
            />
          </svg>
        ) : (
          <svg
            width="32"
            height="32"
            viewBox="0 0 44 44"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="absolute right-3 z-10 pointer-events-none"
          >
            <path
              d="M30.8316 12.5969L31.4031 13.1684C31.8472 13.6125 31.8472 14.3305 31.4031 14.7698L30.0285 16.1491L27.8509 13.9715L29.2255 12.5969C29.6695 12.1528 30.3875 12.1528 30.8268 12.5969H30.8316ZM19.9103 21.9167L26.2496 15.5728L28.4272 17.7504L22.0833 24.0897C21.9463 24.2266 21.7762 24.3258 21.592 24.3778L18.8286 25.1667L19.6175 22.4033C19.6694 22.2191 19.7686 22.049 19.9056 21.912L19.9103 21.9167ZM27.6242 10.9955L18.3043 20.3107C17.8933 20.7216 17.5957 21.2271 17.4398 21.7798L16.0889 26.5035C15.9755 26.9003 16.0841 27.3254 16.377 27.6183C16.6699 27.9111 17.095 28.0198 17.4918 27.9064L22.2155 26.5554C22.7729 26.3948 23.2784 26.0972 23.6846 25.691L33.0045 16.3758C34.3318 15.0485 34.3318 12.8945 33.0045 11.5671L32.4329 10.9955C31.1055 9.66816 28.9515 9.66816 27.6242 10.9955ZM14.1569 12.8378C11.8611 12.8378 10 14.6989 10 16.9946V29.8431C10 32.1389 11.8611 34 14.1569 34H27.0054C29.3011 34 31.1622 32.1389 31.1622 29.8431V24.5526C31.1622 23.9243 30.6568 23.4189 30.0285 23.4189C29.4003 23.4189 28.8948 23.9243 28.8948 24.5526V29.8431C28.8948 30.8871 28.0493 31.7326 27.0054 31.7326H14.1569C13.1129 31.7326 12.2674 30.8871 12.2674 29.8431V16.9946C12.2674 15.9507 13.1129 15.1052 14.1569 15.1052H19.4474C20.0757 15.1052 20.5811 14.5997 20.5811 13.9715C20.5811 13.3432 20.0757 12.8378 19.4474 12.8378H14.1569Z"
              fill="#B0B0B0"
            />
          </svg>
        )}
        <input
          type={type}
          value={inputValue}
          name={name}
          onChange={stableHandleChange}
          placeholder={placeholder}
          className="px-2 h-12 text-black rounded-xl bg-[#F0F0F0] border-[#B0B0B0] border-2 w-full outline-[#62AEF5]"
        />
      </div>
    </div>
  );
}

export default FormRow;
