import { FC, useCallback, useEffect, useRef, useState } from "react";
import { Stage } from "react-konva";
import { KonvaEventObject } from "konva/lib/Node";
import { Stage as StageInstance } from "konva/lib/Stage";
import { Vector2d } from "konva/lib/types";

import GridLayer from "../GridLayer/GridLayer";

import "./KonvaWrapper.scss";

// TODO - these should be configurable, but for this poc we'll leave them here for now
// 20x20 grid
const GRID_SIZE_X = 20;
const GRID_SIZE_Y = 20;
// each grid cell is a 30px square
const CELL_SIZE_PX = 30;
const MIN_ZOOM = 0.5;
const MAX_ZOOM = 8;

const KonvaWrapper: FC = () => {
  // need a ref to containing div for dynamic canvas resize
  const wrapperDivRef = useRef<HTMLDivElement>(null);
  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0
  });

  // need a ref to stage for pointer-centered zoom
  const konvaStageRef = useRef<StageInstance>(null);
  const [pointerPosition, setPointerPosition] = useState<Vector2d>();

  // handle zoom, centered on pointer
  const [zoom, setZoom] = useState(1);
  const zoomScaleFactor = 1.1;
  const handleCanvasZoom = useCallback((e: KonvaEventObject<WheelEvent>) => {
    const stage = e.target.getStage();
    const pointer = stage?.getPointerPosition();

    if (stage && pointer) {
      // evt.deltaY - negative means zoom in, positive means zoom out
      let newZoom = e.evt.deltaY < 0 ? zoom * zoomScaleFactor : zoom / zoomScaleFactor;
      if (newZoom >= MIN_ZOOM && newZoom <= MAX_ZOOM) {
        console.log(newZoom);
        setZoom(newZoom);

        // center zoom on pointer
        const scaledPointerOffset = {
          x: (pointer.x - stage.x()) / zoom,
          y: (pointer.y - stage.y()) / zoom,
        };
        var newPointerPosition = {
          x: pointer.x - scaledPointerOffset.x * newZoom,
          y: pointer.y - scaledPointerOffset.y * newZoom,
        };
        setPointerPosition(newPointerPosition);
        stage.position(newPointerPosition);
      }
    }
  }, [zoom, setZoom]);

  // when pointer position is updated, set the stage to it
  useEffect(() => {
    if (konvaStageRef.current && pointerPosition) {
      konvaStageRef.current.position(pointerPosition);
    }
  }, [konvaStageRef, pointerPosition]);

  const handleWrapperResize = () => {
    if (wrapperDivRef.current) {
      setCanvasDimensions({
        width: wrapperDivRef.current.offsetWidth,
        height: wrapperDivRef.current.offsetHeight,
      });
    }
  };

  // on render, initialize canvas dimensions and register resize listener for updates
  useEffect(() => {
    handleWrapperResize();
    window.addEventListener("resize", handleWrapperResize);
    return () => window.removeEventListener("resize", handleWrapperResize);
  }, []);

  // TODO - implement drag limits
  const handleCanvasDrag = (e: KonvaEventObject<DragEvent>) => {
    console.log(e, e.evt.x, e.evt.y);
  }

  return (
    <div ref={wrapperDivRef} className="konva-wrapper">
      <Stage
        ref={konvaStageRef}
        width={canvasDimensions.width}
        height={canvasDimensions.height}
        draggable
        onDragMove={handleCanvasDrag}
        scale={{ x: zoom, y: zoom }}
        onWheel={handleCanvasZoom}
      >
        <GridLayer
          gridSize={{ x: GRID_SIZE_X, y: GRID_SIZE_Y }}
          cellDimensionsPx={{ x: CELL_SIZE_PX, y: CELL_SIZE_PX}}
        />
      </Stage>
    </div>
  );
}

export default KonvaWrapper;
