import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";

const LoginPage = () => <AuthForm type="login" />;

function SignIn() {
  return (
    <>
      <div
        className="flex flex-col"
        style={{ minHeight: "calc(100vh - 50px)" }}
      >
        <div className="flex-grow bg-stone-400"></div>
        <div className="my-8">
          <LoginPage />
        </div>
      </div>
    </>
  );}

export default SignIn;
