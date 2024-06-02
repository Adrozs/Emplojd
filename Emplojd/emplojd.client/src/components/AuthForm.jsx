import React, { useState, useEffect } from "react";
import FormRow from "./FormRow";
import { toast } from "react-toastify";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useMutation } from "react-query";
import customFetch from "../utils/axios";
import { LoginRightArrow, SignUpCirclePlus } from "./Icons/AuthFormSvg";
import ThirdPartyLogin from "./ThirdPartyLogin";

const initialState = {
  email: "",
  emailConfirmed: "",
  password: "",
  passwordConfirmed: "",
  isMember: true,
};
const AuthForm = () => {
  const [values, setValues] = useState(initialState);
  const navigate = useNavigate();
  const { login } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const state = location.state;
    if (state && state.isSignUp) {
      setValues((prev) => ({ ...prev, isMember: false }));
    }
  }, [location]);

  const createUserMutation = useMutation(
    async (user) => {
      const authToken = localStorage.getItem("authToken");
      const response = await customFetch.post("/create-account", user, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success("Registrering lyckades!");
        console.log("Skapad användare:", data);
        const { token } = data;
        login(token, { ...values, isMember: false });
        navigate("/confirm-account");
      },
      onError: (error) => {
        toast.error(error.response.data.detail);
        console.error("Error creating user:", error);
      },
    }
  );

  const signInUserMutation = useMutation(
    async (user) => {
      const authToken = localStorage.getItem("authToken");
      const response = await customFetch.post("/login", user, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success("Välkommen in!");
        console.log("Inloggning lyckades:", data);
        const { token } = data;
        login(token, { ...values, isMember: true });
        navigate("/joblist");
      },
      onError: (error) => {
        toast.error(error.response.data.detail);
        console.error("Error signing in:", error);
      },
    }
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, emailConfirmed, password, passwordConfirmed, isMember } =
      values;
    if (!email || !password) {
      toast.error("Email och lösenord är obligatoriska.");
      return;
    }

    if (
      !isMember &&
      (email !== emailConfirmed || password !== passwordConfirmed)
    ) {
      toast.error("Bekräftelse av email eller lösenord matchar inte.");
      return;
    }

    if (isMember) {
      signInUserMutation.mutate({
        email,
        password,
      });
    } else {
      createUserMutation.mutate({
        email,
        emailConfirmed,
        password,
        passwordConfirmed,
      });
    }
  };

  const toggleForm = () => {
    setValues({ ...values, isMember: !values.isMember });
  };

  return (
    <form
      className="flex flex-col gap-2 m-5 dark:bg-gray-800 dark:text-white"
      onSubmit={onSubmit}
    >
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
          name="emailConfirmed"
          labelText="Bekräfta email"
          value={values.emailConfirmed}
          handleChange={handleChange}
          placeholder="confirm.email@email.com"
          compareValue={email.value}
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
          name="passwordConfirmed"
          labelText="Bekräfta lösenord"
          value={values.passwordConfirmed}
          handleChange={handleChange}
          placeholder="●●●●●●●●●●●●"
          compareValue={password.value}
        />
      )}
      <div className="flex justify-end pb-2">
        <Link
          to="/forgot-password"
          className="underline underline-offset-2 text-[#045199] dark:text-sky-600"
        >
          Glömt ditt konto?
        </Link>
      </div>

      <div className="flex flex-col gap-2">
        <button
          className="w-full bg-[#0783F6] h-16 rounded-xl text-white text-xl hover:bg-[#045199] active:bg-[#066DCC] dark:bg-sky-800 dark:hover:bg-sky-700 dark:active:bg-sky-600 flex px-8 justify-between items-center"
          type="submit"
        >
          {values.isMember ? (
            <>
              Logga in <LoginRightArrow />
            </>
          ) : (
            <>
              Skapa konto <SignUpCirclePlus />
            </>
          )}
        </button>
      </div>
      <div className="my-3">{values.isMember && <ThirdPartyLogin />}</div>
      <div className="flex justify-center gap-4">
        <div>
          {!values.isMember ? "Har du redan ett konto?" : "Har du inget konto?"}
        </div>
        <button
          className="text-[#066DCC] dark:text-sky-600 underline underline-offset-2 mb-2"
          type="button"
          onClick={toggleForm}
        >
          {!values.isMember ? "Logga In" : "Skapa konto"}
        </button>
      </div>
    </form>
  );
};

export default AuthForm;
