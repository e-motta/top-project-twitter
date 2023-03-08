import { Route, Routes } from "react-router-dom";
import Follows from "./components/Follows/Follows";
import Loading from "./components/generics/Loading";
import NetworkError from "./components/generics/NetworkError";
// import Following from "./components/Follows/Following";
import NotFound from "./components/generics/NotFound";
import Register from "./components/generics/Register";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Settings/EditProfile";
import { useAuthUserUsername, useUserInfo } from "./firebase/hooks";
import Layout from "./Layout";

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
