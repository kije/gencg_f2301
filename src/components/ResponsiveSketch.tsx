import { FC } from "react";
import { SketchProps } from "react-p5";
import { Sketch } from "@/utils/dynamic-sketch";
import styles from "./responsive-sketch.module.css";

/**
 * Poor-mans responsive sketch wrapper. This is not "actually" responsive, but it prevents the canvas from overflowing the container on mobile etc...
 */
export const ResponsiveSketch: FC<SketchProps> = (props) => {
  return (
    <div className={styles.sketchWrapper}>
      <Sketch {...props} />
    </div>
  );
};
