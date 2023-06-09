import NavButton from "../../components/buttons/NavButton";
import {
  useUserInfo,
  useAllUserIds,
} from "../../backend/service/hooks/usersHooks";
import { useAuthUserUsernameAndEmail } from "../../backend/service/hooks/useAuthUserUsername";
import NetworkError from "../NetworkError";
import { useEffect, useMemo, useState } from "react";
import Loading from "../../components/Loading";
import Header from "../../components/Header/Header";
import TweetsTimeline from "../../components/Tweets/TweetsTimeline";

const Home = () => {
  useEffect(() => {
    document.title = "Home / Twitter";
  }, []);

  const [selectedNav, setSelectedNav] = useState<"for-you" | "following">(
    "for-you"
  );

  const {
    username,
    isLoading: isUsernameLoading,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
  } = useAuthUserUsernameAndEmail();

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isError: isUserInfoError,
  } = useUserInfo(username);

  const followingUserIds = useMemo(() => {
    return userInfo !== undefined && userInfo !== null
      ? [...userInfo.following, userInfo.id ?? "?"]
      : null;
  }, [userInfo]);

  const {
    data: allUserIds,
    isLoading: isAllUserIdsLoading,
    isError: isAllUserIdsError,
  } = useAllUserIds();

  const tweetsUserIds =
    selectedNav === "following" ? followingUserIds : allUserIds;

  if (
    isUsernameLoading ||
    isUserInfoLoading ||
    isAllUserIdsLoading ||
    isAllUserIdsError
  ) {
    return <Loading />;
  }

  if (isUsernameError || isUserInfoError) {
    return <NetworkError />;
  }

  if (isUsernameSuccess)
    return (
      <div id="home-container" className="min-h-screen flex flex-col">
        <Header mainText="Home" />

        <nav className="flex border-b border-slate-100">
          <NavButton
            id="for-you"
            to=""
            selected={selectedNav === "for-you"}
            onClick={setSelectedNav}
          >
            For you
          </NavButton>
          {username !== null && (
            <NavButton
              id="following"
              to=""
              selected={selectedNav === "following"}
              onClick={setSelectedNav}
            >
              Following
            </NavButton>
          )}
        </nav>

        {/* {isUsernameSuccess && userInfo !== null && (
          <TweetInput userInfo={userInfo} />
        )} */}
        {isUsernameSuccess && (
          <TweetsTimeline
            userIds={tweetsUserIds}
            showTweetInput
            userInfo={userInfo}
            key={JSON.stringify(tweetsUserIds)}
          />
        )}
      </div>
    );

  return null;
};

export default Home;
