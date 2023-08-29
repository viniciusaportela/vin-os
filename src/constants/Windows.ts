import BankImg from "../assets/images/bank.svg";
import ComputerImg from "../assets/images/computer.svg";
import CoinImg from "../assets/images/coin.svg";

export enum OsWindow {
  CentralBank = "central-bank",
  Computers = "computers",
  GLVCoin = "glv-coin",
}

export const getLogoByWindow = (window: OsWindow) => {
  switch (window) {
    case OsWindow.CentralBank:
      return BankImg;
    case OsWindow.Computers:
      return ComputerImg;
    case OsWindow.GLVCoin:
      return CoinImg;
    default:
      return "";
  }
};
