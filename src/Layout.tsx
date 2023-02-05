import { Outlet } from "react-router-dom";
import Footer from "./components/Footer/Footer";
import LeftSidebar from "./components/Sidebar/LeftSidebar";

const Layout = () => {
  return (
    <div className="flex justify-center">
      <div className="hidden sm:block">
        <LeftSidebar />
      </div>
      <main className="border-x w-full max-w-[600px] border-slate-100">
        <div>
          <Outlet />
        </div>
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default Layout;
