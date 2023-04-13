import { Route, Routes } from "react-router-dom";
import Follows from "./pages/Follows/Follows";
import Register from "./pages/Register";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import EditProfile from "./pages/Settings/EditProfile";
import Layout from "./Layout";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />

      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path=":username" element={<Profile />} />
        <Route path=":username/followers" element={<Follows />} />
        <Route path=":username/following" element={<Follows />} />
        <Route path="settings/profile" element={<EditProfile />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      <Route path="signup" element={<Register />} />
    </Routes>
  );
}

export default App;
