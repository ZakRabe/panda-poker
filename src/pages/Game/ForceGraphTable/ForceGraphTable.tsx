import { isEqual } from "lodash";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { ForceGraph2D } from "react-force-graph";
import { useElementSize } from "usehooks-ts";

import { BonkContext, bonkSound } from "../../../hooks/useBonks";
import { usePlayers } from "../../../hooks/useGamePlayers";
import { Game } from "../../../types";
import { buildGraphData } from "./graphData";
import { nodeCanvasObject, nodePointerAreaPaint } from "./renderers";
import { GraphNode, isUserNode } from "./types";

type ForceGraphTableProps = {
  players: Game["players"];
  revealed: boolean;
};

const ForceGraphTable = ({ players, revealed }: ForceGraphTableProps) => {
  const playerData = usePlayers(players);

  const nodePositions = useRef<Record<string, { x: number; y: number }>>({});

  // avoid bonks updating the graph
  const [stablePlayers, setStablePlayers] = useState(players);
  useEffect(() => {
    if (isEqual(players, stablePlayers)) {
      return;
    }
    setStablePlayers(players);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [players]);

  const { isBonking, setBonking, bonkPlayer } = useContext(BonkContext);

  const graphData = useMemo(
    () =>
      buildGraphData(
        stablePlayers,
        revealed,
        playerData,
        nodePositions.current
      ),
    [stablePlayers, revealed, playerData]
  );

  const [wrapperRef, { width, height }] = useElementSize();

  const onNodeClick = (node: GraphNode) => {
    if (isBonking && isUserNode(node)) {
      setBonking(false);
      bonkSound.play();
      bonkPlayer(node.id);
    }
  };

  const data = useRef(graphData);
  data.current = graphData;

  return (
    <div style={{ flex: 1 }} ref={wrapperRef}>
      <ForceGraph2D
        width={width}
        height={height}
        nodeLabel="name"
        graphData={data.current as any}
        nodeCanvasObject={nodeCanvasObject}
        onNodeClick={onNodeClick}
        cooldownTicks={120}
        nodePointerAreaPaint={nodePointerAreaPaint}
        onNodeDragEnd={(node) => {
          nodePositions.current[node.id] = { x: node.x, y: node.y };
          node.fx = node.x;
          node.fy = node.y;
        }}
      />
    </div>
  );
};

export default ForceGraphTable;
