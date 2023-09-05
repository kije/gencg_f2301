import { forEach, range, map, clamp } from "lodash";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";

import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

const setup: SketchProps["setup"] = (p5, canvasParentRef) => {
  // use parent to render the canvas in this ref
  // (without that p5 will render the canvas outside of your component)
  p5.createCanvas(900, 768).parent(canvasParentRef);
};

export const Sollewit: FC = () => {
  const initialPoints = useMemo(
    () =>
      range(0, 22).map(() => ({
        x: Math.random() * 900,
        y: Math.random() * 700,
      })),
    [],
  );

  const points = useRef(initialPoints);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.background(255, 0);
    p5.clear();
    p5.stroke(255, 255, 255);
    p5.strokeWeight(7);

    forEach(points.current, (point) => {
      p5.point(point.x, point.y);
    });

    p5.strokeWeight(0.5);
    p5.stroke(200, 200, 200);
    forEach(points.current, (point) => {
      forEach(points.current, (point2) => {
        if (point === point2) {
          return;
        }

        p5.line(point.x, point.y, point2.x, point2.y);
      });
    });

    points.current = map(points.current, (point) => ({
      x: clamp(point.x + Math.random() * 5 - 2.5, 10, 890),
      y: clamp(point.y + Math.random() * 5 - 2.5, 10, 690),
    }));
  }, []);

  return <Sketch setup={setup} draw={draw} />;
};
