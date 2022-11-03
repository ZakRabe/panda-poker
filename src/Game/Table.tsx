import './table.css'

import { runTransaction } from '@firebase/database'
import { Button } from 'antd'
import { ref } from 'firebase/database'
import { FC, useMemo } from 'react'
import { useParams } from 'react-router'

import { CONST_EMPTY_OPTION } from '../const'
import database from '../firebase'
import { Game, GameDto, RoundChoice } from '../types'
import Card, { CardProps } from './Card'
import Player from './Player'

type SeatProps = {
  playerId: string;
  choice: RoundChoice;
  state: CardProps["state"];
};
const Seat: FC<SeatProps> = ({ playerId, choice, state }) => {
  return (
    <div className="seat" style={{ display: "flex", alignItems: "center" }}>
      <Player id={playerId} />
      <Card state={state}>{choice}</Card>
    </div>
  );
};

export type TableProps = {
  players?: Game["players"];
  revealed: boolean;
  countdown: number;
};

const renderSeat = (props: Omit<SeatProps, "state">, revealed = false) => {
  let { choice } = props;
  const isEmpty = choice === CONST_EMPTY_OPTION;
  let state: CardProps["state"] = isEmpty ? "empty" : "hidden";

  if (revealed) {
    state = "revealed";
    if (isEmpty) {
      choice = "?";
    }
  }

  return <Seat key={props.playerId} {...props} choice={choice} state={state} />;
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
    const order = [
      "top",
      "bottom",
      "left",
      "right",
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
