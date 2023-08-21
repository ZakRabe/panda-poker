import "./card.css";

import { FC } from "react";

export type CardProps = {
  state: "empty" | "hidden" | "revealed";
  active?: boolean;
  onClick?: () => void;
};

const Card: FC<CardProps> = ({ state, children, active, onClick }) => {
  return (
    <div
      className={`card ${state} ${active ? "active" : ""}`}
      onClick={onClick}
    >
      <div className={`inner ${state === "revealed" ? "revealed" : ""}`}>
        <div className={`back ${state}`}></div>
        <div className="front">{children}</div>
      </div>
    </div>
  );
};

export default Card;
