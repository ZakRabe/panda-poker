import { onDisconnect, onValue, ref, set } from '@firebase/database'
import { Typography } from 'antd'
import { useContext, useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router'

import AppLayout from '../AppLayout'
import { pop } from '../confetti'
import { CONST_COMMON_OPTIONS, CONST_EMPTY_OPTION, CONST_FIB_OPTIONS } from '../const'
import database from '../firebase'
import { Game as GameModel, GameDto, RoundChoice } from '../types'
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

  const tables = useMemo(() => {
    if (!game.players) {
      return [];
    }
    let currentIndex = 0;
    // split players into tables every 16 players
    return Object.keys(game.players).reduce((acc, playerId) => {
      if (Object.keys(acc[currentIndex] ?? []).length === 16) {
        currentIndex += 1;
      }
      if (!acc[currentIndex]) {
        acc[currentIndex] = {};
      }
      acc[currentIndex][playerId] = (game.players as any)[playerId];
      return acc;
    }, [] as Record<string, RoundChoice>[]);
  }, [game.players]);

  return (
    <AppLayout>
      <Typography.Title>{game.name}</Typography.Title>
      <div className="tables">
        {tables.map((table, index) => (
          <Table
            players={table}
            key={`table_${index}`}
            revealed={revealed}
            countdown={countdown}
          />
        ))}
      </div>
      {revealed && <Results players={game.players} />}
      <Vote options={options} />
    </AppLayout>
  );
};

export default Game;
