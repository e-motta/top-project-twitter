import { type User } from "firebase/auth";
import React, { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";

export const UserContext = createContext<User | null>(null);

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (userAuth) => {
    if (userAuth != null) setUser(userAuth);
  });

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export default UserProvider;
