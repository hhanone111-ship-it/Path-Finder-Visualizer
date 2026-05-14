import type { Tool } from "@/types/node";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { Flag, MapPin, Square, Eraser, RotateCcw, Sparkles, Weight } from "lucide-react";

export type Algorithm = "bfs" | "dijkstra" | "astar";
export type Speed = "slow" | "medium" | "fast";

interface ControlPanelProps {
  tool: Tool;
  setTool: (t: Tool) => void;
  algorithm: Algorithm;
  setAlgorithm: (a: Algorithm) => void;
  speed: Speed;
  setSpeed: (s: Speed) => void;
  weightValue: number;
  setWeightValue: (n: number) => void;
  onVisualize: () => void;
  onClearPath: () => void;
  onReset: () => void;
}

const tools: { value: Tool; label: string; icon: React.ComponentType<{ className?: string }> }[] = [
  { value: "start", label: "Start", icon: MapPin },
  { value: "end", label: "End", icon: Flag },
  { value: "wall", label: "Wall", icon: Square },
  { value: "weight", label: "Weight", icon: Weight },
  { value: "erase", label: "Erase", icon: Eraser },
];

export function ControlPanel({
  tool,
  setTool,
  algorithm,
  setAlgorithm,
  speed,
  setSpeed,
  weightValue,
  setWeightValue,
  onVisualize,
  onClearPath,
  onReset,
}: ControlPanelProps) {
  return (
    <div className="flex flex-wrap items-end gap-4 rounded-lg border border-border bg-card p-4 shadow-sm">
      <div className="flex flex-col gap-2">
        <span className="text-xs font-medium text-muted-foreground">Tool</span>
        <div className="flex gap-1">
          {tools.map(({ value, label, icon: Icon }) => (
            <button
              key={value}
              onClick={() => setTool(value)}
              className={cn(
                "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors",
                tool === value
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-accent",
              )}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-muted-foreground" htmlFor="algo">
          Algorithm
        </label>
        <select
          id="algo"
          value={algorithm}
          onChange={(e) => setAlgorithm(e.target.value as Algorithm)}
          className="h-9 rounded-md border border-border bg-background px-2 text-sm"
        >
          <option value="bfs">BFS</option>
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A*</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-muted-foreground" htmlFor="speed">
          Speed
        </label>
        <select
          id="speed"
          value={speed}
          onChange={(e) => setSpeed(e.target.value as Speed)}
          className="h-9 rounded-md border border-border bg-background px-2 text-sm"
        >
          <option value="slow">Slow</option>
          <option value="medium">Medium</option>
          <option value="fast">Fast</option>
        </select>
      </div>

      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-muted-foreground" htmlFor="weight">
          Weight
        </label>
        <Input
          id="weight"
          type="number"
          min={2}
          max={99}
          value={weightValue}
          onChange={(e) => {
            const n = parseInt(e.target.value, 10);
            if (!Number.isNaN(n)) setWeightValue(Math.max(2, Math.min(99, n)));
          }}
          className="h-9 w-20"
        />
      </div>

      <div className="ml-auto flex gap-2">
        <Button onClick={onVisualize} className="gap-1.5">
          <Sparkles className="h-4 w-4" />
          Visualize
        </Button>
        <Button variant="secondary" onClick={onClearPath}>
          Clear Path
        </Button>
        <Button variant="outline" onClick={onReset} className="gap-1.5">
          <RotateCcw className="h-4 w-4" />
          Reset
        </Button>
      </div>
    </div>
  );
}
