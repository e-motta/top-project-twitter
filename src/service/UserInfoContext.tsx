import React, { createContext, useState } from "react";
import { type User } from "../types";

interface ContextType {
  userInfo: Partial<User> | null;
  setUserInfo: React.Dispatch<React.SetStateAction<Partial<User> | null>>;
}

const contextDefaultValue: ContextType = {
  userInfo: null,
  setUserInfo: () => null,
};

export const UserInfoContext = createContext<ContextType>(contextDefaultValue);

const UserInfoProvider = ({ children }: { children: React.ReactNode }) => {
  const [userInfo, setUserInfo] = useState<Partial<User> | null>(null);
  return (
    <UserInfoContext.Provider value={{ userInfo, setUserInfo }}>
      {children}
    </UserInfoContext.Provider>
  );
};

export default UserInfoProvider;
