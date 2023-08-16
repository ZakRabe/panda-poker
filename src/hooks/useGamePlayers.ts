import { onValue, ref, Unsubscribe } from "firebase/database";
import { isEqual } from "lodash";
import { useEffect, useState } from "react";

import database from "../firebase";
import { Game, User, UserDto } from "../types";

export const usePlayerIds = (playerList: Game["players"]) => {
  const [playerIds, setPlayerIds] = useState<string[]>([]);

  useEffect(
    () => {
      const newPlayerIds = Object.keys(playerList ?? []);
      newPlayerIds.sort();
      if (isEqual(newPlayerIds, playerIds)) {
        return;
      }
      setPlayerIds(newPlayerIds);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [playerList]
  );
  return playerIds;
};

export const usePlayers = (playerList: Game["players"]) => {
  const [players, setPlayers] = useState<Map<string, User>>(new Map());
  const playerIds = usePlayerIds(playerList);

  useEffect(() => {
    const unsubscribers: Unsubscribe[] = [];
    playerIds.forEach((playerId) => {
      const playerRef = ref(database, `users/${playerId}`);
      const unsubscribe = onValue(playerRef, (snapshot) => {
        const user: UserDto = snapshot.val();
        setPlayers((prev) => {
          const newPlayers = new Map(prev);
          newPlayers.set(playerId, { id: playerId, ...user });
          return newPlayers;
        });
      });
      unsubscribers.push(unsubscribe);
    });

    return () => {
      unsubscribers.forEach((unsubscribe) => unsubscribe());
    };
  }, [playerIds]);

  return players;
};
