# Pathfinding Visualizer

A React + Vite app for visualizing shortest-path algorithms on an interactive grid.

## Features

- Visualize BFS, Dijkstra, and A* pathfinding algorithms
- Interactive grid with start/end nodes, walls, and weighted nodes
- Animated step-by-step visualization with adjustable speed
- Responsive control panel built with Radix UI and TanStack Router

## Prerequisites

Node.js 18+

## Getting Started

### Install dependencies

\`\`\`bash
npm install
\`\`\`

### Run locally

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for production

\`\`\`bash
npm run build
\`\`\`

### Preview production build

\`\`\`bash
npm run preview
\`\`\`

## Project Structure

\`\`\`
src/
  algorithms/   ← BFS, Dijkstra, A*, shared helpers and types
  components/   ← Grid, ControlPanel, and UI primitives
  routes/       ← Route components and route setup
  types/        ← Shared TypeScript types (NodeData, Tool)
  utils/        ← Grid helpers and animation utilities
\`\`\`