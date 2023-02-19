import TwitterLogo from "../../assets/twitter-logo-blue.png";
import { Link } from "react-router-dom";
import NavSidebarButton from "./NavSidebarButton";
import NavSidebarLink from "./NavSidebarLink";
import { useContext } from "react";
import { UserContext } from "../../firebase/UserContext";
import { useUserHandle } from "./hooks";

const LeftSidebar = () => {
  const user = useContext(UserContext);
  const handle = useUserHandle();

  return (
    <nav className="px-4 py-1 min-h-screen sm:w-[80px] md:w-[200px] flex flex-col justify-between">
      <div className="flex flex-col items-start gap-3 md:w-48 fixed">
        <Link to={"/"}>
          <div className="p-3 rounded-full transition-all hover:bg-blue-50">
            <img src={TwitterLogo} alt="twitter logo" className="h-6 w-6" />
          </div>
        </Link>
        <NavSidebarLink type="home" />
        {user !== null && (
          <>
            <NavSidebarLink type="profile" handle={handle ?? "#"} />
            <NavSidebarLink type="settings" />
            <NavSidebarButton type="more" />
          </>
        )}
      </div>
    </nav>
  );
};

export default LeftSidebar;
