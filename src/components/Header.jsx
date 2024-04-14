import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
      logout();
      navigate('/signin');
      console.log("User signed out.");
  };
  return (
    <header className="flex justify-between">
      <h1>Header</h1>
      {isLoggedIn && (
                <button onClick={handleSignOut}>Sign Out</button>
            )}
    </header>
  );
}

export default Header;
