import { useLocation, useParams } from "react-router-dom";
import Header from "../../generics/Header/Header";
import NavButton from "../../generics/buttons/NavButton";
import { useUserInfo } from "../../../service/hooks/usersHooks";
import Loading from "../../generics/Loading";
import FollowsUsers from "./FollowsUsers";
import NetworkError from "../NetworkError";
import { useEffect } from "react";
import NotFound from "../NotFound";

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

  useEffect(() => {
    const title =
      selected === "followers"
        ? `People following ${userInfo?.name ?? ""} (@${
            userInfo?.username ?? ""
          })`
        : `People followed by${userInfo?.name ?? ""} (@${
            userInfo?.username ?? ""
          })`;
    document.title =
      userInfo?.name !== undefined ? `${title} / Twitter` : "Twitter";
  }, [JSON.stringify(userInfo?.name), JSON.stringify(userInfo?.username)]);

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
