import { FC } from "react";

import { CONST_EMPTY_OPTION } from "../const";
import { RoundChoice } from "../types";
import Card, { CardProps } from "./Card";
import Player from "./Player";

export type SeatProps = {
  playerId: string;
  choice: RoundChoice;
  state: CardProps["state"];
};
const Seat: FC<SeatProps> = ({ playerId, choice, state }) => {
  return (
    <div className="seat">
      <Player id={playerId} />
      <Card state={state}>{choice}</Card>
    </div>
  );
};
export const renderSeat = (
  props: Omit<SeatProps, "state">,
  revealed = false
) => {
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
