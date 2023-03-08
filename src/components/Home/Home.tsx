import TweetInput from "./TweetInput";
import NavButton from "../buttons/NavButton";
import Header from "../Header/Header";
import {
  useUserInfo,
  useAuthUserUsername,
  useAllUserIds,
} from "../../firebase/hooks";
import Loading from "../generics/Loading";
import NetworkError from "../generics/NetworkError";
import { useMemo, useState } from "react";
import TweetsTimeline from "../Tweets/TweetsTimeline";

const Home = () => {
  const [selectedNav, setSelectedNav] = useState<"for-you" | "following">(
    "for-you"
  );

  const {
    username,
    isLoading: isUsernameLoading,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
  } = useAuthUserUsername();

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

        {isUsernameSuccess && userInfo !== null && (
          <TweetInput userInfo={userInfo} />
        )}

        <TweetsTimeline
          userIds={tweetsUserIds}
          key={JSON.stringify(tweetsUserIds)}
        />
      </div>
    );

  return null;
};

export default Home;
