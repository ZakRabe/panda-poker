import { ref, runTransaction } from "firebase/database";
import { useEffect, useState } from "react";

import { pop } from "../confetti";
import { CONST_EMPTY_OPTION } from "../const";
import database from "../firebase";
import { Game, GameDto } from "../types";

export const useReveal = (game: Game) => {
  const [revealed, setRevealed] = useState(false);
  const [countdown, setCountdown] = useState(0);

  useEffect(() => {
    if (!game.revealed) {
      setRevealed(false);
      return;
    }
    setCountdown(3);
    setTimeout(() => setCountdown(2), 1000);
    setTimeout(() => setCountdown(1), 2000);
    setTimeout(() => setCountdown(0), 3000);
  }, [game.revealed]);

  // reveal the cards when countdown hits 0
  useEffect(
    () => {
      if (countdown === 0 && game.revealed) {
        pop();
        setRevealed(true);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [countdown]
  );

  const toggleRevealed = () => {
    // currently revealed, and will be reset
    // reset the choices to empty
    const gameRef = ref(database, `games/${game.id}`);
    runTransaction(gameRef, (game: GameDto) => {
      if (game.revealed) {
        Object.keys(game.players).forEach((playerId) => {
          game.players[playerId] = CONST_EMPTY_OPTION;
        });
      }
      game.revealed = !game.revealed;
      return game;
    });
  };

  return { revealed, countdown, toggleRevealed };
};

export type RevealProps = ReturnType<typeof useReveal>;
