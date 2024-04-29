import AuthForm from "../../components/AuthForm";
import HeaderOtherPages from "../../components/Header/HeaderOtherPages";

const LoginPage = () => <AuthForm type="login" />;

function SignIn() {
  return (
    <>
      <HeaderOtherPages />
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
  );
}

export default SignIn;