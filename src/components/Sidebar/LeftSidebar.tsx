import TwitterLogo from "../../assets/twitter-logo-blue.png";
import { Link } from "react-router-dom";
import NavSidebarButton from "./NavSidebarButton";

const LeftSidebar = () => {
  return (
    <nav className="min-h-screen px-4 py-1 flex flex-col items-start gap-3 md:w-48">
      <Link to={"/"}>
        <div className="p-3 rounded-full transition-all hover:bg-blue-50">
          <img src={TwitterLogo} alt="twitter logo" className="h-6 w-6" />
        </div>
      </Link>
      <NavSidebarButton type="home" />
      <NavSidebarButton type="profile" />
      <NavSidebarButton type="settings" />
    </nav>
  );
};

export default LeftSidebar;
