import { Layer, Line, Rect } from "react-konva"
import { Vector2d } from "konva/lib/types";
import { PropsWithChildren } from "react";

export interface GridLayerProps extends PropsWithChildren {
  // number of cells
  gridSize: Vector2d,
  // size of each cell
  cellDimensionsPx: Vector2d,
}

// abstraction of N x M grid defined by `gridSize` and px size
const GridLayer = ({ gridSize, cellDimensionsPx, children }: GridLayerProps) => {
  const gridLines = [];
  // vertical lines
  for (let x = 0; x <= gridSize.x; x++) {
    gridLines.push(
      <Line
        key={`x_${x}`}
        points={[
          Math.round(x * cellDimensionsPx.x) + 0.5,
          0,
          Math.round(x * cellDimensionsPx.x) + 0.5,
          gridSize.y * cellDimensionsPx.y,
        ]}
        stroke="#ddd"
        strokeWidth={1}
      />
    );
  }
  // horizontal lines
  for (let y = 0; y <= gridSize.y; y++) {
    gridLines.push(
      <Line
        key={`y_${y}`}
        points={[
          0,
          Math.round(y * cellDimensionsPx.y),
          gridSize.x * cellDimensionsPx.x,
          Math.round(y * cellDimensionsPx.y),
        ]}
        stroke="#ddd"
        strokeWidth={0.5}
      />
    );
  }

  return (
    <Layer className="grid-layer">
      {gridLines}
      {children}
    </Layer>
  )
}

export default GridLayer;
