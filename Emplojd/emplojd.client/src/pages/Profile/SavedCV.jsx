import React from "react";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";
import Footer from "../../components/Footer";
import CvManager from "../../components/CvManager";

function SavedCV() {
  return (
    <div className="dark:bg-slate-800">
      <HeaderOtherPages />
      <CvManager />
      <Footer />
    </div>
  );
}

export default SavedCV;

