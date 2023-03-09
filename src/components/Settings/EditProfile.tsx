import Header from "../Header/Header";
import Loading from "../generics/Loading";
import { useUserInfo } from "../../service/hooks/usersHooks";
import { useAuthUserUsername } from "../../service/hooks/useAuthUserUsername";
import NotFound from "../generics/NotFound";
import NetworkError from "../generics/NetworkError";
import UserInfoForm from "../UserInfoForm/UserInfoForm";
import { useEffect } from "react";

const EditProfile = () => {
  useEffect(() => {
    document.title = "Edit profile / Twitter";
  }, []);

  const {
    username,
    isLoading: isUsernameLoading,
    isError: isUsernameError,
  } = useAuthUserUsername();

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

        <UserInfoForm redirectTo={`/${userInfo.username ?? ""}`} />
      </div>
    );

  return null;
};

export default EditProfile;
