import { v4 } from "uuid";
import { OsWindow } from "../../constants/Windows";

export class WindowState {
  id: string;
  name: OsWindow;
  logo: string;
  opened: boolean;

  constructor(name: OsWindow, logo: string) {
    this.id = v4();
    this.name = name;
    this.logo = logo;
    this.opened = true;
  }
}
