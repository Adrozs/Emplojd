import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { toast } from "react-toastify";

const HandleGoogleResponse = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const handleGoogleAuth = async () => {
      try {
        const response = await fetch(
          "https://emplojdserver20240531231628.azurewebsites.net/login-google"
        );
        const data = await response.json();
        if (data.url) {
          window.location.href = data.url;
        } else {
          throw new Error("Failed to get Google login URL");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error(error.message);
        navigate("/login");
      }
    };

    handleGoogleAuth();
  }, [navigate, login]);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const response = await fetch(
          "https://emplojdserver20240531231628.azurewebsites.net//api/google/googleresponse"
        );

        if (response.ok) {
          const data = await response.json();
          const { token, email } = data;

          if (token && email) {
            // console.log("Fetched Data:", { token, email });

            localStorage.setItem("authToken", token);
            login(token, { email, isMember: true });
            navigate("/joblist");
            toast.success("Inloggning med Google lyckades!");
          } else {
            throw new Error("Token eller email saknas i svaret från backend.");
          }
        } else {
          throw new Error("Misslyckades med att hämta autentiseringsdata.");
        }
      } catch (error) {
        console.error("Authentication error:", error);
        toast.error(error.message);
        navigate("/login");
      }
    };

    checkAuthentication();
  }, [navigate, login]);

  return <div>Processing Google authentication...</div>;
};

export default HandleGoogleResponse;
