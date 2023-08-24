import { Button } from "antd";

import { BonkProps } from "../../hooks/useBonks";

const BonkButton = ({ setBonking }: Pick<BonkProps, "setBonking">) => {
  return (
    <div>
      <Button
        type="dashed"
        onClick={() => {
          setBonking((p) => !p);
        }}
      >
        🔨 BONK
      </Button>
    </div>
  );
};

export default BonkButton;
