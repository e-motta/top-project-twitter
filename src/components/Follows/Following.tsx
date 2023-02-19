import { Link } from "react-router-dom";
import Button from "../generics/Button";
import Avatar from "../generics/Avatar";
import { useProfilesByHandlesLazy } from "../../firebase/hooks";
import Loading from "../generics/Loading";
import { useEffect, useState } from "react";
import { type ProfileInfo } from "../../types";
import { type DocWithNotFound } from "../../firebase/firestoreTypes";

const Following = ({
  userInfo,
}: {
  userInfo: DocWithNotFound<ProfileInfo>;
}) => {
  const [followsHandles, setFollowsHandles] = useState<string[]>([]);

  useEffect(() => {
    if (userInfo !== null) setFollowsHandles(userInfo.following);
  }, [userInfo]);

  const follows = useProfilesByHandlesLazy(followsHandles, null);

  if (followsHandles === null || follows === null) return <Loading />;

  return (
    <div>
      {follows.map((f) => (
        <div
          key={f.handle}
          className="py-3 px-4 flex justify-between transition-all hover:bg-gray-100"
        >
          <div className="flex gap-3">
            <div>
              <Avatar size="md" url={f.avatar} handle={f.handle} />
            </div>
            <Link to={`/${f.handle}`} className="text-[.9rem] flex flex-col">
              <span className="font-bold hover:underline">{f.name}</span>
              <span className="text-gray-500">@{f.handle}</span>
            </Link>
          </div>
          <Button outlined className="font-bold self-center">
            Following
          </Button>
        </div>
      ))}
    </div>
  );
};

export default Following;
