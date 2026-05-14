import { useCallback, useState } from "react";
import type { NodeData, Tool } from "@/types/node";
import { findNode, updateNode } from "@/utils/gridHelpers";
import { Node } from "./Node";

interface GridProps {
  grid: NodeData[][];
  setGrid: React.Dispatch<React.SetStateAction<NodeData[][]>>;
  tool: Tool;
  weightValue: number;
}

export function Grid({ grid, setGrid, tool, weightValue }: GridProps) {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const applyTool = useCallback(
    (row: number, col: number, dragging = false) => {
      setGrid((prev) => {
        const node = prev[row][col];

        if (tool === "start") {
          if (dragging) return prev;
          if (node.state === "start") return prev;
          let next = prev;
          const existing = findNode(next, "start");
          if (existing) next = updateNode(next, existing.row, existing.col, { state: "empty" });
          return updateNode(next, row, col, { state: "start", weight: 1 });
        }

        if (tool === "end") {
          if (dragging) return prev;
          if (node.state === "end") return prev;
          let next = prev;
          const existing = findNode(next, "end");
          if (existing) next = updateNode(next, existing.row, existing.col, { state: "empty" });
          return updateNode(next, row, col, { state: "end", weight: 1 });
        }

        if (tool === "wall") {
          if (node.state === "start" || node.state === "end") return prev;
          if (node.state === "wall") return prev;
          return updateNode(prev, row, col, { state: "wall", weight: 1 });
        }

        if (tool === "weight") {
          if (node.state === "start" || node.state === "end" || node.state === "wall") return prev;
          if (node.weight === weightValue && node.state === "empty") return prev;
          return updateNode(prev, row, col, { state: "empty", weight: weightValue });
        }

        if (tool === "erase") {
          if (node.state === "empty" && (!node.weight || node.weight === 1)) return prev;
          return updateNode(prev, row, col, { state: "empty", weight: 1 });
        }

        return prev;
      });
    },
    [setGrid, tool, weightValue],
  );

  return (
    <div
      className="inline-block rounded-lg border border-border bg-background p-2 shadow-sm"
      onMouseLeave={() => setIsMouseDown(false)}
    >
      {grid.map((row, ri) => (
        <div key={ri} className="flex">
          {row.map((node) => (
            <Node
              key={`${node.row}-${node.col}`}
              node={node}
              onMouseDown={(r, c) => {
                setIsMouseDown(true);
                applyTool(r, c, false);
              }}
              onMouseEnter={(r, c) => {
                if (isMouseDown) applyTool(r, c, true);
              }}
              onMouseUp={() => setIsMouseDown(false)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}
