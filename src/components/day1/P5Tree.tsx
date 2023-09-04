import { range } from "lodash";
import P5 from "p5";
import { FC, useCallback, useRef, useState } from "react";
import { SketchProps } from "react-p5";

import dynamic from "next/dynamic";

// Will only import `react-p5` on client-side
const Sketch = dynamic(() => import("react-p5").then((mod) => mod.default), {
  ssr: false,
});

type Steps = 0 | 1 | 2 | 3 | 4;

const setup: SketchProps["setup"] = (p5, canvasParentRef) => {
  // use parent to render the canvas in this ref
  // (without that p5 will render the canvas outside of your component)
  p5.createCanvas(400, 350).parent(canvasParentRef);
  p5.frameRate(1);
};

const drawTrees = (p5: P5, step: Steps) => {
  p5.background(255, 0);
  p5.clear();
  p5.describe("Two trees generated out of simple shapes");

  p5.stroke(255, 255, 255);
  p5.strokeWeight(4);

  // round tree
  const roundTreeCx = 100;
  const roundTreeCy = 150;

  switch (step) {
    case 4:
      range(0, 50).forEach((i) => {
        // algo by: https://stackoverflow.com/a/5529199
        let rho = Math.random();
        let phi = Math.random() * 2 * Math.PI;

        // random coordinates inside the circle
        let x = Math.sqrt(rho) * Math.cos(phi);
        let y = Math.sqrt(rho) * Math.sin(phi);

        // scale to elipse
        x = (x * (90 - 8)) / 2.0;
        y = (y * (100 - 8)) / 2.0;

        p5.strokeWeight(Math.random() * 4);

        p5.point(x + roundTreeCx, y + roundTreeCy);
      });
    case 3:
      p5.strokeWeight(4);
      p5.fill(255, 255, 255);

      p5.line(roundTreeCx - 20, roundTreeCy + 5, roundTreeCx, roundTreeCy + 35);
    case 2:
      p5.line(roundTreeCx, roundTreeCy - 15, roundTreeCx, roundTreeCy + 110);
    case 1:
      p5.noFill();

      p5.ellipse(roundTreeCx, roundTreeCy, 90, 100);
  }

  // triangle tree
  const triangleTreeCx = 300;
  const triangleTreeCy = 150;

  switch (step) {
    case 4:
    case 3:
    case 2:
      p5.fill(255, 255, 255);

      p5.line(
        triangleTreeCx,
        triangleTreeCy - 55,
        triangleTreeCx,
        triangleTreeCy + 110,
      );
    case 1:
      p5.stroke(255, 255, 255);
      p5.strokeWeight(4);
      p5.noFill();

      p5.triangle(
        triangleTreeCx,
        triangleTreeCy - 55,
        triangleTreeCx - 55,
        triangleTreeCy + 55,
        triangleTreeCx + 55,
        triangleTreeCy + 55,
      );
  }
};

export const P5Tree: FC = () => {
  const step = useRef<Steps>(0);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    drawTrees(p5, step.current);

    step.current = ((step.current + 1) % 5) as Steps;
  }, []);

  return <Sketch setup={setup} draw={draw} />;
};
