import { PropsWithChildren, useState } from "react";
import { UserContext } from "./user-context";

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userState = useState(null);

  return (
    <UserContext.Provider value={userState}>{children}</UserContext.Provider>
  );
};
