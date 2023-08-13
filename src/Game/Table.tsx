import "./table.css";

import { FC, useMemo } from "react";

import { Game } from "../types";
import { renderSeat, SeatProps } from "./Seat";

export type TableProps = {
  players?: Game["players"];
  revealed: boolean;
};

const Table: FC<TableProps> = ({ players, revealed }) => {
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

  return (
    <div className="grid">
      <div className="top">
        {seats.top.map((props) => renderSeat(props, revealed))}
      </div>
      <div className="left">
        {seats.left.map((props) => renderSeat(props, revealed))}
      </div>

      <div className="table"></div>
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
