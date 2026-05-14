import { useRef, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Grid } from "@/components/Grid";
import { ControlPanel, type Algorithm, type Speed } from "@/components/ControlPanel";
import type { NodeData, Tool } from "@/types/node";
import { clearPath, createEmptyGrid, findNode } from "@/utils/gridHelpers";
import { AlgorithmFn } from "@/types/algorithms";
import { bfs } from "@/algorithm/bfs";
import { dijkstra } from "@/algorithm/dijkstra";
import { astar } from "@/algorithm/astar";  
import { animatePathfinder } from "@/utils/visualization";


export const Route = createFileRoute("/")({
  component: Index,
});

const algorithms: Record<Algorithm, AlgorithmFn> = {
  bfs,
  dijkstra,
  astar
}

function Index() {
  const [grid, setGrid] = useState<NodeData[][]>(() => createEmptyGrid());
  const [tool, setTool] = useState<Tool>("wall");
  const [algorithm, setAlgorithm] = useState<Algorithm>("bfs");
  const [speed, setSpeed] = useState<Speed>("medium");
  const [isRunning, setIsRunning] = useState(false);
  const [weightValue, setWeightValue] = useState<number>(5);
  const animationId = useRef(0);
  
  function handleVisualize() {
    const start = findNode(grid, "start");
    const end = findNode(grid, "end");

    if (!start || !end) {
      alert("Place both a start and an end node first.");
      return;
    }

    animationId.current += 1;
    const currentId = animationId.current;
    setIsRunning(true);

    const run = algorithms[algorithm];
    const result = run(grid, start, end);

    animatePathfinder({
      ...result,
      speed,
      setGrid,
      animationId,
      currentId,
      onDone: () => setIsRunning(false),
    });
  }

  return (
    <main className="min-h-screen bg-background p-6">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-5">
        <header className="flex flex-col gap-1">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Pathfinding Visualizer
          </h1>
          <p className="text-sm text-muted-foreground">
            Place a start, an end, and walls. Algorithms coming next.
          </p>
        </header>

        <ControlPanel
          tool={tool}
          setTool={setTool}
          algorithm={algorithm}
          setAlgorithm={setAlgorithm}
          speed={speed}
          setSpeed={setSpeed}
          weightValue={weightValue}
          setWeightValue={setWeightValue}
          onVisualize={handleVisualize}
          onClearPath={() => setGrid((g) => clearPath(g))}
          onReset={() => setGrid(createEmptyGrid())}
        />

        <div className="overflow-x-auto">
          <Grid grid={grid} setGrid={setGrid} tool={tool} weightValue={weightValue}/>
        </div>

        <Legend />
      </div>
    </main>
  );
}

function Legend() {
  const items: { label: string; cls: string }[] = [
    { label: "Start", cls: "bg-[var(--node-start)]" },
    { label: "End", cls: "bg-[var(--node-end)]" },
    { label: "Wall", cls: "bg-[var(--node-wall)]" },
    { label: "Visited", cls: "bg-[var(--node-visited)]" },
    { label: "Path", cls: "bg-[var(--node-path)]" },
  ];
  return (
    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
      {items.map((i) => (
        <div key={i.label} className="flex items-center gap-2">
          <span className={`h-4 w-4 rounded-sm border border-border ${i.cls}`} />
          {i.label}
        </div>
      ))}
    </div>
  );
}
