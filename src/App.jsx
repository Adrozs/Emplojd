import { useState } from "react";
import SignIn from "./pages/SignIn/SignIn";
import SignOut from "./pages/SignOut/SignOut";
import SignUp from "./pages/SignUp/SignUp";
import Profile from "./pages/Profile/Profile";
import JobSearch from "./pages/JobSearch/JobSearch";
import JobInfo from "./pages/JobInfo/JobInfo";


function App() {
  const [count, setCount] = useState(0);

  return <h1 className="text-3xl font-bold underline">Hello ChasGPT!</h1>;
}

export default App;
