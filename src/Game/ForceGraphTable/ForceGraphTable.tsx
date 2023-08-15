import { useMemo } from "react";
import { ForceGraph2D } from "react-force-graph";
import { useElementSize } from "usehooks-ts";

import { useGamePlayers } from "../../hooks/useGamePlayers";
import { Game } from "../../types";
import { buildGraphData } from "./graphData";
import { nodeCanvasObject, nodePointerAreaPaint } from "./renderers";

type ForceGraphTableProps = {
  players: Game["players"];
  revealed: boolean;
};

export const ForceGraphTable = ({
  players,
  revealed,
}: ForceGraphTableProps) => {
  const playerData = useGamePlayers(players);

  const graphData = useMemo(() => {
    return buildGraphData(players, revealed, playerData);
  }, [players, revealed, playerData]);

  const [ref, { width, height }] = useElementSize();

  return (
    <div style={{ flex: 1 }} ref={ref}>
      <ForceGraph2D
        width={width}
        height={height}
        graphData={graphData as any}
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={nodePointerAreaPaint}
        // nodeCanvasObjectMode={}
      />
    </div>
  );
};
