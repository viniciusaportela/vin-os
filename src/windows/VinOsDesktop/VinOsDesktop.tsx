import { AppIcon } from "../../components/AppIcon/AppIcon";
import { Desktop } from "../../components/Desktop/Desktop";
import { Navbar } from "../../components/Navbar/Navbar";
import { CentralBank } from "../CentralBank/CentralBank";
import BankImg from "../../assets/images/bank.svg";
import { useWindowsState } from "../../context/windows-state";
import { OsWindow } from "../../constants/Windows";

export const VinOsDesktop = () => {
  const [windowsState, { openWindow, closeWindow }] = useWindowsState();

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

  return (
    <>
      <Navbar />
      <Desktop>
        <AppIcon
          title="Banco Central"
          icon={BankImg}
          onOpen={onOpen(OsWindow.CentralBank)}
        />

        <CentralBank
          isOpen={
            windowsState.find((state) => state.name === OsWindow.CentralBank)
              ?.opened
          }
          onClose={onClose(OsWindow.CentralBank)}
        />
      </Desktop>
    </>
  );
};
