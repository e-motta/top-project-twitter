import { Link } from "react-router-dom";
import Button from "../generics/Button";
import Avatar from "../generics/Avatar";
import {
  useAuthUserUsername,
  useUserInfo,
  useUsersByIdLazy,
} from "../../firebase/hooks";
import Loading from "../generics/Loading";
import { useEffect, useState } from "react";
import { type User } from "../../types";
import NetworkError from "../generics/NetworkError";
import InfiniteScroll from "react-infinite-scroll-component";

const FollowsUsers = ({
  userInfo,
  selected,
}: {
  userInfo: User;
  selected: "followers" | "following";
}) => {
  const { username: authUserUsername } = useAuthUserUsername();
  const { data: authUserInfo } = useUserInfo(authUserUsername ?? "");
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
              {authUserFollowing === undefined ||
              authUserFollowing.includes(f.id ?? "") ? (
                <Button className="font-bold hover:bg-gray-100" outlined>
                  Following
                </Button>
              ) : (
                <Button className="text-white bg-black font-bold">
                  Follow
                </Button>
              )}
            </div>
          ))}
        </InfiniteScroll>
      </>
    );

  return null;
};

export default FollowsUsers;