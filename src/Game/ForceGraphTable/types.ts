import { User } from "../../types";

export type UserNode = User & {
  id: string;
  type: "player";
};
export type CardNode = {
  id: string;
  type: "card";
};

export type GraphNode = CardNode | UserNode;
export type GraphData = {
  nodes: GraphNode[];
  links: { source: string; target: string }[];
};

export type Renderable<TNode extends GraphNode> = TNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
  __pointerArc?: [number, number, number, number, number, boolean];
};
