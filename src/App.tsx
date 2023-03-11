import { Route, Routes } from "react-router-dom";
import Follows from "./components/pages/Follows/Follows";
import Loading from "./components/generics/Loading";
import NetworkError from "./components/pages/NetworkError";
import Register from "./components/pages/Register";

import Home from "./components/pages/Home/Home";
import Login from "./components/pages/Login/Login";
import Profile from "./components/pages/Profile/Profile";
import EditProfile from "./components/pages/Settings/EditProfile";
import { useAuthUserUsername } from "./service/hooks/useAuthUserUsername";
import Layout from "./Layout";
import NotFound from "./components/pages/NotFound";
import { useContext } from "react";
import { AuthContext } from "./firebase/AuthContext";

function App() {
  const authUser = useContext(AuthContext);

  const {
    username,
    isLoading: isUsernameLoading,
    isSuccess: isUsernameSuccess,
    isError: isUsernameError,
  } = useAuthUserUsername();

  if (isUsernameLoading) {
    return <Loading />;
  }

  if (isUsernameError) {
    return <NetworkError />;
  }

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      {isUsernameSuccess && username === null && authUser !== null && (
        <Route path="*" element={<Register />} />
      )}
      {isUsernameSuccess && (
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
