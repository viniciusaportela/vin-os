import BankImg from "../assets/images/bank.svg";

export enum OsWindow {
  CentralBank = "central-bank",
}

export const getLogoByWindow = (window: OsWindow) => {
  switch (window) {
    case OsWindow.CentralBank:
      return BankImg;
    default:
      return "";
  }
};
