import TwitterLogo from "../../assets/twitter-logo-blue.png";
import { Link } from "react-router-dom";
import NavSidebarButton from "./NavSidebarButton";
import NavSidebarLink from "./NavSidebarLink";

const LeftSidebar = () => {
  return (
    <nav className="px-4 py-1 min-h-screen flex flex-col justify-between ">
      <div className="flex flex-col items-start gap-3 md:w-48">
        <Link to={"/"}>
          <div className="p-3 rounded-full transition-all hover:bg-blue-50">
            <img src={TwitterLogo} alt="twitter logo" className="h-6 w-6" />
          </div>
        </Link>
        <NavSidebarLink type="home" />
        <NavSidebarLink type="profile" />
        <NavSidebarLink type="settings" />
      </div>
      <div className="pb-9">
        <NavSidebarButton type="more" />
      </div>
    </nav>
  );
};

export default LeftSidebar;
