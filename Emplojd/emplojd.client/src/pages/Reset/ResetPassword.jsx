import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header/HeaderLandingpage";
import { FaEnvelope } from "react-icons/fa";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import FormRow from "../../components/FormRow";
import { useMutation } from "react-query";
import { useState } from "react";
import { toast } from "react-toastify";
import EmplojdLogo from "../../components/Icons/EmplojdLogoSVG";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();
  const resetPasswordMutation = useMutation(
    async () => {
      const userId = searchParams.get("userId");
      const code = searchParams.get("code");

      if (!userId || !code) {
        throw new Error("Missing userId or code in query parameters");
      }

      const response = await axios.post(
        "https://localhost:54686/reset-password",
        {
          newPassword: password,
          newPasswordConfirm: passwordConfirm,
        },
        {
          params: { userId: userId, code: code },
        }
      );

      return response.data;
    },
    {
      onSuccess: (data) => {
        toast.success("Lösenordet har återställts!");
        navigate("/signin");
        console.log("Response:", data);
      },
      onError: (error) => {
        toast.error(error.response.data.detail);
        console.error("Error resetting password:", error);
      },
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    resetPasswordMutation.mutate();
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
  }

  function handlePasswordConfirmChange(e) {
    setPasswordConfirm(e.target.value);
  }

  return (
    <>
      <div className="flex flex-col h-screen pb-12 md:pb-52">
        <div className="flex-grow inner-shadow-bottom bg-gradient-to-br to-[#CA81ED] from-[#4086C6] dark:bg-gradient-to-t dark:from-purple-800 dark:to-slate-500 bg-cover bg-no-repeat">
          <Header>
            <EmplojdLogo className="w-28 fill-white" />
          </Header>
          <div className="p-6 max-w-lg mx-auto  text-white h-full flex item-center justify-center flex-col gap-3 mt-14">
            <h1 className="text-4xl font-semibold text-center mb-10">
              Återställ lösenord
            </h1>
            <p>{status}</p>
          </div>
        </div>

        <form className="m-5 my-12" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormRow
              type="password"
              name="password"
              labelText="Nytt lösenord"
              value={password}
              handleChange={handlePasswordChange}
              placeholder="●●●●●●●●●●●●"
            />

            <FormRow
              type="password"
              name="passwordConfirmed"
              labelText="Bekräfta lösenord"
              value={passwordConfirm}
              handleChange={handlePasswordConfirmChange}
              placeholder="●●●●●●●●●●●●"
            />

            <button
              type="submit"
              className="w-full bg-sky-500 h-16 rounded-xl text-white text-xl hover:bg-[#045199] active:bg-[#066DCC] mb-2 flex px-8 justify-between items-center font-semibold"
            >
              Återställ lösenord
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ResetPassword;
