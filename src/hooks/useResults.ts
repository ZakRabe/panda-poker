import { CONST_EMPTY_OPTION } from "../const";
import { Game } from "../types";
import { usePlayerIds } from "./useGamePlayers";

export const useResults = (playerList: Game["players"]) => {
  const playerIds = usePlayerIds(playerList);
  if (!playerList) {
    return { average: 0, consensus: 100 };
  }
  let total = 0;
  let skippedVoteCount = 0;
  const counts: Record<string, number> = {};
  playerIds.forEach((playerId) => {
    const vote = playerList[playerId];
    const voteNumber = Number(vote);
    // dont include non-number votes in average
    if (vote === CONST_EMPTY_OPTION || Number.isNaN(voteNumber)) {
      skippedVoteCount += 1;
    } else {
      total += voteNumber;
    }

    counts[vote] = (counts[vote] ?? 0) + 1;
  });

  const ranking = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
  const winner = counts[ranking[0]];
  const calcCount = playerIds.length - skippedVoteCount;

  const average = total / calcCount;
  const consensus = (winner / calcCount) * 100;

  return {
    average,
    consensus: consensus === Infinity ? 100 : consensus,
  };
};
