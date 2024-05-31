import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header/HeaderLandingpage";

const LoginPage = () => <AuthForm type="login" />;

function SignIn() {
  return (
    <>
      <div
        className="flex flex-col h-screen dark:bg-gray-800"
      >
        <div className="flex-grow bg-gradient-to-140-sky-violet dark:bg-dark-gradient-to-140-purple-slate inner-shadow-bottom">
          <Header>
            {" "}
            <h1 className="font-Glockenspiel text-2xl cursor-pointer text-white">
              EMPLOJD
            </h1>
          </Header>
        </div>
          <LoginPage/>
      </div>
    </>
  );
}

export default SignIn;
