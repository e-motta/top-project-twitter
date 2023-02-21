import { useLocation, useParams } from "react-router-dom";
import Header from "../Header/Header";
import NavButton from "../generics/NavButton";
import { useProfileInfo } from "../../firebase/hooks";
import Loading from "../generics/Loading";
import NotFound from "../generics/NotFound";
import FollowsProfiles from "./FollowsProfiles";

const Follows = () => {
  const { pathname } = useLocation();

  const selected = pathname.includes("followers") ? "followers" : "following";

  const { handle } = useParams();
  const { profileInfo: userInfo, status } = useProfileInfo(handle ?? "");

  if (status === null) {
    return <Loading />;
  }

  if (status === 404 || userInfo === null) {
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
          to={handle !== undefined ? `/${handle}/followers` : ""}
          selected={selected === "followers"}
        >
          Followers
        </NavButton>
        <NavButton
          to={handle !== undefined ? `/${handle}/following` : ""}
          selected={selected === "following"}
        >
          Following
        </NavButton>
      </div>
      <FollowsProfiles userInfo={userInfo} key={selected} />
    </>
  );
};

export default Follows;
