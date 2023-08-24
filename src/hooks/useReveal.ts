import { onValue, ref, runTransaction } from "firebase/database";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import { pop } from "../confetti";
import { CONST_EMPTY_OPTION } from "../const";
import database from "../firebase";
import { GameDto } from "../types";

export const useReveal = () => {
  const { gameId } = useParams();
  const [remoteRevealed, setRemoteRevealed] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const revealedRef = useMemo(
    () => ref(database, `games/${gameId}/revealed`),
    [gameId]
  );

  useEffect(() => {
    return onValue(revealedRef, (snapshot) => {
      const dto: boolean = snapshot.val();
      setRemoteRevealed(dto);
    });
  }, [revealedRef]);

  useEffect(() => {
    if (!remoteRevealed) {
      setRevealed(false);
      return;
    }
    setCountdown(3);
    setTimeout(() => setCountdown(2), 1000);
    setTimeout(() => setCountdown(1), 2000);
    setTimeout(() => setCountdown(0), 3000);
  }, [remoteRevealed]);

  // reveal the cards when countdown hits 0
  useEffect(
    () => {
      if (countdown === 0 && remoteRevealed) {
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
    const gameRef = ref(database, `games/${gameId}`);
    runTransaction(gameRef, (previousGame: GameDto) => {
      if (previousGame.revealed) {
        Object.keys(previousGame.players).forEach((playerId) => {
          previousGame.players[playerId] = CONST_EMPTY_OPTION;
        });
      }
      previousGame.revealed = !previousGame.revealed;
      return previousGame;
    });
  };

  return { revealed, countdown, toggleRevealed };
};

export type RevealProps = ReturnType<typeof useReveal>;
