import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header/HeaderLandingpage";
import EmplojdLogo from "../../components/Icons/EmplojdLogoSVG";

const LoginPage = () => <AuthForm type="login" />;

function SignIn() {
  return (
    <>
      <div className="flex flex-col h-screen dark:bg-gray-800">
        <div className="flex-grow bg-gradient-to-140-sky-violet dark:bg-dark-gradient-to-140-purple-slate inner-shadow-bottom">
          <Header>
            {" "}
            <EmplojdLogo className="w-28 fill-white" />
          </Header>
        </div>
        <LoginPage />
      </div>
    </>
  );
}

export default SignIn;
