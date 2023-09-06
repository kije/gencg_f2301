import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { forEach, range, map, clamp } from "lodash";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";

import { Sketch } from "@/utils/dynamic-sketch";

const setup: SketchProps["setup"] = (p5, canvasParentRef) => {
  // use parent to render the canvas in this ref
  // (without that p5 will render the canvas outside of your component)
  p5.createCanvas(PAGE_CONTENT_WIDTH, 700).parent(canvasParentRef);
};

export const Sollewit: FC = () => {
  const initialPoints = useMemo(
    () =>
      range(0, 22).map(() => ({
        x: Math.random() * PAGE_CONTENT_WIDTH,
        y: Math.random() * 700,
      })),
    [],
  );

  const points = useRef(initialPoints);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.clear();
    p5.stroke(255, 255, 255);
    p5.strokeWeight(7);

    forEach(points.current, (point) => {
      p5.point(point.x, point.y);
    });

    p5.strokeWeight(0.3);
    p5.stroke(190, 190, 190);
    forEach(points.current, (point) => {
      forEach(points.current, (point2) => {
        if (point === point2) {
          return;
        }

        p5.line(point.x, point.y, point2.x, point2.y);
      });
    });

    points.current = map(points.current, (point) => ({
      x: clamp(point.x + Math.random() - 0.5, 10, PAGE_CONTENT_WIDTH - 10),
      y: clamp(point.y + Math.random() - 0.5, 10, 690),
    }));
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
};
