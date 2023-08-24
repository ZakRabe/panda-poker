import { onValue, ref, set } from "firebase/database";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import UserContext from "../App/UserContext";
import { CONST_EMPTY_OPTION } from "../const";
import database from "../firebase";
import { RoundChoice } from "../types";

export const useVote = () => {
  const { gameId } = useParams();
  const { id: userId } = useContext(UserContext);
  const [vote, setVote] = useState<RoundChoice>();

  const playerRef = useMemo(() => {
    if (!userId || !gameId) {
      return null;
    }
    return ref(database, `games/${gameId}/players/${userId}`);
  }, [gameId, userId]);

  useEffect(() => {
    if (!playerRef) {
      return;
    }
    return onValue(playerRef, (snapshot) => {
      const dto: RoundChoice = snapshot.val();
      setVote(dto);
    });
  }, [playerRef]);

  const castVote = useCallback(
    (choice: RoundChoice) => () => {
      if (!playerRef) {
        return;
      }
      set(playerRef, choice === vote ? CONST_EMPTY_OPTION : choice);
    },
    [playerRef, vote]
  );

  return [vote, castVote] as const;
};
