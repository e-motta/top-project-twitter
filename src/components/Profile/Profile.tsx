import Avatar from "../generics/Avatar";
import bgImg from "../../assets/bg-example.jpeg";
import AvatarImg from "../../assets/avatar_example.jpeg";
import Button from "../generics/Button";
import NavButton from "../generics/NavButton";
import Tweet from "../generics/Tweet";
import Header from "../generics/Header";
import { Link, useParams } from "react-router-dom";
import { formatNum } from "../../lib/formatUtils";

const Profile = () => {
  const { handle } = useParams();

  // todo: fetch user data
  // todo: render loading spinner for entire page while user data is fetched
  // todo: if user data is not found, navigate to 404
  // todo: fetch tweets from user

  // mock
  const profileUserInfo = {
    handle: "eduardom0tta",
    name: "Eduardo",
    avatar: AvatarImg,
    bgImage: bgImg,
    followers: ["elonmusk", "billgates"],
    following: ["elonmusk"],
    tweets: ["id1", "id2"],
  };

  // mock
  const profileTweets = [
    {
      id: "id1",
      handle: "eduardom0tta",
      text: "This is tweet number 1",
      date: new Date("2013-02-20T12:01:04.753Z"),
      likes: 230492,
    },
    {
      id: "id2",
      handle: "eduardom0tta",
      text: "This is tweet number 2",
      date: new Date("2023-02-04T15:01:04.753Z"),
      likes: 2304,
    },
    {
      id: "id3",
      handle: "eduardom0tta",
      text: "This is tweet number 3",
      date: new Date("2023-02-04T19:01:04.753Z"),
      likes: 23040,
    },
  ];

  return (
    <div className="flex flex-col py-1">
      <Header mainText="Edit profile" subText="0 Tweets" showBackBtn />

      <div id="bg-img" className="max-h-48 aspect-[25/8] bg-gray-300 relative">
        <img src={profileUserInfo.bgImage} alt="background image" />
        <div
          className="absolute -bottom-2 left-0 translate-y-1/2 p-1 bg-white 
          rounded-full ml-4"
        >
          <Avatar size="lg" url={AvatarImg} />
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
          <span className="font-bold text-xl">{profileUserInfo.name}</span>
          <span className="text-[.95rem] text-gray-500">
            @{profileUserInfo.handle}
          </span>
        </div>
        <div className="text-sm flex gap-4 px-4 mt-3">
          <Link
            to={`/${profileUserInfo.handle}/following`}
            className="flex gap-1"
          >
            <span className="font-bold">
              {formatNum(profileUserInfo.following.length, 1)}
            </span>
            <span className="text-gray-500">Following</span>
          </Link>
          <Link
            to={`/${profileUserInfo.handle}/followers`}
            className="flex gap-1"
          >
            <span className="font-bold">
              {formatNum(profileUserInfo.followers.length, 1)}
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

      <div id="tweets">
        {profileTweets.map((t) => (
          <Tweet
            key={t.id}
            name={profileUserInfo.name}
            handle={profileUserInfo.handle}
            date={t.date}
            text={t.text}
            likes={t.likes}
            avatarUrl={profileUserInfo.avatar}
          />
        ))}
      </div>
    </div>
  );
};

export default Profile;
