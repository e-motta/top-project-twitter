import { Link, useParams } from "react-router-dom";
import Header from "../Header/Header";
import NavButton from "../generics/NavButton";
import Button from "../generics/Button";
import Avatar from "../generics/Avatar";
import { useProfileInfo, useProfilesByHandlesLazy } from "../../firebase/hooks";
import Loading from "../generics/Loading";
import NotFound from "../generics/NotFound";
import { useEffect, useState } from "react";

const Following = () => {
  const [followsHandles, setFollowsHandles] = useState([]);

  const { handle } = useParams();

  const userInfo = useProfileInfo(handle ?? "");

  // todo: fetch follower/following
  useEffect(() => {
    if (userInfo !== null) setFollowsHandles(userInfo.following);
  }, [userInfo]);
  // const followsHandles = userInfo !== null ? userInfo[selected] : [];
  const follows = useProfilesByHandlesLazy(followsHandles);

  // todo: add loading spinner for follower/following

  if (userInfo === null) {
    return <Loading />;
  }

  if ("notFound" in userInfo) {
    return <NotFound />;
  }

  return (
    <div>
      <Header mainText="Eduardo" subText="@eduardom0tta" showBackBtn />
      <div className="flex border-b border-slate-100">
        <NavButton to={`/${handle ?? ""}/followers`}>Followers</NavButton>
        <NavButton to={`/${handle ?? ""}/following`} selected>
          Following
        </NavButton>
      </div>

      {followsHandles === null || follows === null ? (
        <Loading />
      ) : (
        follows.map((f) => (
          <div
            key={f.handle}
            className="py-3 px-4 flex justify-between transition-all hover:bg-gray-100"
          >
            <div className="flex gap-3">
              <div>
                <Avatar size="md" url={f.avatar} handle={f.handle ?? ""} />
              </div>
              <Link
                to={`/${f.handle ?? ""}`}
                className="text-[.9rem] flex flex-col"
              >
                <span className="font-bold hover:underline">{f.name}</span>
                <span className="text-gray-500">@{f.handle}</span>
              </Link>
            </div>
            <Button outlined className="font-bold self-center">
              Following
            </Button>
          </div>
        ))
      )}
    </div>
  );
};

export default Following;
