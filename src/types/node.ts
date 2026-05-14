export type NodeState = "empty" | "start" | "end" | "wall" | "visited" | "path";

export interface NodeData {
  row: number;
  col: number;
  state: NodeState;
  previous?: NodeData | null
  weight?: number;
}

export type Tool = "start" | "end" | "wall" | "erase"| "weight";
