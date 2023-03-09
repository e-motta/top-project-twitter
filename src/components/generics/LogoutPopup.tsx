import { useLogOut } from "../../firebase/authHooks";
import NetworkError from "../pages/NetworkError";

const LogoutPopup = () => {
  const { logOut, isError } = useLogOut();

  if (isError) {
    return <NetworkError />;
  }

  return (
    <button
      className="absolute bottom-[2px] right-0 -translate-x-1/2 
        sm:translate-x-[140px]"
      onClick={logOut}
    >
      <div
        className="flex items-center h-12 w-32 rounded-lg bg-white border 
          drop-shadow-md hover:bg-gray-100"
      >
        <span className="font-bold px-4">Logout</span>
      </div>
    </button>
  );
};

export default LogoutPopup;
