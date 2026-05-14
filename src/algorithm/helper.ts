import type { NodeData } from "@/types/node";

export const key = (node: NodeData) => `${node.row},${node.col}`;

export function getNeighbors(node: NodeData, grid: NodeData[][]): NodeData[] {
  const { row, col } = node;
  const neighbors: NodeData[] = [];

  if (row > 0)                  neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1)    neighbors.push(grid[row + 1][col]);
  if (col > 0)                  neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}

export function reconstructPath(
  cameFrom: Map<string, NodeData>,
  end: NodeData
): NodeData[] {
  const path: NodeData[] = [];
  let current: NodeData | undefined = end;

  while (current) {
    path.unshift(current);
    current = cameFrom.get(key(current));
  }

  path.shift(); // remove start
  path.pop();   // remove end

  return path;
}

// Simple min-heap priority queue
export class MinHeap {
  private heap: { node: NodeData; cost: number }[] = [];

  push(node: NodeData, cost: number) {
    this.heap.push({ node, cost });
    this.bubbleUp(this.heap.length - 1);
  }

  pop(): { node: NodeData; cost: number } | undefined {
    if (this.heap.length === 0) return undefined;
    const min = this.heap[0];
    const last = this.heap.pop()!;
    if (this.heap.length > 0) {
      this.heap[0] = last;
      this.sinkDown(0);
    }
    return min;
  }

  get size() {
    return this.heap.length;
  }

  private bubbleUp(i: number) {
    while (i > 0) {
      const parent = Math.floor((i - 1) / 2);
      if (this.heap[parent].cost <= this.heap[i].cost) break;
      [this.heap[parent], this.heap[i]] = [this.heap[i], this.heap[parent]];
      i = parent;
    }
  }

  private sinkDown(i: number) {
    const length = this.heap.length;
    while (true) {
      const left  = 2 * i + 1;
      const right = 2 * i + 2;
      let smallest = i;

      if (left  < length && this.heap[left].cost  < this.heap[smallest].cost) smallest = left;
      if (right < length && this.heap[right].cost < this.heap[smallest].cost) smallest = right;
      if (smallest === i) break;

      [this.heap[smallest], this.heap[i]] = [this.heap[i], this.heap[smallest]];
      i = smallest;
    }
  }
}