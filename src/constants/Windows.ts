import BankImg from "../assets/images/bank.svg";
import ComputerImg from "../assets/images/computer.svg";

export enum OsWindow {
  CentralBank = "central-bank",
  Computers = "computers",
}

export const getLogoByWindow = (window: OsWindow) => {
  switch (window) {
    case OsWindow.CentralBank:
      return BankImg;
    case OsWindow.Computers:
      return ComputerImg;
    default:
      return "";
  }
};
