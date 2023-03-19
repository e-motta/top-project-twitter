import { Outlet } from "react-router-dom";
import Footer from "./components/generics/Footer/Footer";
import { useContext } from "react";
import { AuthContext } from "./firebase/AuthContext";
import Delayed from "./components/generics/Delayed";
import LeftSidebar from "./components/generics/Sidebar/LeftSidebar";
import NetworkError from "./components/pages/NetworkError";
import useRedirectToRegister from "./useRedirectToRegister";

const Layout = () => {
  const authUser = useContext(AuthContext);
  const isError = useRedirectToRegister();

  if (isError) return <NetworkError />;

  return (
    <div id="main-container" className="flex justify-center">
      <div className="hidden sm:block z-40">
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
