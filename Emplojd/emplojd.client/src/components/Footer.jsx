import { Link } from "react-router-dom";
import EmplojdLogo from "./Icons/EmplojdLogoSVG";

export default function Footer({ children }) {
  return (
    <>
      <div className="relative">
        <svg
          viewBox="20.02 16 337 79.16"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute z-0 -top-12 w-full md:-top-20 ls:-top-32 lg:-top-42 xl:-top-56 xxl:-top-80"
        >
          <g filter="url(#filter0_d_1272_965)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M213.202 36.5003C233.611 43.4877 255.494 45.0084 276.673 40.9111L315.657 33.3693L318.766 32.9121C329.653 31.3111 340.643 30.5073 351.647 30.5073H357.02V82.5073H351.647C343.175 82.5073 334.714 83.1261 326.332 84.3588L324.383 84.6454L286.55 91.9645C256.455 97.7867 225.359 95.6258 196.358 85.6969L179.403 79.8921C133.184 64.0681 83.0186 64.035 36.7783 79.7978C31.5154 81.5919 25.993 82.5073 20.4328 82.5073H20.0203V30.5723V30.5073H20.2107C77.2932 11.1004 139.201 11.1653 196.246 30.6954L213.202 36.5003Z"
              fill="white"
              className="dark:fill-stone-900"
            />
          </g>
        </svg>

        <div className="z-10">
          <div className="bg-white xxl:pb-42 dark:bg-stone-900">
            <div className="flex justify-center items-center">
              <h2 className="mt-14 mb-10 dark:text-white">
                <EmplojdLogo
                  width="12rem"
                  className="dark:fill-white relative z-10"
                />
              </h2>
            </div>
            <div className="flex flex-col text-center pb-20">
              <h2 className="inline mb-5 font-bold text-xl z-10 dark:text-white">
                Hitta hos oss
              </h2>
              <div className="flex flex-col gap-3 dark:text-white">
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline z-10"
                  to="/myProfile"
                >
                  <span>Min sida</span>
                </Link>
                <Link
                  onClick={() => window.scrollTo(0, 0)}
                  className="inline z-10"
                  to="/joblist"
                >
                  <span>Sök jobb</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
