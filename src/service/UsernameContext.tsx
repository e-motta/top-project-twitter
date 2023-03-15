import React, { createContext, useState } from "react";

interface ContextType {
  username: string | null;
  setUsername: React.Dispatch<React.SetStateAction<string | null>>;
}

const contextDefaultValue: ContextType = {
  username: null,
  setUsername: () => null,
};

export const UsernameContext = createContext<ContextType>(contextDefaultValue);

const UsernameProvider = ({ children }: { children: React.ReactNode }) => {
  const [username, setUsername] = useState<string | null>(null);

  return (
    <UsernameContext.Provider value={{ username, setUsername }}>
      {children}
    </UsernameContext.Provider>
  );
};

export default UsernameProvider;
