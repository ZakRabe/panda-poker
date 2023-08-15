import { onDisconnect, onValue, ref, set } from "firebase/database";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { CONST_EMPTY_OPTION } from "../const";
import database from "../firebase";
import { Game, GameDto } from "../types";
import UserContext from "../UserContext";

export const useGame = () => {
  const { gameId } = useParams();
  const { id: userId } = useContext(UserContext);
  const [game, setGame] = useState<Game>({
    id: "",
    name: "Loading...",
    players: {},
    revealed: false,
  });

  useEffect(() => {
    if (!game.name) {
      return;
    }
    document.title = game.name;
  }, [game.name]);

  useEffect(() => {
    if (!gameId) {
      return;
    }
    const gameRef = ref(database, `games/${gameId}`);
    return onValue(gameRef, (snapshot) => {
      const dto: GameDto = snapshot.val();
      setGame({ id: gameId, ...dto });
    });
  }, [gameId]);

  useEffect(() => {
    if (!game.id) {
      return;
    }
    // add the user to the list of players in the game
    const playerRef = ref(database, `games/${game.id}/players/${userId}`);
    set(playerRef, CONST_EMPTY_OPTION);
    // remove user on disconnect
    onDisconnect(playerRef).remove();
  }, [userId, game.id]);
  return game;
};
