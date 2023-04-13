import { Link } from "react-router-dom";
import {
  useUserInfo,
  useUsersByIdLazy,
} from "../../backend/service/hooks/usersHooks";
import { useAuthUserUsernameAndEmail } from "../../backend/service/hooks/useAuthUserUsername";
import { useEffect, useState } from "react";
import { type User } from "../../domain/types";
import NetworkError from "../NetworkError";
import InfiniteScroll from "react-infinite-scroll-component";
import FollowButton from "../../components/buttons/FollowButton";
import FollowingButton from "../../components/buttons/FollowingButton";
import Loading from "../../components/Loading";
import Avatar from "../../components/Avatar";

const FollowsUsers = ({
  userInfo,
  selected,
}: {
  userInfo: User;
  selected: "followers" | "following";
}) => {
  const { username: authUserUsername } = useAuthUserUsernameAndEmail();
  const {
    data: authUserInfo,
    addToFollowing,
    removeFromFollowing,
  } = useUserInfo(authUserUsername ?? "");
  const authUserFollowing = authUserInfo?.following;

  const [followsUsernames, setFollowsUsernames] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    if (userInfo !== null) setFollowsUsernames([...userInfo[selected], "?"]);
  }, [userInfo]);

  const {
    data: follows,
    loadMore,
    hasMore,
    isSuccess,
    isError,
  } = useUsersByIdLazy(followsUsernames);

  if (isError) {
    return <NetworkError />;
  }

  if (isSuccess && userInfo[selected].length === 0) {
    let title: string;
    let message: string;

    if (selected === "followers") {
      title = "Looking for followers?";
      message =
        "When someone follows this account, they'll show up here. Tweeting and interacting with others helps boost followers.";
    } else {
      title = "This account isn't following anyone";
      message = "Once they follow accounts, they'll show up here.";
    }

    return (
      <div className="mt-10 mx-24 flex flex-col gap-4">
        <h2 className="text-5xl font-bold">{title}</h2>
        <span className="text-gray-500 text-xl">{message}</span>
      </div>
    );
  }

  if (isSuccess && follows !== null)
    return (
      <>
        <InfiniteScroll
          dataLength={follows.length}
          next={loadMore}
          hasMore={hasMore}
          loader={
            <div className="relative h-12">
              <Loading />
            </div>
          }
        >
          {follows.map((f) => (
            <div
              key={f.username}
              className="py-3 px-4 flex justify-between items-center 
                transition-all hover:bg-gray-100"
            >
              <div className="flex gap-3">
                <div>
                  <Avatar
                    size="md"
                    url={f.profile_image_url}
                    username={f.username ?? ""}
                  />
                </div>
                <Link
                  to={`/${f.username ?? ""}`}
                  className="text-[.9rem] flex flex-col"
                >
                  <span className="font-bold hover:underline">{f.name}</span>
                  <span className="text-gray-500">@{f.username}</span>
                </Link>
              </div>
              {authUserInfo?.id === f.id ? null : authUserFollowing ===
                  undefined || authUserFollowing.includes(f.id ?? "") ? (
                <FollowingButton
                  authUserId={authUserInfo?.id ?? ""}
                  followUserId={f.id ?? ""}
                  addToFollowing={addToFollowing}
                  removeFromFollowing={removeFromFollowing}
                />
              ) : (
                <FollowButton
                  authUserId={authUserInfo?.id ?? ""}
                  followUserId={f.id ?? ""}
                  addToFollowing={addToFollowing}
                  removeFromFollowing={removeFromFollowing}
                />
              )}
            </div>
          ))}
        </InfiniteScroll>
      </>
    );

  return null;
};

export default FollowsUsers;
