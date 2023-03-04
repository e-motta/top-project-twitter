import { Link } from "react-router-dom";
import Button from "../generics/Button";
import Avatar from "../generics/Avatar";
import { useUsersByUsernamesLazy } from "../../firebase/hooks";
import Loading from "../generics/Loading";
import { useEffect, useState } from "react";
import { type User } from "../../types";
import NetworkError from "../generics/NetworkError";

const FollowsUsers = ({
  userInfo,
  selected,
}: {
  userInfo: User;
  selected: "followers" | "following";
}) => {
  const [followsUsernames, setFollowsUsernames] = useState<string[] | null>(
    null
  );

  useEffect(() => {
    if (userInfo !== null) setFollowsUsernames(userInfo[selected]);
  }, [userInfo]);
  console.log(followsUsernames);

  const {
    data: follows,
    isLoading,
    isSuccess,
    isError,
  } = useUsersByUsernamesLazy(followsUsernames);
  console.log({ followsUsernames, follows });

  if (isLoading || follows === null) {
    return <Loading />;
  }

  if (isError) {
    return <NetworkError />;
  }

  if (isSuccess && follows !== null)
    return (
      <div>
        {follows.map((f) => (
          <div
            key={f.username}
            className="py-3 px-4 flex justify-between transition-all hover:bg-gray-100"
          >
            <div className="flex gap-3">
              <div>
                <Avatar
                  size="md"
                  url={f.profile_image_url}
                  username={f.username}
                />
              </div>
              <Link
                to={`/${f.username}`}
                className="text-[.9rem] flex flex-col"
              >
                <span className="font-bold hover:underline">{f.name}</span>
                <span className="text-gray-500">@{f.username}</span>
              </Link>
            </div>
            <Button outlined className="font-bold self-center">
              Following
            </Button>
          </div>
        ))}
        {/* todo: remove button; replace with infinite scrolling */}
        <button
          onClick={() => {
            if (!done) setLoadFollows(true);
          }}
        >
          Load more
        </button>
        {loadFollows && <Loading />}
      </div>
    );
};

export default FollowsUsers;
