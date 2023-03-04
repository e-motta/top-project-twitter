import TweetInput from "./TweetInput";
import NavButton from "../generics/NavButton";
import Header from "../Header/Header";
import { useUserInfo, useAuthUserUsername } from "../../firebase/hooks";
import Loading from "../generics/Loading";
import NetworkError from "../generics/NetworkError";
import { useMemo } from "react";
import TweetsTimeline from "../Tweets/TweetsTimeline";

const Home = () => {
  const {
    username,
    isLoading: isUsernameLoading,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
  } = useAuthUserUsername();

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isSuccess: isUserInfoSuccess,
    isError: isUserInfoError,
  } = useUserInfo(username);

  const followingUserIds = useMemo(() => {
    return userInfo !== undefined && userInfo !== null
      ? [...userInfo.following, userInfo.id ?? "?"]
      : null;
  }, [userInfo]);

  if (isUsernameLoading || isUserInfoLoading) {
    return <Loading />;
  }

  if (isUsernameError || isUserInfoError) {
    return <NetworkError />;
  }

  if (isUserInfoSuccess && userInfo !== null)
    return (
      <div id="home-container" className="min-h-screen flex flex-col">
        <Header mainText="Home" />

        <nav className="flex border-b border-slate-100">
          <NavButton to="" selected>
            For You
          </NavButton>
          {username !== null && (
            <NavButton to="" notImplemented>
              Following
            </NavButton>
          )}
        </nav>

        {isUsernameSuccess && <TweetInput userInfo={userInfo} />}

        {isUserInfoSuccess && <TweetsTimeline userIds={followingUserIds} />}
      </div>
    );

  return null;
};

export default Home;
