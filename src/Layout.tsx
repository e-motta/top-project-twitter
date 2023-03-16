import { Outlet, useNavigate } from "react-router-dom";
import Footer from "./components/generics/Footer/Footer";
import { useContext, useEffect } from "react";
import { AuthContext } from "./firebase/AuthContext";
import Delayed from "./components/generics/Delayed";
import LeftSidebar from "./components/generics/Sidebar/LeftSidebar";
import { useAuthUserUsernameAndEmail } from "./service/hooks/useAuthUserUsername";
import NetworkError from "./components/pages/NetworkError";

const Layout = () => {
  const authUser = useContext(AuthContext);
  const navigate = useNavigate();

  const {
    username,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
  } = useAuthUserUsernameAndEmail();

  useEffect(() => {
    if (isUsernameSuccess && username === null) {
      navigate("/signup");
    }
  }, [isUsernameSuccess, username]);

  if (isUsernameError) return <NetworkError />;

  return (
    <div id="main-container" className="flex justify-center">
      <div className="hidden sm:block z-50">
        <LeftSidebar />
      </div>
      <main className="border-x w-full max-w-[600px] border-slate-100">
        <div className="relative h-screen">
          <Outlet />
        </div>
      </main>
      {authUser === null && (
        <Delayed>
          <Footer />
        </Delayed>
      )}
    </div>
  );
};

export default Layout;
