import type { NodeData } from "@/types/node";
import { cn } from "@/lib/utils";

interface NodeProps {
  node: NodeData;
  onMouseDown: (row: number, col: number) => void;
  onMouseEnter: (row: number, col: number) => void;
  onMouseUp: () => void;
}

const stateClasses: Record<NodeData["state"], string> = {
  empty: "bg-card hover:bg-accent",
  start: "bg-[var(--node-start)] shadow-[0_0_8px_var(--node-start)]",
  end: "bg-[var(--node-end)] shadow-[0_0_8px_var(--node-end)]",
  wall: "bg-[var(--node-wall)]",
  visited: "bg-[var(--node-visited)]",
  path: "bg-[var(--node-path)]",
};

export function Node({ node, onMouseDown, onMouseEnter, onMouseUp }: NodeProps) {
  const hasWeight = node.state === "empty" && node.weight && node.weight > 1;
  return (
    <div
      role="button"
      aria-label={`node-${node.row}-${node.col}-${node.state}${hasWeight ? `-w${node.weight}` : ""}`}
      onMouseDown={(e) => {
        e.preventDefault();
        onMouseDown(node.row, node.col);
      }}
      onMouseEnter={() => onMouseEnter(node.row, node.col)}
      onMouseUp={onMouseUp}
      className={cn(
        "h-6 w-6 border border-border/40 transition-colors duration-100 select-none flex items-center justify-center text-[10px] font-bold text-foreground",
        hasWeight ? "bg-[var(--node-weight)]" : stateClasses[node.state],
      )}
    >
      {hasWeight ? node.weight : null}
    </div>
  );
}

