import { FC, useEffect, useRef, useState } from "react";
import { Stage } from "react-konva";

import "./KonvaWrapper.scss";

const KonvaWrapper: FC = () => {
  const wrapperDivRef = useRef<HTMLDivElement>(null);

  const [canvasDimensions, setCanvasDimensions] = useState({
    width: 0,
    height: 0
  })

  const handleWrapperResize = () => {
    if (wrapperDivRef.current) {
      setCanvasDimensions({
        width: wrapperDivRef.current.offsetWidth,
        height: wrapperDivRef.current.offsetHeight,
      });
    }
  };

  useEffect(() => {
    // initialize canvas dimensions
    handleWrapperResize();
    // register resize event listener and clean it up on destroy
    window.addEventListener("resize", handleWrapperResize);
    return () => window.removeEventListener("resize", handleWrapperResize);
  }, []);

  return (
    <div ref={wrapperDivRef} className="konva-wrapper">
      <Stage
        width={canvasDimensions.width}
        height={canvasDimensions.height}
      >
      </Stage>
    </div>
  );
}

export default KonvaWrapper;
