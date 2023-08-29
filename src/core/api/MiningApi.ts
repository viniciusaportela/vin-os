import axios from "axios";

export class MiningApi {
  static listProcessedBlocksWithPlayer(playerId: number) {
    const processedBlocks = axios.post(
      `${process.env.REACT_APP_API_URL}/mining/listProcessedBlocksWithPlayer`,
      { playerId }
    );

    return processedBlocks;
  }
}
