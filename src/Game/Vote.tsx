import "./vote.css";

import { Button, Popover } from "antd";
import { Dispatch, FC, MouseEventHandler } from "react";

import { RevealProps } from "../hooks/useReveal";
import { useVote } from "../hooks/useVote";
import { RoundChoice } from "../types";
import Card from "./Card";

export type VoteProps = RevealProps & {
  options: RoundChoice[];
};

const Vote: FC<VoteProps> = ({
  options,
  countdown,
  revealed,
  toggleRevealed,
}) => {
  const [vote, castVote] = useVote();

  const content = (
    <div className="vote">
      {options.map((value) => (
        <Card
          key={value}
          state="revealed"
          active={vote === value}
          onClick={castVote(value)}
        >
          {value}
        </Card>
      ))}
    </div>
  );

  return (
    <>
      <div className="votePanel">
        <div>
          <div className="currentVote">
            <Popover placement="topLeft" content={content}>
              <div>
                <Card state="revealed">{vote}</Card>
              </div>
            </Popover>
          </div>
          <div className="actions"></div>
        </div>
        <div className="gameOptions">
          {
            <Button type="primary" onClick={toggleRevealed}>
              {countdown > 0 ? countdown : revealed ? "Reset" : "Reveal"}
            </Button>
          }
          {/* <label htmlFor="sittingOut">
            <input type="checkbox" id="sittingOut" name="sittingOut" />
            I'm sitting out
          </label> */}
        </div>
      </div>
    </>
  );
};

export default Vote;
