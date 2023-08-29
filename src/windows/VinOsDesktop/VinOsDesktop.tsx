import { AppIcon } from "../../components/AppIcon/AppIcon";
import { Desktop } from "../../components/Desktop/Desktop";
import { Navbar } from "../../components/Navbar/Navbar";
import { CentralBank } from "../CentralBank/CentralBankWindow";
import BankImg from "../../assets/images/bank.svg";
import ComputerImg from "../../assets/images/computer.svg";
import CoinImg from "../../assets/images/coin.svg";
import { useWindowsState } from "../../context/windows-state";
import { OsWindow } from "../../constants/Windows";
import { ComputersWindow } from "../Computers/ComputersWindow";
import { GlvCoinWindow } from "../GLVCoin/GLVCoinWindow";

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
        <AppIcon
          title="Meus Computadores"
          icon={ComputerImg}
          onOpen={onOpen(OsWindow.Computers)}
        />
        <AppIcon
          title="GLV Coin"
          icon={CoinImg}
          onOpen={onOpen(OsWindow.GLVCoin)}
        />
      </Desktop>
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

      <ComputersWindow
        isOpen={
          !!windowsState.find((state) => state.name === OsWindow.Computers)
        }
        isVisible={
          windowsState.find((state) => state.name === OsWindow.Computers)
            ?.opened ?? true
        }
        onClose={onClose(OsWindow.Computers)}
        onMinimize={onMinimize(OsWindow.Computers)}
      />

      <GlvCoinWindow
        isOpen={!!windowsState.find((state) => state.name === OsWindow.GLVCoin)}
        isVisible={
          windowsState.find((state) => state.name === OsWindow.GLVCoin)
            ?.opened ?? true
        }
        onClose={onClose(OsWindow.GLVCoin)}
        onMinimize={onMinimize(OsWindow.GLVCoin)}
      />
    </>
  );
};
