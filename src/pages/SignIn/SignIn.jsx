import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header/HeaderLandingpage";

const LoginPage = () => <AuthForm type="login" />;

function SignIn() {
  return (
    <>
      <div
        className="flex flex-col h-screen"
      >
        <div className="flex-grow bg-gradient-to-r-custom inner-shadow-bottom">
          <Header>
            {" "}
            <h1 className="text-xl font-Glockenspiel cursor-pointer text-white">
              EMPLOJD
            </h1>
          </Header>
        </div>
          <LoginPage />
      </div>
    </>
  );
}

export default SignIn;
