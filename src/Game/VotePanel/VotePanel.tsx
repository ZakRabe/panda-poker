import "./vote.css";

import { Button, Popover } from "antd";
import { FC, useContext } from "react";

import { BonkContext } from "../../hooks/useBonk";
import { RevealProps } from "../../hooks/useReveal";
import { useVote } from "../../hooks/useVote";
import { RoundChoice } from "../../types";
import Card from "../Card";
import BonkButton from "./BonkButton";

export type VoteProps = RevealProps & {
  options: RoundChoice[];
};

const VotePanel: FC<VoteProps> = ({
  options,
  countdown,
  revealed,
  toggleRevealed,
}) => {
  const [vote, castVote] = useVote();
  const { isBonking, setBonking } = useContext(BonkContext);

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
        <div style={{ display: "flex" }}>
          <div className="currentVote">
            <Popover placement="topLeft" content={content}>
              <div>
                <Card state="revealed">{vote}</Card>
              </div>
            </Popover>
          </div>
          <div className="actions">
            <BonkButton setBonking={setBonking} />
            {/* <GavelButton /> */}
          </div>
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

export default VotePanel;
