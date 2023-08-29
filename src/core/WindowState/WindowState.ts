import { v4 } from "uuid";

export class WindowState {
  id: string;
  name: string;
  logo: string;
  opened: boolean;

  constructor(name: string, logo: string) {
    this.id = v4();
    this.name = name;
    this.logo = logo;
    this.opened = true;
  }
}
