import { EllipsisHorizontalCircleIcon as MoreSolid } from "@heroicons/react/24/solid";
import { EllipsisHorizontalCircleIcon as MoreOutline } from "@heroicons/react/24/outline";
import { useState } from "react";
import Popup from "../generics/Popup";

const NavSidebarButton = ({ type }: { type: "more" }) => {
  const [showPopup, setShowPopup] = useState(false);

  const options = {
    names: {
      more: "More",
    },
    iconsSolid: {
      more: <MoreSolid className="h-6 w-6" />,
    },
    iconsOutline: {
      more: <MoreOutline className="h-6 w-6" />,
    },
  };

  return (
    <div className="relative">
      <button type="button" onClick={() => setShowPopup(!showPopup)}>
        <div
          className="p-3 rounded-full flex text-xl items-center 
          transition-all hover:bg-gray-200"
        >
          {showPopup ? options.iconsSolid[type] : options.iconsOutline[type]}
          <span
            className={`hidden px-4 justify-center md:flex ${
              showPopup && "font-bold"
            }`}
          >
            {options.names[type]}
          </span>
        </div>
      </button>
      {showPopup && <Popup />}
    </div>
  );
};

export default NavSidebarButton;
