import { Navigate, Route, Routes } from "react-router-dom";
import Follows from "./components/Follows/Follows";
import NotFound from "./components/generics/NotFound";

import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Profile from "./components/Profile/Profile";
import EditProfile from "./components/Settings/EditProfile";
import Layout from "./Layout";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":handle" element={<Profile />} />
        <Route path=":handle/followers" element={<Follows />} />
        <Route path=":handle/following" element={<Follows />} />
        <Route path="settings/profile" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
