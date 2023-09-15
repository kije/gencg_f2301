/**
 * Does not support negative numbers
 * @param value
 * @param max
 */
export function clampBackwardsForwards(value: number, max: number) {
  if (value < max) {
    return value;
  }

  const newVal = value % (max * 2);

  if (newVal >= max) {
    return max - (value % max);
  }

  return value % max;
}

export interface Point {
  x: number;
  y: number;
}
