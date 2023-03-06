import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center pt-24 gap-6">
      <span className="text-gray-500">{"Hmm...this page doesn't exist."}</span>
      <Button
        className="bg-sky-500 text-white font-bold"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go back
      </Button>
    </div>
  );
};

export default NotFound;
