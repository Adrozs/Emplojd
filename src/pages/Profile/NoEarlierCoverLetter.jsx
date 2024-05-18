import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import Footer from "../../components/Footer";
import { FaFileSignature } from "react-icons/fa";

function NoEarlierCoverLetter() {
  return (
    <>
      <HeaderOtherPages />
      <div className="bg-gradient-to-tl from-purple-400 to-sky-500 p-4 flex justify-between items-center my-7 text-center w-[90%] mx-auto rounded-[10px]">
        <h6 className=" text-[20px] ml-2 text-white">
          Sparade personliga brev
        </h6>
        <FaFileSignature size={22} className="text-white mr-2" />
      </div>

      <div className=" mt-4 ">
        <div className="bg-sky-100 p-4 w-[90%] mx-auto rounded-[10px]">
          <p className=" text-sm ml-2 text-black">
            Här har du full åtkomst till dina sparade personliga brev.
          </p>
        </div>
        <ul className="flex flex-col items-center justify-center my-10  max-w-lg mx-auto pb-10">
          <div className="border-gray-400 border-dashed border-2 h-[230px] w-[90%]  p-4 flex justify-between rounded-[20px] mb-4  items-center">
            <p className="text-xl">
              {" "}
              Dina framtida sparade personliga brev hamnar här.
            </p>
          </div>
        </ul>
      </div>
      <Footer />
    </>
  );
}
export default NoEarlierCoverLetter;

// Still to do:
// fix boxes centering
// Center hitta jobb
// fix Arrow icon size and position
