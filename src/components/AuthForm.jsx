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
    <form onSubmit={handleSubmit}>
      {isSignUp && (
        <>
        <div className="flex justify-center">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="First Name"
          />
        </div>
        <div className="flex justify-center">
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            name="lastname"
            value={lastname}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
          />
        </div>
      </>
      )}
      <div className="flex justify-center">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>
      <div className="flex justify-center">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>
      <div className="flex flex-col">
        <button type="submit">{isSignUp ? "Sign Up" : "Log In"}</button>
        <button type="button" onClick={toggleForm}>
          {isSignUp ? "Already have an account?" : "Need an account? Sign Up"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
