import { Layer, Line } from "react-konva"
import { Vector2d } from "konva/lib/types";

export interface GridLayerProps {
  // number of cells
  gridSize: Vector2d,
  // size of each cell
  cellDimensionsPx: Vector2d
}

// abstraction of N x M grid defined by `gridCells` and px size
const GridLayer = ({ gridSize: gridCells, cellDimensionsPx: cellDimensions }: GridLayerProps) => {
  const gridLines = [];
  // vertical lines
  for (let x = 0; x <= gridCells.x; x++) {
    gridLines.push(
      <Line
        key={`x_${x}`}
        points={[
          Math.round(x * cellDimensions.x) + 0.5,
          0,
          Math.round(x * cellDimensions.x) + 0.5,
          gridCells.y * cellDimensions.y,
        ]}
        stroke="#ddd"
        strokeWidth={1}
      />
    );
  }
  // horizontal lines
  for (let y = 0; y <= gridCells.y; y++) {
    gridLines.push(
      <Line
        key={`y_${y}`}
        points={[
          0,
          Math.round(y * cellDimensions.y),
          gridCells.x * cellDimensions.x,
          Math.round(y * cellDimensions.y),
        ]}
        stroke="#ddd"
        strokeWidth={0.5}
      />
    );
  }

  return (
    <Layer className="grid-layer">
      {gridLines}
    </Layer>
  )
}

export default GridLayer;
