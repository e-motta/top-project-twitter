import Header from "../../components/Header/Header";
import Loading from "../../components/Loading";
import { useUserInfo } from "../../backend/service/hooks/usersHooks";
import { useAuthUserUsernameAndEmail } from "../../backend/service/hooks/useAuthUserUsername";
import NetworkError from "../NetworkError";
import { useEffect } from "react";
import NotFound from "../NotFound";
import UserInfoForm from "../../components/UserInfoForm/UserInfoForm";

const EditProfile = () => {
  useEffect(() => {
    document.title = "Edit profile / Twitter";
  }, []);

  const {
    username,
    isLoading: isUsernameLoading,
    isError: isUsernameError,
  } = useAuthUserUsernameAndEmail();

  const {
    data: userInfo,
    isSuccess: isUserInfoSuccess,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useUserInfo(username);

  if (isUsernameLoading || isUserInfoLoading) {
    return <Loading />;
  }

  if (isUserInfoSuccess && userInfo === null) {
    return <NotFound />;
  }

  if (isUsernameError || isUserInfoError) {
    return <NetworkError />;
  }

  if (isUserInfoSuccess && userInfo !== null)
    return (
      <div>
        <Header
          mainText={userInfo.name}
          subText={`@${userInfo.username ?? ""}`}
          showBackBtn
        />

        <UserInfoForm />
      </div>
    );

  return null;
};

export default EditProfile;
