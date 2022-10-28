import './player.css'

import { onValue } from '@firebase/database'
import { ref } from 'firebase/database'
import { FC, useEffect, useState } from 'react'

import database from '../firebase'
import { UserDto } from '../types'

export type PlayerProps = {
  id: string;
};

// TODO: Use players context to avoid requesting the data twice
const Player: FC<PlayerProps> = ({ id }) => {
  const [player, setPlayer] = useState<UserDto>();

  useEffect(() => {
    const playerRef = ref(database, `users/${id}`);
    return onValue(playerRef, (snapshot) => {
      const user: UserDto = snapshot.val();
      setPlayer(user);
    });
  }, [id]);

  if (!player) {
    return null;
  }
  return (
    <div className="player">
      <span>{player.name}</span>

      <img
        alt={player.name || "very mysterious"}
        title={player.name || "very mysterious"}
        src={player.img || "/mystery.png"}
      />
    </div>
  );
};

export default Player;
