import Header from "../components/Header";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader";
function AppLayout() {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      <Header />
      {isLoading && <Loader />}
      <main>
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
