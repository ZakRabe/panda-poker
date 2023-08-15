import { onValue, ref, Unsubscribe } from "firebase/database";
import { useEffect, useState } from "react";

import database from "../firebase";
import { Game, UserDto } from "../types";

export const useGamePlayers = (playerList: Game["players"]) => {
  const [players, setPlayers] = useState(new Map());
  useEffect(() => {
    const unsubscribers: Unsubscribe[] = [];
    const playerIds = playerList ? Object.keys(playerList) : [];
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
  }, [playerList]);

  return players;
};
