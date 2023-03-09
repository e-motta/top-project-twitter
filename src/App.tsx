import { Route, Routes } from "react-router-dom";
import Follows from "./components/pages/Follows/Follows";
import Loading from "./components/generics/Loading";
import NetworkError from "./components/pages/NetworkError";
import Register from "./components/pages/Register";

import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Profile from "./components/pages/Profile/Profile";
import EditProfile from "./components/pages/Settings/EditProfile";
import { useUserInfo } from "./service/hooks/usersHooks";
import { useAuthUserUsername } from "./service/hooks/useAuthUserUsername";
import Layout from "./Layout";
import NotFound from "./components/pages/NotFound";

function App() {
  const {
    username,
    isLoading: isUsernameLoading,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
  } = useAuthUserUsername();

  const {
    data: userInfo,
    isLoading: isUserInfoLoading,
    isSuccess: isUserInfoSuccess,
    isError: isUserInfoError,
  } = useUserInfo(username);

  if (isUsernameLoading || isUserInfoLoading) {
    return <Loading />;
  }

  if (isUsernameError || isUserInfoError) {
    return <NetworkError />;
  }

  return (
    // todo: update router to new syntax
    <Routes>
      <Route path="login" element={<Login />} />
      {isUsernameSuccess && userInfo === null && (
        <Route path="*" element={<Register />} />
      )}
      {isUsernameSuccess && isUserInfoSuccess && (
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path=":username" element={<Profile />} />
          <Route path=":username/followers" element={<Follows />} />
          <Route path=":username/following" element={<Follows />} />
          <Route path="settings/profile" element={<EditProfile />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      )}
      <Route path="signup" element={<Register />} />
    </Routes>
  );
}

export default App;
