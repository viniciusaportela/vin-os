import { AppIcon } from "../../components/AppIcon/AppIcon";
import { Desktop } from "../../components/Desktop/Desktop";
import { Navbar } from "../../components/Navbar/Navbar";
import { CentralBank } from "../CentralBank/CentralBank";
import BankImg from "../../assets/images/bank.svg";
import { useWindowsState } from "../../context/windows-state";
import { OsWindow } from "../../constants/Windows";

export const VinOsDesktop = () => {
  const [windowsState, { openWindow, closeWindow, changeWindowOpened }] =
    useWindowsState();

  const onOpen = (window: OsWindow) => {
    return () => {
      openWindow(window);
    };
  };

  const onClose = (window: OsWindow) => {
    return () => {
      closeWindow(window);
    };
  };

  const onMinimize = (window: OsWindow) => {
    return () => {
      changeWindowOpened(window, false);
    };
  };

  const onAppClick = (window: OsWindow) => {
    return changeWindowOpened(
      window,
      !windowsState.find((state) => state.name === window)?.opened ?? true
    );
  };

  return (
    <>
      <Navbar onAppClick={onAppClick} />
      <Desktop>
        <AppIcon
          title="Banco Central"
          icon={BankImg}
          onOpen={onOpen(OsWindow.CentralBank)}
        />

        <CentralBank
          isOpen={
            !!windowsState.find((state) => state.name === OsWindow.CentralBank)
          }
          isVisible={
            windowsState.find((state) => state.name === OsWindow.CentralBank)
              ?.opened ?? true
          }
          onMinimize={onMinimize(OsWindow.CentralBank)}
          onClose={onClose(OsWindow.CentralBank)}
        />
      </Desktop>
    </>
  );
};
