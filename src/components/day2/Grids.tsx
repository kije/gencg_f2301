import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { forEach, range, map, clamp } from "lodash";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";

// const NUM_TILES_X = 10;
// const NUM_TILES_Y = 7;
// //const TILE_MARGIN = 20; -> interesting effect
// const TILE_MARGIN = 2;

interface GridProps {
  numTilesX: number;
  numTilesY: number;
  margin?: number;
  contentWidth?: number;
}

export const Grid1: FC<GridProps> = ({
  numTilesX,
  numTilesY,
  margin = 2,
  contentWidth = PAGE_CONTENT_WIDTH,
}) => {
  const tileSize = contentWidth / numTilesX - 2 * margin;
  const tileSizeWithMargin = tileSize + 2 * margin;

  const canvasWidth = tileSizeWithMargin * numTilesX;
  const canvasHeight = tileSizeWithMargin * numTilesY;

  const setup = useCallback<SketchProps["setup"]>(
    (p5, canvasParentRef) => {
      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

      p5.clear();
      p5.stroke(255, 255, 255);
      p5.strokeWeight(1);
      p5.noFill();

      forEach(range(0, numTilesX), (column) => {
        forEach(range(0, numTilesY), (row) => {
          const x0 = margin + column * tileSizeWithMargin;
          const y0 = margin + row * tileSizeWithMargin;

          p5.rect(x0, y0, tileSize, tileSize);
        });
      });
    },
    [canvasWidth, canvasHeight, numTilesX, numTilesY, margin],
  );

  return <ResponsiveSketch setup={setup} />;
};

export const Grid2: FC<GridProps> = ({
  numTilesX,
  numTilesY,
  margin = 2,
  contentWidth = PAGE_CONTENT_WIDTH,
}) => {
  const tileSize = contentWidth / numTilesX - 2 * margin;
  const tileSizeWithMargin = tileSize + 2 * margin;

  const canvasWidth = tileSizeWithMargin * numTilesX;
  const canvasHeight = tileSizeWithMargin * numTilesY;

  const setup = useCallback<SketchProps["setup"]>(
    (p5, canvasParentRef) => {
      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);

      p5.clear();
      p5.stroke(255, 255, 255);
      p5.strokeWeight(1);
      p5.noFill();

      forEach(range(0, numTilesX), (column) => {
        forEach(range(0, numTilesY), (row) => {
          p5.resetMatrix();
          const x0 = margin + column * tileSizeWithMargin;
          const y0 = margin + row * tileSizeWithMargin;

          let angle = ((column / numTilesX) * (row / numTilesY) * Math.PI) / 2;

          // reset rotation & translation
          p5.resetMatrix();
          // remember: composing transformations is done by multiplying the matrices, thus operations need to be in reverse order
          p5.translate(x0, y0);
          p5.translate(tileSizeWithMargin / 2, tileSizeWithMargin / 2);
          p5.rotate(angle);
          p5.translate(tileSizeWithMargin / -2, tileSizeWithMargin / -2);

          p5.rect(0, 0, tileSize, tileSize);
        });
      });
    },
    [canvasWidth, canvasHeight, numTilesX, numTilesY, margin],
  );

  return <ResponsiveSketch setup={setup} />;
};

export const Grid3: FC<GridProps> = ({
  numTilesX,
  numTilesY,
  margin = 2,
  contentWidth = PAGE_CONTENT_WIDTH,
}) => {
  const tileSize = contentWidth / numTilesX - 2 * margin;
  const tileSizeWithMargin = tileSize + 2 * margin;

  const canvasWidth = tileSizeWithMargin * numTilesX;
  const canvasHeight = tileSizeWithMargin * numTilesY;

  const step = useRef(0);

  const setup = useCallback<SketchProps["setup"]>(
    (p5, canvasParentRef) => {
      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    },
    [canvasWidth, canvasHeight],
  );

  const draw = useCallback<NonNullable<SketchProps["draw"]>>(
    (p5) => {
      p5.clear();
      p5.stroke(255, 255, 255);
      p5.strokeWeight(1);
      p5.noFill();

      forEach(range(0, numTilesX), (column) => {
        forEach(range(0, numTilesY), (row) => {
          const x0 = margin + column * tileSizeWithMargin;
          const y0 = margin + row * tileSizeWithMargin;

          let angle = (column / numTilesX) * (row / numTilesY) * Math.PI;
          let angle2 = p5.map(step.current % 60, 0, 60, 0, p5.TWO_PI);

          // reset rotation & translation
          p5.resetMatrix();
          // remember: composing transformations is done by multiplying the matrices, thus operations need to be in reverse order
          p5.translate(x0, y0);
          p5.translate(tileSizeWithMargin / 2, tileSizeWithMargin / 2);
          p5.rotate(angle2);
          p5.rotate(angle);
          p5.translate(tileSizeWithMargin / -2, tileSizeWithMargin / -2);

          p5.rect(0, 0, tileSize, tileSize);
        });
      });

      step.current++;
    },
    [numTilesX, numTilesY, margin],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
};

export const Grid4: FC<GridProps> = ({
  numTilesX,
  numTilesY,
  margin = 2,
  contentWidth = PAGE_CONTENT_WIDTH,
}) => {
  const tileSize = contentWidth / numTilesX - 2 * margin;
  const tileSizeWithMargin = tileSize + 2 * margin;

  const canvasWidth = tileSizeWithMargin * numTilesX;
  const canvasHeight = tileSizeWithMargin * numTilesY;

  const step = useRef(0);

  const setup = useCallback<SketchProps["setup"]>(
    (p5, canvasParentRef) => {
      p5.createCanvas(canvasWidth, canvasHeight).parent(canvasParentRef);
    },
    [canvasWidth, canvasHeight],
  );

  const draw = useCallback<NonNullable<SketchProps["draw"]>>(
    (p5) => {
      p5.clear();
      p5.stroke(255, 255, 255);
      p5.strokeWeight(1);
      p5.noFill();

      forEach(range(0, numTilesX), (column) => {
        forEach(range(0, numTilesY), (row) => {
          const x0 = margin + column * tileSizeWithMargin;
          const y0 = margin + row * tileSizeWithMargin;

          let angle = (column / numTilesX) * (row / numTilesY) * Math.PI;
          let angle2 = p5.map(
            step.current % (((column + 1) / numTilesX) * 350),
            0,
            ((column + 1) / numTilesX) * 350,
            0,
            p5.TWO_PI,
          );

          // reset rotation & translation
          p5.resetMatrix();
          // remember: composing transformations is done by multiplying the matrices, thus operations need to be in reverse order
          p5.translate(x0, y0);
          p5.translate(tileSizeWithMargin / 2, tileSizeWithMargin / 2);
          p5.rotate(angle2);
          p5.rotate(angle);
          p5.translate(tileSizeWithMargin / -2, tileSizeWithMargin / -2);

          p5.rect(0, 0, tileSize, tileSize);
        });
      });

      step.current++;
    },
    [numTilesX, numTilesY, margin],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
};
