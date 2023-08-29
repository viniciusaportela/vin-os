import { PropsWithChildren, useState } from "react";
import { UserContext } from "./user-context";
import { WindowsStateContext } from "./windows-state";
import { WindowState } from "../core/WindowState/WindowState";

export const ContextProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const userState = useState(null);
  const windowsStateState = useState<WindowState[]>([]);

  return (
    <UserContext.Provider value={userState}>
      <WindowsStateContext.Provider value={windowsStateState}>
        {children}
      </WindowsStateContext.Provider>
    </UserContext.Provider>
  );
};
