import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../Header/Header";
import NavButton from "../generics/NavButton";
import AvatarImg from "../../assets/avatar_example.jpeg";
import Button from "../generics/Button";
import Avatar from "../generics/Avatar";

const Follows = () => {
  const { handle } = useParams();
  const { pathname } = useLocation();

  const selected = pathname.includes("followers") ? "followers" : "following";

  // todo: fetch user data
  const userInfo = {
    handle: "eduardom0tta",
    name: "Eduardo",
    avatar: AvatarImg,
    followers: ["elonmusk", "billgates"],
    following: ["elonmusk"],
    tweets: ["id1", "id2"],
  };

  // todo: render loading spinner for entire page while user data is fetched
  // todo: if user data is not found, navigate to 404

  // todo: fetch follower/following

  // mock
  const follows = [
    {
      handle: "eduardom0tta",
      name: "Eduardo",
      avatar: AvatarImg,
      followers: ["elonmusk", "billgates"],
      following: ["elonmusk"],
      tweets: ["id1", "id2"],
    },
    {
      handle: "elonmusk",
      name: "Elon Musk",
      avatar: AvatarImg,
      followers: ["elonmusk", "billgates"],
      following: ["elonmusk"],
      tweets: ["id1", "id2"],
    },
  ];

  return (
    <div>
      <Header mainText="Eduardo" subText="@eduardom0tta" showBackBtn />
      <div className="flex border-b border-slate-100">
        <NavButton
          to={`/${handle ?? ""}/followers`}
          selected={selected === "followers"}
        >
          Followers
        </NavButton>
        <NavButton
          to={`/${handle ?? ""}/following`}
          selected={selected === "following"}
        >
          Following
        </NavButton>
      </div>

      {follows.map((f) => (
        <div
          key={f.handle}
          className="py-3 px-4 flex justify-between transition-all hover:bg-gray-100"
        >
          <div className="flex gap-3">
            <div>
              <Avatar size="md" url={f.avatar} />
            </div>
            <Link to="profile" className="text-[.9rem] flex flex-col">
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

export default Follows;
