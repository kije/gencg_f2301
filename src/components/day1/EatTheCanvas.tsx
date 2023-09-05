import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { forEach, range, map, clamp } from "lodash";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";

const setup: SketchProps["setup"] = (p5, canvasParentRef) => {
  // use parent to render the canvas in this ref
  // (without that p5 will render the canvas outside of your component)
  p5.createCanvas(PAGE_CONTENT_WIDTH, 600).parent(canvasParentRef);
};

export const EatTheCanvas: FC = () => {
  const initialPoints = useMemo(
    () =>
      range(0, 45).map(() => ({
        x: Math.random() * PAGE_CONTENT_WIDTH,
        y: Math.random() * 600,
      })),
    [],
  );

  const points = useRef(initialPoints);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.stroke(
      255 - Math.random() * 10,
      255 - Math.random() * 10,
      255 - Math.random() * 10,
    );
    p5.strokeWeight(4);

    forEach(points.current, (point) => {
      p5.point(point.x, point.y);
    });

    points.current = map(points.current, (point) => ({
      x: point.x + Math.random() * 10 - 5,
      y: point.y + Math.random() * 10 - 5,
    }));
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
};
