import axios from "axios";

export class TransfersApi {
  static async listFromPlayer(playerId: number) {
    const transfers = await axios.get(
      `${process.env.REACT_APP_API_URL}/transfers/listFromPlayer`,
      { params: { playerId } }
    );

    return transfers.data;
  }
}
