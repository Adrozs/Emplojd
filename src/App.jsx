//Imports
import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// Pages
import SignIn from "./pages/SignIn/SignIn";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import JobSearch from "./pages/JobSearch/JobSearch";
import JobInfo from "./pages/JobInfo/JobInfo";
import Homepage from "./pages/Homepage";
import Header from "./components/Header";

function App() {
  return (
    <main>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="profile" element={<Profile />} />
          <Route path="Jobsearch" element={<JobSearch />} />
          <Route path="jobinfo" element={<JobInfo />} />
          <Route path="signin" element={<SignIn />} />
        </Routes>
      </BrowserRouter>
    </main>
  );
}

export default App;
