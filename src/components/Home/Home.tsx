import AvatarImg from "../../assets/avatar_example.jpeg";
import TweetInput from "./TweetInput";
import Tweet from "../generics/Tweet";
import NavButton from "../generics/NavButton";
import Header from "../Header/Header";
import bgImg from "../../assets/bg-example.jpeg";
import { useContext } from "react";
import { UserContext } from "../../firebase/UserContext";

const Home = () => {
  const user = useContext(UserContext);

  // todo: query tweets data

  // mock
  const tweets = [
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
      date: new Date("2023-02-05T18:01:04.753Z"),
      likes: 23040,
    },
  ];

  const userHandles = tweets.map((t) => t.handle);
  // todo: query users info

  // mock
  const usersInfo = [
    {
      handle: "eduardom0tta",
      name: "Eduardo",
      email: "edumrs90@gmail.com",
      avatar: AvatarImg,
      bgImage: bgImg,
      followers: ["elonmusk", "billgates"],
      following: ["elonmusk"],
      tweets: ["id1", "id2"],
    },
  ];

  return (
    <div id="home-container" className="min-h-screen flex flex-col">
      <Header mainText="Home" />
      <nav className="flex border-b border-slate-100">
        <NavButton to="" selected>
          For You
        </NavButton>
        {user !== null && (
          <NavButton to="" notImplemented>
            Following
          </NavButton>
        )}
      </nav>
      {user !== null && <TweetInput />}
      {tweets.map((t) => (
        <Tweet
          key={t.id}
          name={usersInfo.find((u) => u.handle === t.handle)?.name ?? ""}
          handle={t.handle}
          date={t.date}
          text={t.text}
          likes={t.likes}
          avatarUrl={AvatarImg}
        />
      ))}
    </div>
  );
};

export default Home;
