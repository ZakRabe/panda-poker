import { CONST_EMPTY_OPTION } from "../../const";
import { Game, RoundChoice, User } from "../../types";
import { GraphData } from "./types";

// if a player hasn't selected a choice, we'll show them unlinked
const noChoice = (user: User): GraphData => {
  return {
    nodes: [{ type: "player", ...user }],
    links: [],
  };
};

// each player is connected to their own unrevealed choice
const selectedNotRevealed = (user: User): GraphData => {
  const target = `${user.id}_selected`;
  return {
    nodes: [
      { type: "player", ...user },
      { id: target, type: "card", revealed: false },
    ],
    links: [{ source: user.id, target }],
  };
};

// the nodes for the choices are pushed into the data up front,
// so we only need to link the player to their selection here
const selectedRevealed = (user: User, roundChoice: RoundChoice): GraphData => {
  return {
    nodes: [{ type: "player", ...user }],
    links: [{ source: user.id, target: roundChoice }],
  };
};

export const buildGraphData = (
  gameState: Game["players"] | null,
  revealed: boolean,
  playersData: Map<string, User>
) => {
  if (!gameState) {
    return { nodes: [], links: [] };
  }
  const uniqueChoices = Array.from(new Set(Object.values(gameState)));
  const initialData = {
    nodes: revealed
      ? uniqueChoices.map((roundChoice) => ({
          id: roundChoice,
          type: "card",
          revealed: true,
        }))
      : [],
    links: [],
  } as GraphData;

  const graphData = Object.keys(gameState).reduce(
    ({ nodes, links }, playerId) => {
      const user = playersData.get(playerId);
      if (!user) {
        return { nodes, links };
      }
      const roundChoice = gameState[playerId];
      const selectionData = revealed
        ? selectedRevealed(user, roundChoice)
        : selectedNotRevealed(user);
      const playerData =
        roundChoice === CONST_EMPTY_OPTION ? noChoice(user) : selectionData;
      return {
        nodes: [...nodes, ...playerData.nodes],
        links: [...links, ...playerData.links],
      };
    },
    initialData
  );

  return graphData;
};
