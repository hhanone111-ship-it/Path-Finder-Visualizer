import type { NodeData } from "@/types/node";

export const NUM_ROWS = 20;
export const NUM_COLS = 40;

export function createEmptyGrid(rows = NUM_ROWS, cols = NUM_COLS): NodeData[][] {
  return Array.from({ length: rows }, (_, row) =>
    Array.from({ length: cols }, (_, col) => ({
      row,
      col,
      state: "empty" as const,
    })),
  );
}

/** Return a new grid with the node at (row,col) replaced. */
export function updateNode(
  grid: NodeData[][],
  row: number,
  col: number,
  patch: Partial<NodeData>,
): NodeData[][] {
  return grid.map((r, ri) =>
    ri !== row ? r : r.map((n, ci) => (ci !== col ? n : { ...n, ...patch })),
  );
}

/** Find the first node with the given state, or null. */
export function findNode(grid: NodeData[][], state: NodeData["state"]) {
  for (const row of grid) for (const n of row) if (n.state === state) return n;
  return null;
}

/** Clear only visited + path nodes (keeps start, end, walls). */
export function clearPath(grid: NodeData[][]): NodeData[][] {
  return grid.map((row) =>
    row.map((n) =>
      n.state === "visited" || n.state === "path" ? { ...n, state: "empty" } : n,
    ),
  );
}
