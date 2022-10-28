import { onDisconnect, onValue, ref, set } from '@firebase/database'
import { Typography } from 'antd'
import { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import AppLayout from '../AppLayout'
import { pop } from '../confetti'
import { CONST_COMMON_OPTIONS, CONST_EMPTY_OPTION, CONST_FIB_OPTIONS } from '../const'
import database from '../firebase'
import { Game as GameModel, GameDto } from '../types'
import UserContext from '../UserContext'
import Results from './Results'
import Table from './Table'
import Vote from './Vote'

const options = [...CONST_FIB_OPTIONS, ...CONST_COMMON_OPTIONS];
const Game = () => {
  const { gameId } = useParams();
  const { id: userId } = useContext(UserContext);
  const [game, setGame] = useState<GameModel>({
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

  return (
    <AppLayout>
      <Typography.Title>{game.name}</Typography.Title>
      <Table players={game.players} revealed={revealed} countdown={countdown} />
      {revealed && <Results players={game.players} />}
      <Vote options={options} />
    </AppLayout>
  );
};

export default Game;
