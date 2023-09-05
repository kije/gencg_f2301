import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { drawNestedBox } from "@/utils/boxes";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { clampBackwardsForwards } from "@/utils/helpers";
import { forEach, range, map, clamp } from "lodash";
import { FC, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";

interface GridProps {
  numTilesX: number;
  numTilesY: number;
  margin?: number;
  contentWidth?: number;
}

export const GridsWithNextedBoxes: FC<GridProps> = ({
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

          const f =
            ((column + 1) / (numTilesX + 1)) * ((row + 1) / (numTilesY + 1));

          const prog = clampBackwardsForwards(step.current, 100) / 15;

          const totalLevels =
            f * 4 * (clampBackwardsForwards(step.current, 100) / 15);

          drawNestedBox(x0, y0, tileSize, totalLevels, p5, (box, level) => {
            p5.strokeWeight((totalLevels / (level + 1)) * 0.55);
          });
        });
      });

      step.current++;
    },
    [numTilesX, numTilesY, margin, tileSize, tileSizeWithMargin],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
};

export const GridsWithNextedBoxesWithFlash: FC<GridProps> = ({
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

          const f =
            ((column + 1) / (numTilesX + 1)) * ((row + 1) / (numTilesY + 1));

          const prog = clampBackwardsForwards(step.current, 100) / 15;

          const totalLevels =
            f * 4 * (clampBackwardsForwards(step.current, 100) / 15);

          drawNestedBox(x0, y0, tileSize, totalLevels, p5, (box, level) => {
            p5.strokeWeight(level / totalLevels);
          });
        });
      });

      step.current++;
    },
    [numTilesX, numTilesY, margin, tileSize, tileSizeWithMargin],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
};

export const GridsWithNextedBoxesRotating2: FC<GridProps> = ({
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

          const f = (column / numTilesX) * (row / numTilesY);
          let angle = f * Math.PI * 1.1;
          let angle2 = p5.map(step.current % 60, 0, 60, 0, p5.TWO_PI);

          // reset rotation & translation
          p5.resetMatrix();
          // remember: composing transformations is done by multiplying the matrices, thus operations need to be in reverse order
          p5.translate(x0, y0);
          p5.translate(tileSize / 2, tileSize / 2);
          p5.rotate(angle2);
          p5.rotate(angle);
          p5.translate(tileSize / -2, tileSize / -2);

          drawNestedBox(
            0,
            0,
            tileSize * (clampBackwardsForwards(step.current, 100) / 100),
            (column / numTilesX) * (row / numTilesY) * 4,
            p5,
          );
        });
      });

      step.current++;
    },
    [numTilesX, numTilesY, margin, tileSize, tileSizeWithMargin],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
};

export const GridsWithNextedBoxesInteresting2: FC<GridProps> = ({
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

          const f = (column / numTilesX) * (row / numTilesY);
          let angle = f * Math.PI * 1.1;
          let angle2 = p5.map(step.current % 60, 0, 60, 0, p5.TWO_PI);

          // reset rotation & translation
          p5.resetMatrix();

          drawNestedBox(x0, y0, tileSize, 3, p5, (box, level) => {
            p5.rotate(
              level / 10 +
                (clampBackwardsForwards(step.current, 80 * (1 / (f + 1))) /
                  80) *
                  (1 / (f + 1)),
            );
          });
        });
      });

      step.current++;
    },
    [numTilesX, numTilesY, margin, tileSize, tileSizeWithMargin],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
};

export const GridsWithNextedBoxesInteresting: FC<GridProps> = ({
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

          const f = (column / numTilesX) * (row / numTilesY);
          let angle = f * Math.PI * 1.1;
          let angle2 = p5.map(step.current % 60, 0, 60, 0, p5.TWO_PI);

          // reset rotation & translation
          p5.resetMatrix();

          drawNestedBox(x0, x0, tileSize, 3, p5, (box, level) => {
            p5.rotate(
              level / 10 +
                (clampBackwardsForwards(step.current, 80 * (1 / (f + 1))) /
                  80) *
                  (1 / (f + 1)),
            );
          });
        });
      });

      step.current++;
    },
    [numTilesX, numTilesY, margin, tileSize, tileSizeWithMargin],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
};

export const GridsWithNextedBoxesRotating: FC<GridProps> = ({
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

          const f = (column / numTilesX) * (row / numTilesY);
          let angle = f * Math.PI * 1.1;
          let angle2 = p5.map(step.current % 60, 0, 60, 0, p5.TWO_PI);

          // reset rotation & translation
          p5.resetMatrix();
          // remember: composing transformations is done by multiplying the matrices, thus operations need to be in reverse order
          p5.translate(x0, y0);
          p5.translate(tileSizeWithMargin / 2, tileSizeWithMargin / 2);
          p5.rotate(angle2);
          p5.rotate(angle);
          p5.translate(tileSizeWithMargin / -2, tileSizeWithMargin / -2);

          drawNestedBox(0, 0, tileSize, 3, p5, (box, level) => {
            p5.rotate(
              level / 10 +
                (clampBackwardsForwards(step.current, 80 * (1 / (f + 1))) /
                  80) *
                  (1 / (f + 1)),
            );
          });
        });
      });

      step.current++;
    },
    [numTilesX, numTilesY, margin, tileSize, tileSizeWithMargin],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
};
