import TwitterLogo from "../../assets/twitter-logo-blue.png";
import UserInfoForm from "../UserInfoForm/UserInfoForm";

const Register = () => {
  return (
    <div className="flex justify-center">
      <div className="w-full max-w-[600px]">
        <div className="flex flex-col gap-4 mt-6 mb-4 mx-4 sm:mx-0">
          <div className="flex flex-col gap-4">
            <img src={TwitterLogo} alt="twitter logo" className="h-10 w-10" />
            <h2 className="text-5xl">Finish signing up!</h2>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-gray-500">
              Choose a Name and a Username to finish signing up.
            </span>
            <span className="text-gray-500">
              You can optionally upload an avatar and a background picture.
            </span>
          </div>
        </div>

        <UserInfoForm redirectTo="/" />
      </div>
    </div>
  );
};

export default Register;
