import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { ease } from "@/utils/easings";
import { clampBackwardsForwards, Point } from "@/utils/helpers";
import { forEach, range, map, clamp } from "lodash";
import { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";
import { easing } from "ts-easing";

const CENTER = PAGE_CONTENT_WIDTH / 2;

export const Drawing1: FC = memo(() => {
  const noiseScale = 0.018 + Math.random() * 0.018;

  const curveVertexes = useRef<Point[]>([]);

  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH).parent(
      canvasParentRef,
    );
  }, []);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.clear();
    p5.stroke(255, 255, 255);
    p5.strokeWeight(0.8);
    //p5.noFill();

    p5.noFill();

    const rawR = p5.frameCount / 10.5;
    const r = clampBackwardsForwards(rawR, PAGE_CONTENT_WIDTH / 2);

    p5.noiseDetail(
      Math.floor(clampBackwardsForwards(rawR, 40) / 2),
      0.18 + Math.random() * 0.012,
    );

    const x = CENTER - 50 + r * p5.cos((p5.frameCount % 360) / p5.TWO_PI);
    const y = CENTER - 50 + r * p5.sin((p5.frameCount % 360) / p5.TWO_PI);

    curveVertexes.current.push({
      x: x + (p5.noise(x * noiseScale, y * noiseScale) * rawR) / 2,
      y: y + (p5.noise(x * noiseScale, y * noiseScale) * rawR) / 4,
    });

    p5.beginShape();
    forEach(curveVertexes.current, (point) => {
      p5.curveVertex(point.x, point.y);
    });
    p5.endShape();

    if (rawR > r + 150) {
      p5.noLoop();
    }
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
});
