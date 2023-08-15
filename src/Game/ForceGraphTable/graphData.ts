import { CONST_EMPTY_OPTION } from "../../const";
import { Game, RoundChoice, User } from "../../types";
import { GraphData } from "./types";

// if a player hasn't selected a choice, we'll show them unlinked
const noChoice = (playerId: string, user: User): GraphData => {
  return {
    nodes: [{ type: "player", ...user }],
    links: [],
  };
};

// each player is connected to their own unrevealed choice
const selectedNotRevealed = (playerId: string, user: User): GraphData => {
  const target = `${playerId}_selected`;
  return {
    nodes: [
      { type: "player", ...user },
      { id: target, type: "card" },
    ],
    links: [{ source: playerId, target }],
  };
};

// the nodes for the choices are pushed into the data up front,
// so we only need to link the player to their selection here
const selectedRevealed = (
  playerId: string,
  user: User,
  roundChoice: RoundChoice
): GraphData => {
  return {
    nodes: [{ type: "player", ...user }],
    links: [{ source: playerId, target: roundChoice }],
  };
};

export const buildGraphData = (
  players: Game["players"] | null,
  revealed: boolean,
  playersData: Map<string, User>
) => {
  if (!players) {
    return { nodes: [], links: [] };
  }
  const initialData = {
    nodes: revealed
      ? Object.values(players).map((id) => ({ id, type: "card" }))
      : [],
    links: [],
  } as GraphData;

  const graphData = Object.keys(players).reduce(
    ({ nodes, links }, playerId) => {
      const user = playersData.get(playerId);
      if (!user) {
        return { nodes, links };
      }
      const roundChoice = players[playerId];
      const selectionData = revealed
        ? selectedRevealed(playerId, user, roundChoice)
        : selectedNotRevealed(playerId, user);
      const playerData =
        roundChoice === CONST_EMPTY_OPTION
          ? noChoice(playerId, user)
          : selectionData;
      return {
        nodes: [...nodes, ...playerData.nodes],
        links: [...links, ...playerData.links],
      };
    },
    initialData
  );
  console.log(graphData);
  return graphData;
};
