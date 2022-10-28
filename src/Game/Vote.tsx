import './vote.css'

import { onValue, ref, set } from '@firebase/database'
import { FC, useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router'

import { CONST_EMPTY_OPTION } from '../const'
import database from '../firebase'
import { RoundChoice } from '../types'
import UserContext from '../UserContext'
import Card from './Card'

export type VoteProps = {
  options: RoundChoice[];
};

const Vote: FC<VoteProps> = ({ options }) => {
  const { gameId } = useParams();
  const { id: userId } = useContext(UserContext);
  const [selected, setSelected] = useState<RoundChoice>();

  useEffect(() => {
    if (!userId || !gameId) {
      return;
    }
    const playerRef = ref(database, `games/${gameId}/players/${userId}`);
    return onValue(playerRef, (snapshot) => {
      const dto: RoundChoice = snapshot.val();
      setSelected(dto);
    });
  }, [gameId, userId]);

  const onChoice = (choice: RoundChoice) => {
    if (!userId || !gameId) {
      return;
    }

    const playerRef = ref(database, `games/${gameId}/players/${userId}`);
    set(playerRef, choice === selected ? CONST_EMPTY_OPTION : choice);
  };

  return (
    <div className="vote">
      {options.map((value, index) => (
        <Card
          key={index}
          state="revealed"
          active={selected === value}
          onClick={() => onChoice(value)}
        >
          {value}
        </Card>
      ))}
    </div>
  );
};

export default Vote;
