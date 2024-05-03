import AuthForm from "../../components/AuthForm";
import Header from "../../components/Header/HeaderLandingpage";

const LoginPage = () => <AuthForm type="login" />;

function SignIn() {
  return (
    <>
      <div
        className="flex flex-col"
        style={{ minHeight: "calc(100vh - 65px)" }}
      >
        <div className="flex-grow bg-gradient-to-r-custom">
          <Header>
            {" "}
            <h1 className="text-xl font-Glockenspiel cursor-pointer text-white">
              EMPLOJD
            </h1>
          </Header>
        </div>
        <div className="my-8 ">
          <LoginPage />
        </div>
      </div>
    </>
  );
}

export default SignIn;
