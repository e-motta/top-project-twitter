import NavButton from "../../components/buttons/NavButton";
import { Link, useParams } from "react-router-dom";
import { formatNumWithPrefix } from "../../lib/stringFormattingUtils";
import {
  useFollowersCount,
  useTweetsCount,
} from "../../backend/service/hooks/tweetsHooks";
import { useUserInfo } from "../../backend/service/hooks/usersHooks";
import { useAuthUserUsernameAndEmail } from "../../backend/service/hooks/useAuthUserUsername";
import NetworkError from "../NetworkError";
import EditProfileButton from "../../components/buttons/EditProfileButton";
import FollowButton from "../../components/buttons/FollowButton";
import FollowingButton from "../../components/buttons/FollowingButton";
import { useEffect } from "react";
import NotFound from "../NotFound";
import Loading from "../../components/Loading";
import Header from "../../components/Header/Header";
import Avatar from "../../components/Avatar";
import TweetsTimeline from "../../components/Tweets/TweetsTimeline";

const Profile = () => {
  const { username: authUserUsername } = useAuthUserUsernameAndEmail();
  const {
    data: authUserInfo,
    addToFollowing,
    removeFromFollowing,
  } = useUserInfo(authUserUsername ?? "");
  const authUserFollowing = authUserInfo?.following;

  const { username } = useParams();

  const {
    data: profileInfo,
    isLoading: isProfileInfoLoading,
    isSuccess: isProfileInfoSuccess,
    isError: profileInfoIsError,
  } = useUserInfo(username ?? "");

  useEffect(() => {
    const title = `${profileInfo?.name ?? ""} (@${
      profileInfo?.username ?? ""
    })`;
    document.title =
      profileInfo?.name !== undefined ? `${title} / Twitter` : "Twitter";
  }, [
    JSON.stringify(profileInfo?.name),
    JSON.stringify(profileInfo?.username),
  ]);

  const { data: tweetsCount, isError: isTweetsCountError } = useTweetsCount(
    profileInfo?.id ?? ""
  );

  const {
    data: followersCount,
    isLoading: isFollowersCountLoading,
    isError: isFollowersCountError,
  } = useFollowersCount(profileInfo?.id ?? "");

  if (isProfileInfoLoading) {
    return <Loading />;
  }

  if (profileInfoIsError || isFollowersCountError || isTweetsCountError) {
    return <NetworkError />;
  }

  if (isProfileInfoSuccess && profileInfo === null) {
    return <NotFound />;
  }

  if (isProfileInfoSuccess && profileInfo !== null)
    return (
      <div className="flex flex-col py-1">
        <Header
          mainText={profileInfo.name ?? ""}
          subText={tweetsCount !== null ? `${tweetsCount} Tweets` : ""}
          showBackBtn
          altBackBtnHref="/"
        />

        <div
          id="bg-img"
          className={`max-h-48 aspect-[25/8] relative ${
            profileInfo.background_image_url === null ? "bg-gray-300" : ""
          }`}
        >
          {profileInfo === null ||
            profileInfo.background_image_url === null || (
              <img
                src={profileInfo.background_image_url ?? ""}
                alt="background image"
              />
            )}
          <div
            className="absolute -bottom-2 left-0 translate-y-1/2 p-1 bg-white 
          rounded-full ml-4"
          >
            <Avatar
              size="lg"
              url={profileInfo.profile_image_url}
              username={username ?? ""}
            />
          </div>
        </div>

        <div id="profile-info" className="flex flex-col pb-5">
          <div className="h-20 flex justify-end items-start px-3 py-5">
            {authUserUsername === username ? (
              <EditProfileButton />
            ) : authUserFollowing === undefined ||
              authUserFollowing.includes(profileInfo.id ?? "") ? (
              <FollowingButton
                authUserId={authUserInfo?.id ?? ""}
                followUserId={profileInfo.id ?? ""}
                addToFollowing={addToFollowing}
                removeFromFollowing={removeFromFollowing}
              />
            ) : (
              <FollowButton
                authUserId={authUserInfo?.id ?? ""}
                followUserId={profileInfo.id ?? ""}
                addToFollowing={addToFollowing}
                removeFromFollowing={removeFromFollowing}
              />
            )}
          </div>
          <div className="flex flex-col px-4">
            <span className="font-bold text-xl">{profileInfo.name}</span>
            <span className="text-[.95rem] text-gray-500">
              @{profileInfo.username}
            </span>
          </div>
          {isFollowersCountLoading || (
            <div className="text-sm flex gap-4 px-4 mt-3">
              <Link
                to={`/${profileInfo.username ?? ""}/following`}
                className="flex gap-1"
              >
                <span className="font-bold">
                  {formatNumWithPrefix(profileInfo.following.length ?? 0, 1)}
                </span>
                <span className="text-gray-500">Following</span>
              </Link>
              <Link
                to={`/${profileInfo.username ?? ""}/followers`}
                className="flex gap-1"
              >
                <span className="font-bold">
                  {formatNumWithPrefix(followersCount ?? 0, 1)}
                </span>
                <span className="text-gray-500">Followers</span>
              </Link>
            </div>
          )}
        </div>

        <div id="nav">
          <nav className="flex border-b border-slate-100">
            <NavButton to="" selected>
              Tweets
            </NavButton>
            <NavButton to="" notImplemented>
              Replies
            </NavButton>
            <NavButton to="" notImplemented>
              Media
            </NavButton>
            <NavButton to="" notImplemented>
              Likes
            </NavButton>
          </nav>
        </div>

        <div id="tweets" className="relative">
          <TweetsTimeline userIds={[profileInfo?.id ?? ""]} />
        </div>
      </div>
    );

  return null;
};

export default Profile;
