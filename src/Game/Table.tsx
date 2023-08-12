import './table.css'

import { runTransaction } from '@firebase/database'
import { Button } from 'antd'
import { ref } from 'firebase/database'
import { FC, useMemo } from 'react'
import { useParams } from 'react-router'

import { CONST_EMPTY_OPTION } from '../const'
import database from '../firebase'
import { Game, GameDto } from '../types'
import { renderSeat, SeatProps } from './Seat'

export type TableProps = {
  players?: Game["players"];
  revealed: boolean;
  countdown: number;
};

const Table: FC<TableProps> = ({ players, revealed, countdown }) => {
  const { gameId } = useParams();

  const seats = useMemo(() => {
    const newSeats: Record<string, Omit<SeatProps, "state">[]> = {
      top: [],
      left: [],
      right: [],
      bottom: [],
    };
    if (!players) {
      return newSeats;
    }
    // could use a generator function for this instead of orderIndex?
    // keep most of the users on top/bottom
    // 16 users. 2 on each side, rest top/bottom
    const order = [
      "top",
      "bottom",
      "left",
      "right",
      "top",
      "bottom",
      "top",
      "bottom",
      "top",
      "bottom",
      "top",
      "bottom",
      "top",
      "bottom",
      "left",
      "right",
    ];

    let orderIndex = 0;
    Object.keys(players).forEach((playerId) => {
      newSeats[order[orderIndex]].push({
        playerId,
        choice: players[playerId],
      });
      if (order[orderIndex + 1]) {
        orderIndex += 1;
      } else {
        orderIndex = 0;
      }
    });

    return newSeats;
  }, [players]);

  const onReveal = () => {
    // currently revealed, and will be reset
    // reset the choices to empty
    const gameRef = ref(database, `games/${gameId}`);
    runTransaction(gameRef, (game: GameDto) => {
      if (game.revealed) {
        Object.keys(game.players).forEach((playerId) => {
          game.players[playerId] = CONST_EMPTY_OPTION;
        });
      }
      game.revealed = !game.revealed;
      return game;
    });
  };

  return (
    <div className="grid">
      <div className="top">
        {seats.top.map((props) => renderSeat(props, revealed))}
      </div>
      <div className="left">
        {seats.left.map((props) => renderSeat(props, revealed))}
      </div>

      <div className="table">
        {countdown || (
          <Button onClick={onReveal}>{revealed ? "Reset" : "Reveal"}</Button>
        )}
      </div>
      <div className="right">
        {seats.right.map((props) => renderSeat(props, revealed))}
      </div>
      <div className="bottom">
        {seats.bottom.map((props) => renderSeat(props, revealed))}
      </div>
    </div>
  );
};

export default Table;
