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
  const { setBonking } = useContext(BonkContext);

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
        <div style={{ display: "flex", gap: 20 }}>
          <div className="currentVote">
            <Popover placement="topLeft" content={content}>
              <div>
                <Card state="revealed">{vote}</Card>
              </div>
            </Popover>
          </div>
          <div
            className="actions"
            style={{ display: "flex", flexDirection: "column", gap: 20 }}
          >
            <Button
              type="primary"
              disabled={countdown > 0}
              onClick={toggleRevealed}
            >
              {countdown > 0 ? countdown : revealed ? "Reset" : "Reveal"}
            </Button>
            <BonkButton setBonking={setBonking} />
            {/* <GavelButton /> */}
          </div>
        </div>
        <div className="gameOptions"></div>
      </div>
    </>
  );
};

export default VotePanel;
