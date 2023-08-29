import axios from "axios";

interface ITransferCoinsBody {
  from: string;
  to: string;
  amount: number;
}

export class PlayersApi {
  static async get(playerName: string) {
    const player = await axios.get(`${process.env.REACT_APP_API_URL}/players/get`, {
      params: { playerName },
    });

    return player.data;
  }

  static async list() {
    const players = await axios.get(`${process.env.REACT_APP_API_URL}/players/list`);

    return players.data;
  }

  static async transferCoins(body: ITransferCoinsBody) {
    const transferCoins = await axios.post(
      `${process.env.REACT_APP_API_URL}/players/transferCoins`,
      body
    );

    return transferCoins.data;
  }
}
