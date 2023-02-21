import Avatar from "../generics/Avatar";
import Button from "../generics/Button";
import NavButton from "../generics/NavButton";
import Tweet from "../generics/Tweet";
import Header from "../Header/Header";
import { Link, useParams } from "react-router-dom";
import { formatNum } from "../../lib/formatUtils";
import Loading from "../generics/Loading";
import { type ProfileInfo } from "../../types";
import NotFound from "../generics/NotFound";
import { useProfileInfo, useTweetsBySingleHandle } from "../../firebase/hooks";

const Profile = () => {
  const { handle } = useParams();

  const { profileInfo, status } = useProfileInfo(handle ?? "");
  const profileTweets = useTweetsBySingleHandle(handle ?? "");

  if (status === null) {
    return <Loading />;
  }

  if (status === 404 || profileInfo === null) {
    return <NotFound />;
  }

  return (
    <div className="flex flex-col py-1">
      <Header
        mainText={profileInfo.name ?? ""}
        subText={`${profileInfo.tweets?.length ?? ""} Tweets`}
        showBackBtn
      />

      <div id="bg-img" className="max-h-48 aspect-[25/8] bg-gray-300 relative">
        {profileInfo === null && (
          <img
            src={(profileInfo as ProfileInfo).bgImage ?? ""}
            alt="background image relative"
          />
        )}
        <div
          className="absolute -bottom-2 left-0 translate-y-1/2 p-1 bg-white 
          rounded-full ml-4"
        >
          <Avatar size="lg" url={profileInfo.avatar} handle={handle ?? ""} />
        </div>
      </div>

      <div id="profile-info" className="flex flex-col pb-5">
        <div className="h-20 flex justify-end items-start px-3 py-5">
          <Link to="/settings/profile">
            <Button className="font-bold hover:bg-gray-100" outlined>
              Edit profile
            </Button>
          </Link>
          {/* <Button className="text-white bg-black font-bold">Follow</Button> */}
          {/* <Button className="font-bold hover:bg-gray-100" outlined>
            Following
          </Button> */}
        </div>
        <div className="flex flex-col px-4">
          <span className="font-bold text-xl">{profileInfo.name}</span>
          <span className="text-[.95rem] text-gray-500">
            @{profileInfo.handle}
          </span>
        </div>
        <div className="text-sm flex gap-4 px-4 mt-3">
          <Link to={`/${profileInfo.handle}/following`} className="flex gap-1">
            <span className="font-bold">
              {formatNum(profileInfo.following?.length ?? 0, 1)}
            </span>
            <span className="text-gray-500">Following</span>
          </Link>
          <Link to={`/${profileInfo.handle}/followers`} className="flex gap-1">
            <span className="font-bold">
              {formatNum(profileInfo.followers?.length ?? 0, 1)}
            </span>
            <span className="text-gray-500">Followers</span>
          </Link>
        </div>
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
        {profileTweets === null ? (
          <Loading className="top-10" />
        ) : (
          <>
            {profileTweets.map((t) => (
              <Tweet
                key={t.id}
                name={profileInfo.name ?? ""}
                handle={profileInfo.handle ?? ""}
                date={t.date}
                text={t.text}
                likes={t.likes}
                avatarUrl={profileInfo.avatar ?? null}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Profile;
