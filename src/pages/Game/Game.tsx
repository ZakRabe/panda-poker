import "./game.css";

import { Typography } from "antd";

import AppLayout from "../../App/AppLayout";
import { BonkContext, useBonks } from "../../hooks/useBonks";
import { useGame } from "../../hooks/useGame";
import { useReveal } from "../../hooks/useReveal";
import ForceGraphTable from "./ForceGraphTable/ForceGraphTable";
import Notes from "./Notes/Notes";
import Results from "./Results/Results";
import VotePanel from "./VotePanel/VotePanel";

const Game = () => {
  const game = useGame();
  const { revealed, countdown, toggleRevealed } = useReveal();
  const { isBonking, setBonking, bonkPlayer } = useBonks();

  return (
    <BonkContext.Provider value={{ isBonking, setBonking, bonkPlayer }}>
      <AppLayout className={`${isBonking ? "bonk-active" : ""}`}>
        <Typography.Title>{game.name}</Typography.Title>
        <Notes />

        <ForceGraphTable players={game.players} revealed={revealed} />
        {revealed && <Results players={game.players} />}

        <VotePanel
          revealed={revealed}
          toggleRevealed={toggleRevealed}
          countdown={countdown}
        />
      </AppLayout>
    </BonkContext.Provider>
  );
};

export default Game;
