import { Link, useLocation } from "react-router-dom";
import {
  HomeIcon as HomeIconSolid,
  UserIcon as UserIconSolid,
  Cog6ToothIcon as CogIconSolid,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as HomeIconOutline,
  UserIcon as UserIconOutline,
  Cog6ToothIcon as CogIconOutline,
} from "@heroicons/react/24/outline";

const NavSidebarLink = ({
  type,
}: {
  type: "home" | "profile" | "settings";
}) => {
  const location = useLocation();

  const options = {
    names: {
      home: "Home",
      profile: "Profile",
      settings: "Settings",
    },
    iconsSolid: {
      home: <HomeIconSolid className="h-6 w-6" />,
      profile: <UserIconSolid className="h-6 w-6" />,
      settings: <CogIconSolid className="h-6 w-6" />,
    },
    iconsOutline: {
      home: <HomeIconOutline className="h-6 w-6" />,
      profile: <UserIconOutline className="h-6 w-6" />,
      settings: <CogIconOutline className="h-6 w-6" />,
    },
    paths: {
      home: "/",
      profile: "/profile",
      settings: "/settings/profile",
    },
  };

  const selected = options.paths[type] === location.pathname;

  return (
    <Link to={options.paths[type]}>
      <div className="p-3 rounded-full flex text-xl items-center transition-all hover:bg-gray-200">
        {selected ? options.iconsSolid[type] : options.iconsOutline[type]}
        <span
          className={`hidden px-4 justify-center md:flex ${
            selected ? "font-bold" : ""
          }`}
        >
          {options.names[type]}
        </span>
      </div>
    </Link>
  );
};

export default NavSidebarLink;
