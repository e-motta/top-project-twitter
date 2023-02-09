import { useLogOut } from "../../firebase/hooks";

const LogoutPopup = () => {
  const logOut = useLogOut();

  return (
    <button
      className="absolute bottom-0 right-0 -translate-x-1/2 
        sm:translate-x-full"
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
