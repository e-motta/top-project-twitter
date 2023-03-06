import { Link } from "react-router-dom";
import Button from "../buttons/Button";

const Footer = () => {
  return (
    <footer className="bg-sky-500 p-3 fixed w-full left-0 bottom-0 flex justify-center">
      <div className="w-[790px] flex justify-between items-center">
        <div className="text-white">
          <div className="text-lg sm:text-2xl">
            {"Don't miss what's happening"}
          </div>
          <div className="text-sm hidden sm:block">
            People on Twitter are the first to know.
          </div>
        </div>
        <Link to="/login">
          <Button className="font-bold bg-white">Log in</Button>
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
