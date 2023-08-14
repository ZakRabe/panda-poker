import { useEffect, useMemo, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { useElementSize } from "usehooks-ts";

import { Game } from "../../types";
import { buildGraphData } from "./nodeHelpers";

type ForceGraphTableProps = {
  players: Game["players"];
  revealed: boolean;
};

export const ForceGraphTable = ({
  players,
  revealed,
}: ForceGraphTableProps) => {
  const graphData = useMemo(
    () => buildGraphData(players, revealed),
    [players, revealed]
  );

  const [ref, { width, height }] = useElementSize();

  return (
    <div style={{ flex: 1 }} ref={ref}>
      {/* <div>
        <pre>{JSON.stringify(players, null, 4)}</pre>
      </div> */}

      <ForceGraph2D width={width} height={height} graphData={graphData} />
    </div>
  );
};
