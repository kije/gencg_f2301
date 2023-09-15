import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { drawNestedBox } from "@/utils/boxes";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { ease } from "@/utils/easings";
import { clampBackwardsForwards, Point } from "@/utils/helpers";
import { forEach, range, map, clamp } from "lodash";
import P5 from "p5";
import { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";
import { easing } from "ts-easing";

import imageAsset from "@/assets/day7/cat.jpg";

const CENTER = PAGE_CONTENT_WIDTH / 2;

const CHUNK_SIZE = 2;
const CHUNK_SIZE2 = 14;

export const Pixels1: FC = memo(() => {
  const image = useRef<P5.Image | null>(null);

  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH).parent(
      canvasParentRef,
    );
    image.current = p5.loadImage(imageAsset.src);
  }, []);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.clear();
    image.current?.loadPixels();

    forEach(range(0, image.current!.width, CHUNK_SIZE), (x) => {
      forEach(range(0, image.current!.height, CHUNK_SIZE), (y) => {
        const i = y * image.current!.width + x;

        const darkness = image.current!.pixels[i * 4] + 2;

        p5.fill(darkness, darkness, darkness);
        p5.strokeWeight(1);

        p5.circle(
          x - CHUNK_SIZE / 2,
          y - CHUNK_SIZE / 2,
          2 * ((darkness / 128) * Math.random()) + 1.75,
        );
      });
    });

    p5.noLoop();
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
});

export const Pixels2: FC = memo(() => {
  const image = useRef<P5.Image | null>(null);

  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH).parent(
      canvasParentRef,
    );
    image.current = p5.loadImage(imageAsset.src);
  }, []);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.clear();
    image.current?.loadPixels();

    forEach(range(0, image.current!.width, CHUNK_SIZE), (x) => {
      forEach(range(0, image.current!.height, CHUNK_SIZE), (y) => {
        const i = y * image.current!.width + x;

        const darkness = image.current!.pixels[i * 4] + 2;
        const darkness2 = image.current!.pixels[i * 4 + 1] + 2;
        const darkness3 = image.current!.pixels[i * 4 + 2] + 2;

        p5.fill(darkness, darkness3, darkness2);
        p5.strokeWeight(1);

        p5.circle(
          x - CHUNK_SIZE / 2,
          y - CHUNK_SIZE / 2,
          2 * ((darkness / 128) * Math.random()) + 1.75,
        );
      });
    });

    p5.noLoop();
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
});

export const Pixels3: FC = memo(() => {
  const image = useRef<P5.Image | null>(null);

  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH).parent(
      canvasParentRef,
    );
    image.current = p5.loadImage(imageAsset.src);
  }, []);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    p5.clear();
    image.current?.loadPixels();

    forEach(range(0, image.current!.width, CHUNK_SIZE2), (x) => {
      forEach(range(0, image.current!.height, CHUNK_SIZE2), (y) => {
        const i = y * image.current!.width + x;

        const darkness = image.current!.pixels[i * 4] + 4;
        const darkness2 = image.current!.pixels[i * 4 + 1] + 4;
        const darkness3 = image.current!.pixels[i * 4 + 2] + 4;

        p5.stroke(darkness, darkness2, darkness3);
        p5.noFill();
        p5.strokeWeight(0.05 + darkness / 255);

        drawNestedBox(
          x - CHUNK_SIZE2 / 2,
          y - CHUNK_SIZE2 / 2,
          CHUNK_SIZE2,
          Math.ceil((darkness / 255) * 6 + 0.5),
          p5,
        );
      });
    });

    p5.noLoop();
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
});
