interface IComputer {
  id: number;
  owner: number;
  type: ComputerType;
  status: "active" | "disabled";
  createdAt: string;
}

interface IMining {
  blockIndex: number;
  time: string;
  computerId: number;
}

interface IPlayer {
  id: number;
  name: string;
  coins: number;
  createdAt: string;
}

interface IProcessedBlock {
  id: number;
  winner: number;
  winnerIndex: number;
  gainedCoins: number;
  blockIndex: number;
  processedAt: string;
}

interface ITransfer {
  id: number;
  from_player: number;
  to_player: number;
  amount: number;
  createdAt: string;
}

enum ComputerType {
  Common = "common",
  Miner = "miner",
  Shop = "Shop",
}
