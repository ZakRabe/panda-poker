import { User } from "../../types";

export type UserNode = User & {
  id: string;
  type: "player";
};
export type CardNode = {
  id: string;
  type: "card";
  revealed: boolean;
};

export type GraphNode = CardNode | UserNode;
export type GraphData = {
  nodes: GraphNode[];
  links: { source: string; target: string }[];
};

// args for pointer hitboxes
type NodeHitboxArguments<TNode extends GraphNode> = TNode extends UserNode
  ? { __pointerArc?: Parameters<CanvasRenderingContext2D["arc"]> }
  : { __pointerRect?: Parameters<CanvasRenderingContext2D["rect"]> };

export type Renderable<TNode extends GraphNode> = TNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
} & NodeHitboxArguments<TNode>;

export const isUserNode = (node: GraphNode): node is Renderable<UserNode> =>
  node.type === "player";

export const isCardNode = (node: GraphNode): node is Renderable<CardNode> =>
  node.type === "card";
