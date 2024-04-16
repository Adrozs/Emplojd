import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const AuthForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastName] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignUp) {
      console.log("Signup attempt with:", name, lastname, username, password);
      navigate("/profile");
    } else {
      console.log("Login attempt with:", username, password);
      login();
      navigate("/profile");
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <form className="m-5" onSubmit={handleSubmit}>
      {isSignUp && (
        <>
          <div className="flex flex-col pb-6">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="First Name"
              className="h-12 bg-stone-400 text-black placeholder-black pl-3"
            />
          </div>
          <div className="flex flex-col pb-6">
            <label htmlFor="lastname">Last Name:</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              value={lastname}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last Name"
              className="h-12 bg-stone-400 text-black placeholder-black pl-3"
            />
          </div>
        </>
      )}
      <div className="flex flex-col pb-6">
        <label htmlFor="username">Email:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="your@email.com"
          className="h-12 bg-stone-400 text-black placeholder-black pl-3"
        />
      </div>
      <div className="flex flex-col pb-2">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="h-12 bg-stone-400 text-black placeholder-black pl-3"
        />
      </div>
      <div className="flex justify-between pb-6">
        <div className="flex">
          <input type="checkbox" />
          <h6 className="ml-1 text-xs">KOM IHÅG MIG</h6>
        </div>
        <p className="text-xs">GLÖMT LÖSENORD</p>
      </div>

      <div className="flex flex-col gap-6">
        <button className="w-full bg-stone-500 h-14" type="submit">
          {isSignUp ? "SKAPA DITT KONTO" : "LOGGA IN"}
        </button>
        <button
          className="w-full bg-stone-300 h-14"
          type="button"
          onClick={toggleForm}
        >
          {isSignUp ? "LOGGA IN ISTÄLLET" : "SKAPA KONTO"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
