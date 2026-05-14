import { NodeData } from "@/types/node";
import type { AlgorithmFn, AlgorithmResult } from "@/types/algorithms";
import { key, getNeighbors, reconstructPath } from "./helper";
import { MinHeap } from "./helper";

export const astar: AlgorithmFn = (grid, start, end): AlgorithmResult => {
  const openSet = new Set<string>();
  const gScore = new Map<string, number>();
  const fScore = new Map<string, number>();
  const cameFrom = new Map<string, NodeData>();
  const visitedInOrder: NodeData[] = [];
  const pq = new MinHeap();

  const startKey = key(start);

  gScore.set(startKey, 0);
  fScore.set(startKey, heuristic(start, end));

  openSet.add(startKey);
  pq.push(start, fScore.get(startKey)!);

  while (pq.size > 0) {
    const { node: current, cost } = pq.pop()!;
    const currentKey = key(current);

    if (cost > (fScore.get(currentKey) ?? Infinity)) {
      continue;
    }

    openSet.delete(currentKey);

    visitedInOrder.push(current);

    if (currentKey === key(end)) {
      return {
        visitedInOrder,
        path: reconstructPath(cameFrom, current),
        found: true,
      };
    }

    for (const neighbor of getNeighbors(current, grid)) {
      if (neighbor.state === "wall") continue;

      const neighborKey = key(neighbor);

      const tentativeGScore =
        (gScore.get(currentKey) ?? Infinity) + (neighbor.weight ?? 1);

      if (tentativeGScore < (gScore.get(neighborKey) ?? Infinity)) {
        cameFrom.set(neighborKey, current);
        gScore.set(neighborKey, tentativeGScore);

        const newFScore =
          tentativeGScore + heuristic(neighbor, end);

        fScore.set(neighborKey, newFScore);

        openSet.add(neighborKey);
        pq.push(neighbor, newFScore);
      }
    }
  }

  return {
    visitedInOrder,
    path: [],
    found: false,
  };
};


function heuristic(a: NodeData, b: NodeData): number {
    const dx = Math.abs(a.row - b.row);
    const dy = Math.abs(a.col - b.col);
    return dx + dy;
}