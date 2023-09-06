import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { ease } from "@/utils/easings";
import { forEach, range, map, clamp } from "lodash";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";
import { easing } from "ts-easing";

const CENTER = PAGE_CONTENT_WIDTH / 2;

const INNER_TICK_NUMBER = 10;
const INNER_TICK_SIZE = 10;
const INNER_TICK_MARGIN = 5;

export const ClockStep1: FC = () => {
  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH / 4).parent(
      canvasParentRef,
    );
  }, []);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.clear();
    p5.stroke(255, 255, 255);
    p5.strokeWeight(INNER_TICK_SIZE);
    //p5.noFill();

    const now = new Date();
    const seconds = now.getSeconds();
    const millis = now.getMilliseconds();

    const innerTicksPassed = seconds % INNER_TICK_NUMBER;

    const reset = innerTicksPassed === 0 && millis <= 400;

    forEach(range(0, INNER_TICK_NUMBER), (i) => {
      const offsetIndex = i - INNER_TICK_NUMBER / 2;
      let offset = (INNER_TICK_SIZE + INNER_TICK_MARGIN) * offsetIndex;

      if (reset) {
        offset -= ease(
          INNER_TICK_SIZE + INNER_TICK_MARGIN,
          0,
          millis / 400,
          easing.outCubic,
          p5,
        );
      } else if (innerTicksPassed >= i) {
        if (innerTicksPassed === i) {
          offset -= ease(
            0,
            INNER_TICK_SIZE + INNER_TICK_MARGIN,
            millis / 1000,
            easing.inOutQuart,
            p5,
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

export const ClockStep2Interesting: FC = () => {
  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH / 4).parent(
      canvasParentRef,
    );
  }, []);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.clear();
    p5.stroke(255, 255, 255);
    p5.strokeWeight(INNER_TICK_SIZE);
    //p5.noFill();

    const now = new Date();
    const seconds = now.getSeconds();
    const millis = now.getMilliseconds();

    const innerTicksPassed = seconds % INNER_TICK_NUMBER;

    const reset = innerTicksPassed === 0 && millis <= 400;

    forEach(range(0, INNER_TICK_NUMBER), (i) => {
      const offsetIndex = INNER_TICK_NUMBER / 2 - i;
      let offsetX = 0;
      let offsetY = (INNER_TICK_SIZE + INNER_TICK_MARGIN) * offsetIndex;

      if (reset) {
        offsetX += ease(
          INNER_TICK_SIZE + INNER_TICK_MARGIN,
          0,
          millis / 400,
          easing.outCubic,
          p5,
        );

        offsetY -= ease(
          INNER_TICK_SIZE + INNER_TICK_MARGIN,
          0,
          millis / 400,
          easing.outCubic,
          p5,
        );
      } else if (innerTicksPassed >= i) {
        if (innerTicksPassed === i) {
          offsetX += ease(
            0,
            INNER_TICK_SIZE + INNER_TICK_MARGIN,
            millis / 1000,
            easing.inOutQuart,
            p5,
          );
          offsetY -= ease(
            0,
            INNER_TICK_SIZE + INNER_TICK_MARGIN,
            millis / 1000,
            easing.inOutQuart,
            p5,
          );
        } else {
          offsetX += INNER_TICK_SIZE + INNER_TICK_MARGIN;
          offsetY -= INNER_TICK_SIZE + INNER_TICK_MARGIN;
        }
      }

      p5.point(CENTER + offsetX, CENTER / 4 + offsetY);
    });
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
};

export const ClockStep2: FC = () => {
  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH / 2).parent(
      canvasParentRef,
    );
  }, []);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.clear();
    p5.stroke(255, 255, 255);
    p5.strokeWeight(INNER_TICK_SIZE);
    //p5.noFill();

    const now = new Date();
    const seconds = now.getSeconds();
    const millis = now.getMilliseconds();

    const innerTicksPassed = seconds % INNER_TICK_NUMBER;

    const reset = innerTicksPassed === 0 && millis <= 400;

    forEach(range(0, INNER_TICK_NUMBER), (i) => {
      let offsetX = 0;
      let offsetY = 0;

      if (innerTicksPassed >= i) {
        offsetY =
          (INNER_TICK_SIZE + INNER_TICK_MARGIN) * (i - innerTicksPassed);
      } else {
        offsetX =
          (INNER_TICK_SIZE + INNER_TICK_MARGIN) * (innerTicksPassed - i);
      }

      if (innerTicksPassed >= i) {
        offsetY -= ease(
          0,
          INNER_TICK_SIZE + INNER_TICK_MARGIN,
          millis / 1000,
          easing.inOutQuart,
          p5,
        );
      } else {
        offsetX += ease(
          0,
          INNER_TICK_SIZE + INNER_TICK_MARGIN,
          millis / 1000,
          easing.inOutQuart,
          p5,
        );
      }

      p5.point(CENTER + offsetX, CENTER / 2 + offsetY);
    });
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
};
