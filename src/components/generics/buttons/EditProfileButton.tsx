import { Link } from "react-router-dom";
import Button from "./Button";

const EditProfileButton = () => {
  return (
    <Link to="/settings/profile">
      <Button className="font-bold hover:bg-gray-100" outlined>
        Edit profile
      </Button>
    </Link>
  );
};

export default EditProfileButton;
