import type { NodeData } from "@/types/node";

export type AlgorithmResult = {
  visitedInOrder: NodeData[];
  path: NodeData[];
  found: boolean;
};

export type AlgorithmFn = (
  grid: NodeData[][],
  start: NodeData,
  end: NodeData
) => AlgorithmResult;