import { useEffect, useState } from "react";

import { pop } from "../confetti";
import { Game } from "../types";

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

  return { revealed, countdown };
};
