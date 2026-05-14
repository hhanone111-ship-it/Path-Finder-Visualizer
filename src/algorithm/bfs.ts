import type { NodeData } from "@/types/node";
import type { AlgorithmFn, AlgorithmResult } from "@/types/algorithms";
import { key, getNeighbors, reconstructPath } from "./helper";


export const bfs: AlgorithmFn = (grid, start, end): AlgorithmResult => {
  const visited = new Set<string>();
  const cameFrom = new Map<string, NodeData>();
  const visitedInOrder: NodeData[] = [];
  const queue: NodeData[] = [];

  visited.add(key(start));
  queue.push(start);

  while (queue.length > 0) {
    const current = queue.shift()!;
    visitedInOrder.push(current);

    if (current.row === end.row && current.col === end.col) {
      return {
        visitedInOrder,
        path: reconstructPath(cameFrom, end),
        found: true,
      };
    }

    for (const neighbor of getNeighbors(current, grid)) {
      const k = key(neighbor);
      if (!visited.has(k) && neighbor.state !== "wall") {
        visited.add(k);
        cameFrom.set(k, current);
        queue.push(neighbor);
      }
    }
  }

  return {
    visitedInOrder,
    path: [],
    found: false,
  };
};