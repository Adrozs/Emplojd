import React, { useState } from "react";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const initalState = {
  name: "",
  lastname: "",
  email: "",
  password: "",
  isMember: true,
};

const AuthForm = () => {
  const [values, setValues] = useState(initalState);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { name, email, password, isMember } = values;
    if (!email || !password || (!isMember && !name)) {
      toast.error("Klart du får logga in <3");
      login();
      navigate("/profile");
      return;
    } else {
      toast.success("Välkommen in " + email);
      login();
      navigate("/profile");

      return;
    }
  };

  const toggleForm = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <form className="m-5" onSubmit={onSubmit}>
      {!values.isMember && (
        <>
          <FormRow
            type="text"
            name="name"
            labelText="Förnamn"
            value={values.name}
            handleChange={handleChange}
            placeholder="Förnamn"
          />
          <FormRow
            type="text"
            name="lastname"
            labelText="Efternamn"
            value={values.lastname}
            handleChange={handleChange}
            placeholder="Efternamn"
          />
        </>
      )}
      <FormRow
        type="email"
        name="email"
        labelText="Email"
        value={values.email}
        handleChange={handleChange}
        placeholder="din@email.se"
      />
      <FormRow
        type="password"
        name="password"
        labelText="Lösenord"
        value={values.password}
        handleChange={handleChange}
        placeholder="Lösenord"
      />

      <div className="flex justify-between pb-6">
        <div className="flex">
          <input type="checkbox" />
          <h6 className="ml-1 text-xs">KOM IHÅG MIG</h6>
        </div>
        <p className="text-xs">GLÖMT LÖSENORD</p>
      </div>

      <div className="flex flex-col gap-6">
        <button
          className="w-full bg-[#0783F6] h-14 rounded-xl text-white text-xl hover:bg-[#045199] active:bg-[#066DCC]"
          type="submit"
        >
          {!values.isMember ? "SKAPA DITT KONTO" : "LOGGA IN"}
        </button>
        <div className="flex justify-center text-xl">eller</div>
        <button
          className="w-full border-[#0783F6] text-[#0783F6] text-xl border-2 rounded-xl h-14 hover:border-[#045199] hover:text-[#045199] active:border-[#066DCC] active:text-[#066DCC]"
          type="button"
          onClick={toggleForm}
        >
          {!values.isMember ? "LOGGA IN ISTÄLLET" : "SKAPA KONTO"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
