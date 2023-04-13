import { type User } from "firebase/auth";
import React, { createContext, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./auth";

export const AuthContext = createContext<User | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  onAuthStateChanged(auth, (userAuth) => {
    if (userAuth != null) setUser(userAuth);
  });

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
