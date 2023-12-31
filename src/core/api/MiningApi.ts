import axios from "axios";

export class MiningApi {
  static async listProcessedBlocksWithPlayer(playerId: number) {
    const processedBlocks = await axios.get(
      `${process.env.REACT_APP_API_URL}/mining/listProcessedBlocksWithPlayer`,
      { params: { playerId } }
    );

    return processedBlocks.data;
  }

  static async getStats(playerId: string): Promise<any | never> {
    const stats = await axios.get(
      `${process.env.REACT_APP_API_URL}/mining/stats`,
      {
        params: {
          playerId,
        },
      }
    );

    return stats.data;
  }
}
