import TweetInput from "./TweetInput";
import Tweet from "../generics/Tweet";
import NavButton from "../generics/NavButton";
import Header from "../Header/Header";
import {
  tweets as tweetsMock,
  usersInfo as usersInfoMock,
} from "../../mock_data";
import {
  useProfileInfo,
  useTweetsbyHandlesLazy,
  useUserHandle,
} from "../../firebase/hooks";
import Loading from "../generics/Loading";

const Home = () => {
  const userHandle = useUserHandle() ?? "";
  const { profileInfo: userProfileInfo, status } = useProfileInfo(userHandle);

  // todo: query users info

  // mock
  const usersInfo = usersInfoMock;

  // const followingHandles = currentUserInfo?.following.push(
  //   currentUserInfo.handle
  // );
  // // todo: query tweets data
  // const tweets = tweetsMock.filter((t) => followingHandles.includes(t.handle));
  const tweets = tweetsMock;

  const t = useTweetsbyHandlesLazy(["eduardom0tta"]);
  // console.log({ t });

  if (status === null || userProfileInfo === null) {
    return <Loading />;
  }

  return (
    <div id="home-container" className="min-h-screen flex flex-col">
      <Header mainText="Home" />
      <nav className="flex border-b border-slate-100">
        <NavButton to="" selected>
          For You
        </NavButton>
        {userHandle !== null && (
          <NavButton to="" notImplemented>
            Following
          </NavButton>
        )}
      </nav>
      {userHandle !== null && <TweetInput profileInfo={userProfileInfo} />}
      {tweets.map((t) => (
        <Tweet
          key={t.id}
          name={usersInfo.find((u) => u.handle === t.handle)?.name ?? ""}
          handle={t.handle}
          date={t.date}
          text={t.text}
          likes={t.likes}
          avatarUrl={usersInfo.find((u) => u.handle === t.handle)?.avatar ?? ""}
        />
      ))}
    </div>
  );
};

export default Home;
