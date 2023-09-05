import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import {
  Box,
  drawNestedBox,
  getNestedBox,
  getOuterBox,
  Point,
} from "@/utils/boxes";
import { forEach, range } from "lodash";
import { useCallback } from "react";
import { SketchProps } from "react-p5";

export const NestedBox = () => {
  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(300, 300).parent(canvasParentRef);

    p5.clear();
    p5.stroke(255, 255, 255);
    p5.strokeWeight(2);
    p5.noFill();

    drawNestedBox(60, 60, 180, 7, p5);
  }, []);

  return <ResponsiveSketch setup={setup} />;
};
