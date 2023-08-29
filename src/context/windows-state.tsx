import { Dispatch, SetStateAction, createContext, useContext } from "react";
import { WindowState } from "../core/WindowState/WindowState";
import { OsWindow, getLogoByWindow } from "../constants/Windows";

export const WindowsStateContext = createContext<
  [WindowState[], Dispatch<SetStateAction<WindowState[]>>] | null[]
>([null, null]);

export const useWindowsState = () => {
  const context = useContext(WindowsStateContext) as [
    WindowState[],
    Dispatch<SetStateAction<WindowState[]>>
  ];

  const setWindowState = (id: string, mergeObj: any) => {
    context[1]((windowsState) => {
      const index = windowsState.findIndex((value) => value.id === id);
      windowsState[index] = { ...windowsState[index], ...mergeObj };
      return windowsState;
    });
  };

  const openWindow = (window: OsWindow) => {
    const setWindowsState = context[1];

    setWindowsState((windowsState) => {
      const statesCopy = [...windowsState];

      const alreadyHas = statesCopy.find((state) => state.name === window);
      if (alreadyHas) return statesCopy;

      statesCopy.push(new WindowState(window, getLogoByWindow(window)));
      return statesCopy;
    });
  };

  const closeWindow = (window: OsWindow) => {
    const setWindowsState = context[1];

    setWindowsState((windowsState) => {
      const statesCopy = [...windowsState];
      const removeIndex = statesCopy.findIndex(
        (state) => state.name === window
      );
      statesCopy.splice(removeIndex, 1);
      return statesCopy;
    });
  };

  return [
    context[0],
    { setWindowState, setWindowsState: context[1], openWindow, closeWindow },
  ] as const;
};
