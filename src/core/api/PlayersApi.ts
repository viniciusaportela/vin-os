import axios from "axios";

interface ITransferCoinsBody {
  from: string;
  to: string;
  amount: number;
}

export class PlayersApi {
  static get(playerName: string) {
    const player = axios.get(`${process.env.REACT_APP_API_URL}/players/get`, {
      params: { playerName },
    });

    return player;
  }

  static list() {
    const players = axios.get(`${process.env.REACT_APP_API_URL}/players/list`);

    return players;
  }

  static transferCoins(body: ITransferCoinsBody) {
    const transferCoins = axios.post(
      `${process.env.REACT_APP_API_URL}/players/transferCoins`,
      body
    );

    return transferCoins;
  }
}
