import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthUserUsernameAndEmail } from "./backend/service/hooks/useAuthUserUsername";
import { isEmailRegistered } from "./backend/service/users";

const useRedirectToRegister = () => {
  const navigate = useNavigate();

  const {
    email,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
  } = useAuthUserUsernameAndEmail();

  useEffect(() => {
    const navigateToRegister = async () => {
      if (
        isUsernameSuccess &&
        email !== null &&
        !(await isEmailRegistered(email))
      )
        navigate("/signup");
    };
    void navigateToRegister();
  }, [isUsernameSuccess]);

  return isUsernameError;
};

export default useRedirectToRegister;
