import "./votePanel.css";

import { Button, Popover } from "antd";
import { FC, useContext } from "react";

import { CONST_COMMON_OPTIONS, CONST_FIB_OPTIONS } from "../../../const";
import { BonkContext } from "../../../hooks/useBonks";
import { RevealProps } from "../../../hooks/useReveal";
import { useVote } from "../../../hooks/useVote";
import Card from "../Card/Card";
import BonkButton from "./BonkButton";

export type VoteProps = RevealProps;

const options = [...CONST_FIB_OPTIONS, ...CONST_COMMON_OPTIONS];

const VotePanel: FC<VoteProps> = ({ countdown, revealed, toggleRevealed }) => {
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
      <div className="vote-panel">
        <div className="current-vote">
          <Popover placement="topLeft" content={content}>
            <div>
              <Card state="revealed">{vote}</Card>
            </div>
          </Popover>
        </div>
        <div className="actions">
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
    </>
  );
};

export default VotePanel;
