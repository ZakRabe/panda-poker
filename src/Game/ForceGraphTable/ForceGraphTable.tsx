import { forceCollide } from "d3-force";
import { ComponentProps, useEffect, useMemo, useRef } from "react";
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

  const [wrapperRef, { width, height }] = useElementSize();
  const graphRef = useRef();

  useEffect(() => {
    const graph = (graphRef as ComponentProps<typeof ForceGraph2D>["ref"])!
      .current;
    if (graph) {
      graph.d3Force("collide", forceCollide(50));
    }
  }, [graphRef.current]);

  return (
    <div style={{ flex: 1 }} ref={wrapperRef}>
      <ForceGraph2D
        width={width}
        height={height}
        nodeLabel="name"
        graphData={graphData as any}
        nodeCanvasObject={nodeCanvasObject}
        nodePointerAreaPaint={nodePointerAreaPaint}
        ref={graphRef as any}
      />
    </div>
  );
};
