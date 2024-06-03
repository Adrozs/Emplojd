import { Link } from "react-router-dom";
import EmplojdLogo from "./Icons/EmplojdLogoSVG";
import WaveSVG from "./Icons/WaveSVG";

export default function Footer({ children }) {
  return (
    <>
      <div className="relative">
        <WaveSVG />
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
                  <span>Min profil</span>
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
