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

// args for pointer hitboxes
type NodeHitboxArguments<TNode extends GraphNode> = TNode extends UserNode
  ? { __pointerArc?: [number, number, number, number, number, boolean] }
  : // TODO: card hitbox
    never;

export type Renderable<TNode extends GraphNode> = TNode & {
  x: number;
  y: number;
  vx: number;
  vy: number;
} & NodeHitboxArguments<TNode>;
