import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { forEach, range, map, clamp } from "lodash";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";

const CENTER = PAGE_CONTENT_WIDTH / 2;

const INNER_TICK_NUMBER = 10;
const INNER_TICK_SIZE = 10;
const INNER_TICK_MARGIN = 5;

export const ClockStep1: FC = () => {
  const previousSecond = useRef<number>(0);

  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH / 4).parent(
      canvasParentRef,
    );
    previousSecond.current = new Date().getSeconds();
  }, []);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.clear();
    p5.stroke(255, 255, 255);
    p5.strokeWeight(INNER_TICK_SIZE);
    //p5.noFill();

    const now = new Date();
    const seconds = now.getSeconds();
    const millis = now.getMilliseconds();

    const secondsJustChanged = seconds !== previousSecond.current;

    const innerTicksPassed = seconds % INNER_TICK_NUMBER;

    forEach(range(0, INNER_TICK_NUMBER), (i) => {
      //const offsetIndex = (INNER_TICK_NUMBER - innerTicksPassed) / 2 - i;
      const offsetIndex = i - INNER_TICK_NUMBER / 2;
      let offset = (INNER_TICK_SIZE + INNER_TICK_MARGIN) * offsetIndex;

      if (innerTicksPassed >= i) {
        if (innerTicksPassed === i && secondsJustChanged) {
          offset -= p5.lerp(
            0,
            INNER_TICK_SIZE + INNER_TICK_MARGIN,
            millis / 1000,
          );
        } else {
          offset -= INNER_TICK_SIZE + INNER_TICK_MARGIN;
        }
      }

      p5.point(CENTER - offset, CENTER / 4);
    });
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
};
