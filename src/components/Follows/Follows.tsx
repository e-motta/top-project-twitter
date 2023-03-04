import { useLocation, useParams } from "react-router-dom";
import Header from "../Header/Header";
import NavButton from "../generics/NavButton";
import { useUserInfo } from "../../firebase/hooks";
import Loading from "../generics/Loading";
import NotFound from "../generics/NotFound";
import FollowsUsers from "./FollowsUsers";
import NetworkError from "../generics/NetworkError";

const Follows = () => {
  const { pathname } = useLocation();

  const selected = pathname.includes("followers") ? "followers" : "following";

  const { username } = useParams();
  const {
    data: userInfo,
    isLoading,
    isSuccess,
    isError,
  } = useUserInfo(username ?? "");

  if (isLoading) {
    return <Loading />;
  }

  if (isSuccess && userInfo === null) {
    return <NotFound />;
  }

  if (isError) {
    return <NetworkError />;
  }

  if (isSuccess && userInfo !== null)
    return (
      <>
        <Header
          mainText={userInfo.name}
          subText={`@${userInfo.username ?? ""}`}
          showBackBtn
          altBackBtnHref={`/${userInfo.username ?? ""}`}
        />
        <div className="flex border-b border-slate-100">
          <NavButton
            to={username !== undefined ? `/${username}/followers` : ""}
            selected={selected === "followers"}
          >
            Followers
          </NavButton>
          <NavButton
            to={username !== undefined ? `/${username}/following` : ""}
            selected={selected === "following"}
          >
            Following
          </NavButton>
        </div>
        <FollowsUsers userInfo={userInfo} selected={selected} key={selected} />
      </>
    );

  return null;
};

export default Follows;
