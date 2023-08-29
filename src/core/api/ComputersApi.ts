import axios from "axios";

export class ComputersApi {
  static async listComputers(playerId: string): Promise<IComputer[] | never> {
    const res = await axios.get(
      `${process.env.REACT_APP_API_URL}/computers/listComputersFromPlayer`,
      {
        params: {
          playerId,
        },
      }
    );

    return res.data;
  }
}
