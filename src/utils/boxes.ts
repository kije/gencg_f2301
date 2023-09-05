import { vec2 } from "gl-matrix";
import { forEach, range } from "lodash";
import P5 from "p5";

export interface Point {
  x: number;
  y: number;
}

export type Box = [Point, Point, Point, Point];

export function getOuterBox(size: number): Box {
  return [
    { x: 0, y: 0 },
    { x: size, y: 0 },
    { x: size, y: size },
    { x: 0, y: size },
  ];
}

export function getMidPoint(p1: Point, p2: Point): Point {
  const v1 = vec2.fromValues(p1.x, p1.y);
  const v2 = vec2.fromValues(p2.x, p2.y);

  const res = vec2.create();

  vec2.subtract(res, v2, v1);
  vec2.scale(res, res, 0.5);
  vec2.add(res, res, v1);

  return { x: res[0], y: res[1] };
}

export function getNestedBox(outer: Box): Box {
  const [p1, p2, p3, p4] = outer;

  return [
    getMidPoint(p1, p2),
    getMidPoint(p2, p3),
    getMidPoint(p3, p4),
    getMidPoint(p4, p1),
  ];
}

export function getBoxesToDraw(
  x: number,
  y: number,
  size: number,
  level: number,
): Box[] {
  const box: Box = getOuterBox(size).map(
    (point): Point => ({
      x: point.x + x,
      y: point.y + y,
    }),
  ) as Box;

  return range(0, level).reduce<Box[]>(
    (acc, _) => {
      const lastBox = acc[acc.length - 1]!;
      return [...acc, getNestedBox(lastBox)];
    },
    [box],
  );
}

export function drawNestedBox(
  x: number,
  y: number,
  size: number,
  level: number,
  p5: P5,
  beforeDraw?: (box: Box, level: number) => Box | void,
  afterDraw?: (box: Box, level: number) => void,
) {
  const boxes = getBoxesToDraw(x, y, size, level);

  forEach(boxes, (box, level) => {
    box = beforeDraw?.(box, level) ?? box;

    p5.quad(
      box[0].x,
      box[0].y,
      box[1].x,
      box[1].y,
      box[2].x,
      box[2].y,
      box[3].x,
      box[3].y,
    );

    afterDraw?.(box, level);
  });
}
