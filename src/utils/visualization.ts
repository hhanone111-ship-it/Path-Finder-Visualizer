import type { NodeData } from "@/types/node";
import type { Speed } from "@/components/ControlPanel";
import type React from "react";

function speedToMs(speed: Speed): number {
  switch (speed) {
    case "slow":   return 100;
    case "medium": return 10;
    case "fast":   return 2;
  }
}

export function animatePathfinder({
  visitedInOrder,
  path,
  speed,
  setGrid,
  animationId,
  currentId,
  onDone,
}: {
  visitedInOrder: NodeData[];
  path: NodeData[];
  speed: Speed;
  setGrid: (updater: (prev: NodeData[][]) => NodeData[][]) => void;
  animationId: React.RefObject<number>;
  currentId: number;
  onDone: () => void;
}) {
  const delay = speedToMs(speed);

  // Phase 1: animate visited nodes
  for (let i = 0; i < visitedInOrder.length; i++) {
    setTimeout(() => {
      if (animationId.current !== currentId) return;

      const node = visitedInOrder[i];
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        next[node.row][node.col] = { ...node, state: "visited" };
        return next;
      });
    }, i * delay);
  }

  // Phase 2: animate path nodes after phase 1 finishes
  const pathStartTime = visitedInOrder.length * delay;

  for (let i = 0; i < path.length; i++) {
    setTimeout(() => {
      if (animationId.current !== currentId) return;

      const node = path[i];
      setGrid((prev) => {
        const next = prev.map((row) => [...row]);
        next[node.row][node.col] = { ...node, state: "path" };
        return next;
      });

      // onDone fires after the last path node
      if (i === path.length - 1) {
        onDone();
      }
    }, pathStartTime + i * delay);
  }

  // Edge case: no path found — onDone still needs to fire
  if (path.length === 0) {
    setTimeout(() => {
      if (animationId.current !== currentId) return;
      onDone();
    }, pathStartTime);
  }
}