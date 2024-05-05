import React, { useState } from "react";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initalState = {
  email: "",
  confirmEmail: "",
  password: "",
  confirmPassword: "",
  isMember: true,
};

const AuthForm = () => {
  const [values, setValues] = useState(initalState);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, confirmEmail, password, confirmPassword, isMember } = values;
    if (!email || !password) {
      toast.error("Email och lösenord är obligatoriska.");
      return;
    }

    if (!isMember && (email !== confirmEmail || password !== confirmPassword)) {
      toast.error("Bekräftelse av email eller lösenord matchar inte.");
      return;
    }

    login(email, password);
    toast.success(isMember ? "Inloggning lyckades!" : "Registrering lyckades!");
    navigate("/profile");
  };

  const toggleForm = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <form className="m-5 my-12" onSubmit={onSubmit}>
      <FormRow
        type="email"
        name="email"
        labelText="Email"
        value={values.email}
        handleChange={handleChange}
        placeholder="your.email@email.com"
      />
      {!values.isMember && (
        <FormRow
          type="email"
          name="confirmEmail"
          labelText="Bekräfta Email"
          value={values.confirmEmail}
          handleChange={handleChange}
          placeholder="confirm.email@email.com"
        />
      )}
      <FormRow
        type="password"
        name="password"
        labelText="Lösenord"
        value={values.password}
        handleChange={handleChange}
        placeholder="●●●●●●●●●●●●"
      />
      {!values.isMember && (
        <FormRow
          type="password"
          name="confirmPassword"
          labelText="Bekräfta Lösenord"
          value={values.confirmPassword}
          handleChange={handleChange}
          placeholder="●●●●●●●●●●●●"
        />
      )}
      <div className="flex justify-end pb-6">
        <div className="underline underline-offset-2 text-[#045199]">
          Glömt ditt konto?
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <button
          className="w-full bg-[#0783F6] h-14 rounded-xl text-white text-xl hover:bg-[#045199] active:bg-[#066DCC] mb-2"
          type="submit"
        >
          {!values.isMember ? "SKAPA DITT KONTO" : "LOGGA IN"}
        </button>
        <div className="flex justify-center gap-4">
          <div>
            {!values.isMember
              ? "Har du redan ett konto?"
              : "Har du inget konto?"}
          </div>
          <button
            className="text-[#066DCC] underline underline-offset-2"
            type="button"
            onClick={toggleForm}
          >
            {!values.isMember ? "Logga In" : "Skapa konto"}
          </button>
        </div>
      </div>
    </form>
  );
};

export default AuthForm;
