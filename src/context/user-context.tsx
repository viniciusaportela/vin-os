import { Dispatch, SetStateAction, createContext, useContext } from "react";

export const UserContext = createContext<
  [any, Dispatch<SetStateAction<any>>] | null[]
>([null, null]);

export const useUser = () => {
  return useContext(UserContext) as [any, Dispatch<SetStateAction<any>>];
};
