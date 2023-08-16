import "./game.css";

import { Typography } from "antd";

import AppLayout from "../AppLayout";
import { CONST_COMMON_OPTIONS, CONST_FIB_OPTIONS } from "../const";
import { useGame } from "../hooks/useGame";
import { useReveal } from "../hooks/useReveal";
import { ForceGraphTable } from "./ForceGraphTable/ForceGraphTable";
import Results from "./Results";
import Vote from "./Vote";

const options = [...CONST_FIB_OPTIONS, ...CONST_COMMON_OPTIONS];
const Game = () => {
  const game = useGame();
  const { revealed, countdown, toggleRevealed } = useReveal(game);

  return (
    <AppLayout>
      <Typography.Title>{game.name}</Typography.Title>

      <ForceGraphTable players={game.players} revealed={revealed} />
      {revealed && <Results players={game.players} />}

      <Vote
        options={options}
        revealed={revealed}
        toggleRevealed={toggleRevealed}
        countdown={countdown}
      />
    </AppLayout>
  );
};

export default Game;
