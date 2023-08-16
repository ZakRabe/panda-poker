import { forceCollide } from "d3-force";
import { ComponentProps, useContext, useEffect, useMemo, useRef } from "react";
import { ForceGraph2D } from "react-force-graph";
import { useElementSize } from "usehooks-ts";

import { bonkSound } from "../../bonk";
import { BonkContext } from "../../hooks/useBonk";
import { usePlayers } from "../../hooks/useGamePlayers";
import { Game } from "../../types";
import { buildGraphData } from "./graphData";
import { nodeCanvasObject, nodePointerAreaPaint } from "./renderers";
import { GraphNode, isUserNode } from "./types";

type ForceGraphTableProps = {
  players: Game["players"];
  revealed: boolean;
};

const ForceGraphTable = ({ players, revealed }: ForceGraphTableProps) => {
  const playerData = usePlayers(players);
  const { isBonking, setBonking, bonkPlayer } = useContext(BonkContext);

  const graphData = useMemo(
    () => buildGraphData(players, revealed, playerData),
    [players, revealed, playerData]
  );

  const [wrapperRef, { width, height }] = useElementSize();
  const graphRef = useRef();

  useEffect(() => {
    // really messy getting the type from the ref otherwise. so just assert
    const graph = (graphRef as ComponentProps<typeof ForceGraph2D>["ref"])!
      .current;
    if (graph) {
      graph.d3Force("collide", forceCollide(32));
    }
  }, []);

  const onNodeClick = (node: GraphNode) => {
    if (isBonking && isUserNode(node)) {
      setBonking(false);
      bonkSound.play();
      bonkPlayer(node.id);
    }
  };

  return (
    <div style={{ flex: 1 }} ref={wrapperRef}>
      <ForceGraph2D
        width={width}
        height={height}
        nodeLabel="name"
        graphData={graphData as any}
        nodeCanvasObject={nodeCanvasObject}
        onNodeClick={onNodeClick}
        nodePointerAreaPaint={nodePointerAreaPaint}
        ref={graphRef as any}
      />
    </div>
  );
};

export default ForceGraphTable;
