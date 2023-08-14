import { CONST_EMPTY_OPTION } from "../../const";
import { Game, RoundChoice } from "../../types";

export type GraphData = {
  nodes: { id: string; type: "player" | "card" }[];
  links: { source: string; target: string }[];
};

// if a player hasn't selected a choice, we'll show them unlinked
const noChoice = (playerId: string): GraphData => {
  return {
    nodes: [{ id: playerId, type: "player" }],
    links: [],
  };
};

// each player is connected to their own unrevealed choice
const selectedNotRevealed = (playerId: string): GraphData => {
  const target = `${playerId}_selected`;
  return {
    nodes: [
      { id: playerId, type: "player" },
      { id: target, type: "card" },
    ],
    links: [{ source: playerId, target }],
  };
};

// the nodes for the choices are pushed into the data up front,
// so we only need to link the player to their selection here
const selectedRevealed = (
  playerId: string,
  roundChoice: RoundChoice
): GraphData => {
  return {
    nodes: [{ id: playerId, type: "player" }],
    links: [{ source: playerId, target: roundChoice }],
  };
};

export const buildGraphData = (
  players: Game["players"] | null,
  revealed: boolean
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
      const roundChoice = players[playerId];
      const selectionData = revealed
        ? selectedRevealed(playerId, roundChoice)
        : selectedNotRevealed(playerId);
      const playerData =
        roundChoice === CONST_EMPTY_OPTION ? noChoice(playerId) : selectionData;
      return {
        nodes: [...nodes, ...playerData.nodes],
        links: [...links, ...playerData.links],
      };
    },
    initialData
  );
  return graphData;
};
