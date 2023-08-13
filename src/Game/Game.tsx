import { Typography } from "antd";
import { useMemo } from "react";

import AppLayout from "../AppLayout";
import { CONST_COMMON_OPTIONS, CONST_FIB_OPTIONS } from "../const";
import { useGame } from "../hooks/useGame";
import { useReveal } from "../hooks/useReveal";
import { RoundChoice } from "../types";
import Results from "./Results";
import Table from "./Table";
import Vote from "./Vote";

const options = [...CONST_FIB_OPTIONS, ...CONST_COMMON_OPTIONS];
const Game = () => {
  const game = useGame();
  const { revealed, countdown } = useReveal(game);

  const tables = useMemo(() => {
    if (!game.players) {
      return [];
    }
    let currentIndex = 0;
    // split players into tables every 16 players
    return Object.keys(game.players).reduce((acc, playerId) => {
      if (Object.keys(acc[currentIndex] ?? []).length === 16) {
        currentIndex += 1;
      }
      if (!acc[currentIndex]) {
        acc[currentIndex] = {};
      }
      acc[currentIndex][playerId] = (game.players as any)[playerId];
      return acc;
    }, [] as Record<string, RoundChoice>[]);
  }, [game.players]);

  return (
    <AppLayout>
      <Typography.Title>{game.name}</Typography.Title>
      <div className="tables">
        {tables.map((table, index) => (
          <Table
            players={table}
            key={`table_${index}`}
            revealed={revealed}
            countdown={countdown}
          />
        ))}
      </div>
      {revealed && <Results players={game.players} />}
      <Vote options={options} />
    </AppLayout>
  );
};

export default Game;
