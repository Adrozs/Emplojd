import React from "react";
import customFetch from "../utils/axios";

const ThirdPartyLogin = () => {
  const handleGoogleLogin = async () => {
    try {
      const response = await customFetch.post("/login-google");
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error logging in with Google:", error);
    }
  };

  const handleLinkedInLogin = async () => {
    try {
      const response = await customFetch.post("/login-linkedin");
      window.location.href = response.data.url;
    } catch (error) {
      console.error("Error logging in with LinkedIn:", error);
    }
  };

  const GoogleSvg = () => (
    <svg
      width="24"
      height="25"
      viewBox="0 0 24 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M23.52 12.9873C23.52 12.1364 23.4436 11.3182 23.3018 10.5327H12V15.1745H18.4582C18.18 16.6745 17.3345 17.9454 16.0636 18.7964V21.8073H19.9418C22.2109 19.7182 23.52 16.6418 23.52 12.9873Z"
        fill="#4285F4"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 24.7141C15.24 24.7141 17.9564 23.6396 19.9418 21.8069L16.0636 18.796C14.9891 19.516 13.6145 19.9414 12 19.9414C8.87455 19.9414 6.22909 17.8305 5.28546 14.9941H1.27637V18.1032C3.25091 22.0251 7.30909 24.7141 12 24.7141Z"
        fill="#34A853"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.28545 14.9943C5.04545 14.2743 4.90909 13.5052 4.90909 12.7143C4.90909 11.9234 5.04545 11.1543 5.28545 10.4343V7.3252H1.27636C0.463636 8.9452 0 10.7779 0 12.7143C0 14.6507 0.463636 16.4834 1.27636 18.1034L5.28545 14.9943Z"
        fill="#FBBC05"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12 5.48708C13.7618 5.48708 15.3436 6.09254 16.5873 7.28163L20.0291 3.83981C17.9509 1.90345 15.2345 0.714355 12 0.714355C7.30909 0.714355 3.25091 3.40345 1.27637 7.32526L5.28546 10.4344C6.22909 7.59799 8.87455 5.48708 12 5.48708Z"
        fill="#EA4335"
      />
    </svg>
  );

  const LinkedInSvg = () => (
    <svg
      height="24"
      viewBox="0 0 72 72"
      width="24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none" fillRule="evenodd">
        <path
          d="M8,72 L64,72 C68.418278,72 72,68.418278 72,64 L72,8 C72,3.581722 68.418278,-8.11624501e-16 64,0 L8,0 C3.581722,8.11624501e-16 -5.41083001e-16,3.581722 0,8 L0,64 C5.41083001e-16,68.418278 3.581722,72 8,72 Z"
          fill="#007EBB"
        />
        <path
          d="M62,62 L51.315625,62 L51.315625,43.8021149 C51.315625,38.8127542 49.4197917,36.0245323 45.4707031,36.0245323 C41.1746094,36.0245323 38.9300781,38.9261103 38.9300781,43.8021149 L38.9300781,62 L28.6333333,62 L28.6333333,27.3333333 L38.9300781,27.3333333 L38.9300781,32.0029283 C38.9300781,32.0029283 42.0260417,26.2742151 49.3825521,26.2742151 C56.7356771,26.2742151 62,30.7644705 62,40.051212 L62,62 Z M16.349349,22.7940133 C12.8420573,22.7940133 10,19.9296567 10,16.3970067 C10,12.8643566 12.8420573,10 16.349349,10 C19.8566406,10 22.6970052,12.8643566 22.6970052,16.3970067 C22.6970052,19.9296567 19.8566406,22.7940133 16.349349,22.7940133 Z M11.0325521,62 L21.769401,62 L21.769401,27.3333333 L11.0325521,27.3333333 L11.0325521,62 Z"
          fill="#FFF"
        />
      </g>
    </svg>
  );

  return (
    <div>
      <div className="flex items-center mb-6">
        <span className="flex-grow h-[2px] bg-gray-300 dark:bg-slate-500"></span>
        <div className="mx-4">Eller</div>
        <span className="flex-grow h-[2px] bg-gray-300 dark:bg-slate-500"></span>
      </div>
      <div className="flex flex-col items-center gap-2 text-gray-800 font-medium">
        <button
          onClick={handleGoogleLogin}
          className="flex w-full h-16 items-center justify-center px-4 py-2 gap-3 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-sky-900 dark:text-white dark:border-slate-500"
        >
          <GoogleSvg />
          Logga in med Google
        </button>
        <button
          onClick={handleLinkedInLogin}
          className="flex w-full h-16 items-center justify-center px-4 py-2 gap-3 bg-white border border-gray-300 rounded-full shadow-sm hover:bg-gray-100 dark:bg-gray-900 dark:hover:bg-sky-900 dark:text-white dark:border-slate-500"
        >
          <LinkedInSvg />
          Logga in med LinkedIn
        </button>
      </div>
    </div>
  );
};
export default ThirdPartyLogin;
