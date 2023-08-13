import "./vote.css";

import { Popover } from "antd";
import { FC } from "react";

import { useVote } from "../hooks/useVote";
import { RoundChoice } from "../types";
import Card from "./Card";

export type VoteProps = {
  options: RoundChoice[];
};

const Vote: FC<VoteProps> = ({ options }) => {
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
