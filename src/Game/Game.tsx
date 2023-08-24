import "./game.css";

import { Typography } from "antd";

import AppLayout from "../AppLayout";
import { CONST_COMMON_OPTIONS, CONST_FIB_OPTIONS } from "../const";
import { BonkContext, useBonks } from "../hooks/useBonks";
import { useGame } from "../hooks/useGame";
import { useReveal } from "../hooks/useReveal";
import ForceGraphTable from "./ForceGraphTable/ForceGraphTable";
import Results from "./Results";
import VotePanel from "./VotePanel/VotePanel";

const options = [...CONST_FIB_OPTIONS, ...CONST_COMMON_OPTIONS];
const Game = () => {
  const game = useGame();
  const { revealed, countdown, toggleRevealed } = useReveal();
  const { isBonking, setBonking, bonkPlayer } = useBonks();

  return (
    <BonkContext.Provider value={{ isBonking, setBonking, bonkPlayer }}>
      <AppLayout className={`${isBonking ? "bonk-active" : ""}`}>
        <Typography.Title>{game.name}</Typography.Title>

        <ForceGraphTable players={game.players} revealed={revealed} />
        {revealed && <Results players={game.players} />}

        <VotePanel
          options={options}
          revealed={revealed}
          toggleRevealed={toggleRevealed}
          countdown={countdown}
        />
      </AppLayout>
    </BonkContext.Provider>
  );
};

export default Game;
