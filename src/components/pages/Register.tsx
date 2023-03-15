import { useNavigate } from "react-router-dom";
import TwitterLogo from "../../assets/twitter-logo-blue.png";
import { useLogOut } from "../../firebase/authHooks";
import { useUserInfo } from "../../service/hooks/usersHooks";
import { useAuthUserUsernameAndEmail } from "../../service/hooks/useAuthUserUsername";
import Loading from "../generics/Loading";
import NetworkError from "./NetworkError";
import { useEffect } from "react";
import UserInfoForm from "../generics/UserInfoForm/UserInfoForm";

const Register = () => {
  useEffect(() => {
    document.title = "Sign Up / Twitter";
  }, []);

  const { logOut, isError } = useLogOut();
  const navigate = useNavigate();

  const {
    username,
    isLoading: isUsernameLoading,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
  } = useAuthUserUsernameAndEmail();

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isSuccess: isUserInfoSuccess,
    isError: isUserInfoError,
  } = useUserInfo(username);

  if (isUsernameLoading || isUserInfoLoading) {
    return <Loading />;
  }

  if (isError || isUsernameError || isUserInfoError) {
    return <NetworkError />;
  }

  if (isUsernameSuccess && isUserInfoSuccess && userInfo !== null) {
    navigate("/");
  }

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
              You can also upload an avatar and a background picture for your
              profile.
            </span>
            <span>
              <button
                className="text-red-300 text-sm hover:text-red-400"
                onClick={logOut}
              >
                Or click here to cancel.
              </button>
            </span>
          </div>
        </div>

        <UserInfoForm />
      </div>
    </div>
  );
};

export default Register;
