import axios from "axios";

export class TransfersApi {
  static listFromPlayer(playerId: number) {
    const transfers = axios.post(
      `${process.env.REACT_APP_API_URL}/transfers/listFromPlayer`,
      { playerId }
    );

    return transfers;
  }
}
