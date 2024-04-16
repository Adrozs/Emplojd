import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";

const LoginPage = () => <AuthForm type="login" />;

function SignIn() {
  return (
  <>
    <div className="w-full h-72 bg-stone-400 mb-8"></div>
    <LoginPage />;
  </>
)}

export default SignIn;
