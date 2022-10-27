import './player.css'

import { onValue } from '@firebase/database'
import { ref } from 'firebase/database'
import { FC, useEffect, useState } from 'react'

import database from '../firebase'
import { UserDto } from '../types'

export type PlayerProps = {
  id: string;
};

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
    <div className="player" style={{}}>
      <span style={{ whiteSpace: "nowrap" }}>{player.name}</span>
      {player.img && (
        <img
          style={{ width: 50, borderRadius: "50%" }}
          alt={player.name}
          title={player.name}
          src={player.img}
        />
      )}
      {!player.name && !player.img && (
        <img
          style={{ width: 50, borderRadius: "50%" }}
          alt="very mysterious"
          title={"very mysterious"}
          src={"/mystery.png"}
        />
      )}
      {!player.img && <div>{player.name}</div>}
    </div>
  );
};

export default Player;
