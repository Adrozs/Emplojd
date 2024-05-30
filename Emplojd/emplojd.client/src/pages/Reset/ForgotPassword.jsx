import axios from "axios";
import Footer from "../../components/Footer";
import Header from "../../components/Header/HeaderLandingpage";
import { FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import FormRow from "../../components/FormRow";
import { useMutation } from "react-query";
import { useState } from "react";
import { toast } from "react-toastify";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const forgotPasswordMutation = useMutation(
    async () => {
      const response = await axios.post(
        "https://localhost:54686/forgot-password",
        {
          email: email,
        }
      );
      return response;
    },
    {
      onSuccess: (data) => {
        toast.success("E-post har skickats!");
        console.log("Visa data:", data);
      },
      onError: (error) => {
        toast.error(error.response.data.detail);
        console.error("Error sending email:", error);
      },
    }
  );

  function handleSubmit(e) {
    e.preventDefault();
    forgotPasswordMutation.mutate();
  }

  function handleEmailChange(e) {
    setEmail(e.target.value);
  }

  return (
    <>
      <div className="flex flex-col h-screen pb-12 md:pb-52">
        <div className="flex-grow bg-gradient-to-r-custom inner-shadow-bottom">
          <Header>
            <h1 className="font-Glockenspiel text-2xl cursor-pointer text-white">
              EMPLOJD
            </h1>
          </Header>
          <div className="p-6 max-w-lg mx-auto  text-white h-full flex item-center justify-center flex-col gap-3 mt-14">
            <h1 className="text-4xl font-semibold text-center mb-10">
              Glömt lösenord
            </h1>
          </div>
        </div>

        <form className="m-5 my-12" onSubmit={handleSubmit}>
          <div className="flex flex-col gap-4">
            <FormRow
              type="email"
              name="email"
              labelText="Skriv in din e-post"
              value={email}
              handleChange={handleEmailChange}
              placeholder="your.email@email.com"
            />

            <button
              type="submit"
              className="w-full bg-sky-500 h-16 rounded-xl text-white text-xl hover:bg-[#045199] active:bg-[#066DCC] mb-2 flex px-8 justify-between items-center font-semibold"
            >
              Skicka email <FaEnvelope size={22} />
            </button>
          </div>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default ForgotPassword;
