import { useNavigate } from "react-router-dom";
import Button from "../buttons/Button";

const NetworkError = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center pt-24 gap-6">
      <span className="text-gray-500">
        {"Something is wrong. Try again later."}
      </span>
      <Button
        className="bg-sky-500 text-white font-bold"
        onClick={() => {
          navigate(0);
        }}
      >
        Refresh
      </Button>
    </div>
  );
};

export default NetworkError;
