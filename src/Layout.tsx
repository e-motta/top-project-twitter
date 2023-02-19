import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import LeftSidebar from "./components/Sidebar/LeftSidebar";
import { useContext } from "react";
import { UserContext } from "./firebase/UserContext";
import Delayed from "./components/generics/Delayed";

const Layout = () => {
  const user = useContext(UserContext);

  return (
    <div className="flex justify-center">
      <div className="hidden sm:block z-50">
        <LeftSidebar />
      </div>
      <main className="border-x w-full max-w-[600px] border-slate-100">
        <div className="relative h-screen">
          <Outlet />
        </div>
      </main>
      {user === null && (
        <Delayed>
          <Footer />
        </Delayed>
      )}
    </div>
  );
};

export default Layout;
