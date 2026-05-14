import type { NodeData } from "@/types/node";
import type { AlgorithmFn, AlgorithmResult } from "@/types/algorithms";
import { key, getNeighbors, reconstructPath } from "./helper";
import { MinHeap } from "./helper";



export const dijkstra: AlgorithmFn = (grid, start, end): AlgorithmResult => {
  const dist = new Map<string, number>();
  const cameFrom = new Map<string, NodeData>();
  const visitedInOrder: NodeData[] = [];
  const pq = new MinHeap();

  dist.set(key(start), 0);
  pq.push(start, 0);

  while (pq.size > 0) {
    const { node: current, cost } = pq.pop()!;
    const k = key(current);

    // Skip stale entries — node was already settled at lower cost
    if (cost > (dist.get(k) ?? Infinity)) continue;

    visitedInOrder.push(current);

    if (current.row === end.row && current.col === end.col) {
      return {
        visitedInOrder,
        path: reconstructPath(cameFrom, end),
        found: true,
      };
    }

    for (const neighbor of getNeighbors(current, grid)) {
      if (neighbor.state === "wall") continue;

      const nk = key(neighbor);
      const newCost = cost + (neighbor.weight ?? 1);

      if (newCost < (dist.get(nk) ?? Infinity)) {
        dist.set(nk, newCost);
        cameFrom.set(nk, current);
        pq.push(neighbor, newCost);
      }
    }
  }

  return {
    visitedInOrder,
    path: [],
    found: false,
  };
};