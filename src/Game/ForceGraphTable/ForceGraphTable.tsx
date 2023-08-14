import { useState } from "react";
import { ForceGraph2D } from "react-force-graph";

import { Game } from "../../types";

type ForceGraphTableProps = {
  players: Game["players"];
};

export const ForceGraphTable = ({ players }: ForceGraphTableProps) => {
  const [data, setData] = useState({ nodes: [{ id: 0 }], links: [] });

  return (
    <div>
      ForceGraphTable
      <div>
        <pre>{JSON.stringify(players, null, 4)}</pre>
      </div>
      <div>
        <ForceGraph2D graphData={data} />
      </div>
    </div>
  );
};
