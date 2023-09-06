import P5 from "p5";
import { TEasing } from "ts-easing";

export function ease(
  start: number,
  end: number,
  amount: number,
  easing: TEasing,
  p5: P5,
) {
  return p5.lerp(start, end, easing(amount));
}
