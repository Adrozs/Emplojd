import { Link } from "react-router-dom";
import AuthForm from "../../components/AuthForm";

const LoginPage = () => <AuthForm type="login" />;

function SignIn() {
  return <LoginPage />;
}

export default SignIn;
