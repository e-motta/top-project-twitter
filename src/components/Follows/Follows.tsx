import { useLocation, useParams } from "react-router-dom";
import Header from "../Header/Header";
import NavButton from "../generics/NavButton";
import { useProfileInfo } from "../../firebase/hooks";
import Loading from "../generics/Loading";
import NotFound from "../generics/NotFound";
import Following from "./Following";
import FollowsProfiles from "./FollowsProfiles";

const Follows = () => {
  const { pathname } = useLocation();

  const selected = pathname.includes("followers") ? "followers" : "following";

  const { handle } = useParams();
  const userInfo = useProfileInfo(handle ?? "");

  if (userInfo === null || userInfo === undefined) {
    return <Loading />;
  }

  if ("notFound" in userInfo) {
    return <NotFound />;
  }

  return (
    <>
      <Header
        mainText={userInfo.name}
        subText={`@${userInfo.handle}`}
        showBackBtn
        altBackBtnHref={`/${userInfo.handle}`}
      />
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
      {selected === "followers" ? (
        <FollowsProfiles userInfo={userInfo} key="followers" />
      ) : (
        <FollowsProfiles userInfo={userInfo} key="following" />
      )}
    </>
  );
};

export default Follows;
