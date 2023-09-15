import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { ease } from "@/utils/easings";
import { forEach, range, map, clamp } from "lodash";
import { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";
import { easing } from "ts-easing";

const CENTER = PAGE_CONTENT_WIDTH / 2;

export const ClockStep1: FC = memo(() => {
  const INNER_TICK_NUMBER = 10;
  const INNER_TICK_SIZE = 10;
  const INNER_TICK_MARGIN = 5;

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
});

export const ClockStep2Interesting: FC = memo(() => {
  const INNER_TICK_NUMBER = 10;
  const INNER_TICK_SIZE = 10;
  const INNER_TICK_MARGIN = 5;

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
});

export const ClockStep2: FC = memo(() => {
  const INNER_TICK_NUMBER = 10;
  const INNER_TICK_SIZE = 10;
  const INNER_TICK_MARGIN = 5;

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
});

export const ClockStep3: FC = memo(() => {
  const INNER_TICK_NUMBER = 25;
  const INNER_TICK_SIZE = 6;
  const INNER_TICK_MARGIN = 1;

  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH / 2).parent(
      canvasParentRef,
    );
  }, []);

  const circleRadius =
    ((INNER_TICK_NUMBER + 2) / 4) * (INNER_TICK_SIZE + INNER_TICK_MARGIN);

  const innerCircleTickAngle = (2 * Math.PI) / INNER_TICK_NUMBER;

  const draw = useCallback<NonNullable<SketchProps["draw"]>>(
    (p5) => {
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
          const angle = ease(
            innerCircleTickAngle * i,
            innerCircleTickAngle * (i + 1),
            millis / 1000,
            easing.inOutQuart,
            p5,
          );
          offsetX = p5.cos(angle) * circleRadius;
          offsetY = p5.sin(angle) * -circleRadius;
        } else {
          offsetX =
            (INNER_TICK_SIZE + INNER_TICK_MARGIN) * (innerTicksPassed - i) +
            circleRadius;

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
    },
    [circleRadius, innerCircleTickAngle],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
});

export const ClockStep4: FC = memo(() => {
  const INNER_TICK_NUMBER = 30;
  const INNER_TICK_SIZE = 6;
  const INNER_TICK_MARGIN = 1;

  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH / 2).parent(
      canvasParentRef,
    );
  }, []);

  const circleRadius =
    ((INNER_TICK_NUMBER + 2) / 4) * (INNER_TICK_SIZE + INNER_TICK_MARGIN);

  const innerCircleTickAngle = (2 * Math.PI) / (INNER_TICK_NUMBER + 1);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>(
    (p5) => {
      p5.clear();
      p5.stroke(255, 255, 255);
      p5.strokeWeight(INNER_TICK_SIZE);
      //p5.noFill();

      const now = new Date();
      const seconds = now.getSeconds();
      const millis = now.getMilliseconds();

      const innerTicksPassed = seconds % INNER_TICK_NUMBER;

      const reset = innerTicksPassed === 0 && millis <= 400;

      forEach(range(0, INNER_TICK_NUMBER * 1.5), (i) => {
        let offsetX = 0;
        let offsetY = 0;

        if (innerTicksPassed >= i) {
          const angle = ease(
            innerCircleTickAngle * i,
            innerCircleTickAngle * (i + 1),
            millis / 1000,
            easing.inOutQuart,
            p5,
          );
          offsetX = p5.cos(angle) * circleRadius;
          offsetY = p5.sin(angle) * -circleRadius;
        } else {
          if (i - innerTicksPassed >= INNER_TICK_NUMBER / 2) {
            return;
          }
          offsetX =
            (INNER_TICK_SIZE + INNER_TICK_MARGIN) * (innerTicksPassed - i) +
            circleRadius;

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
    },
    [circleRadius, innerCircleTickAngle],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
});

export const ClockAlternative: FC = memo(() => {
  // todo DRY this code up ;)

  const MINOR_SECOND_TICK_NUMBER = 6;
  const MAJOR_SECOND_TICK_NUMBER = 10;

  const MINOR_MINUTES_TICK_NUMBER = 6;
  const MAJOR_MINUTE_TICK_NUMBER = 10;

  const MINOR_HOURS_TICK_NUMBER = 6;
  const MAJOR_HOURS_TICK_NUMBER = 4;

  const INNER_TICK_SIZE = 10;
  const INNER_TICK_MARGIN = 5;

  const MINOR_SECOND_TICK_POSITION = CENTER - 0.6125 * CENTER;
  const MAJOR_SECOND_TICK_POSITION = CENTER - 0.4375 * CENTER;

  const MINOR_MINUTE_TICK_POSITION = CENTER - 0.0875 * CENTER;
  const MAJOR_MINUTE_TICK_POSITION = CENTER + 0.0875 * CENTER;

  const MINOR_HOUR_TICK_POSITION = CENTER + 0.4375 * CENTER;
  const MAJOR_HOUR_TICK_POSITION = CENTER + 0.6125 * CENTER;

  const setup = useCallback<SketchProps["setup"]>((p5, canvasParentRef) => {
    p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH / 4).parent(
      canvasParentRef,
    );
  }, []);

  const draw = useCallback<NonNullable<SketchProps["draw"]>>(
    (p5) => {
      p5.clear();
      p5.stroke(255, 255, 255);
      p5.strokeWeight(2);
      //p5.noFill();

      p5.line(
        MINOR_SECOND_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 10,
        MINOR_SECOND_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 20,
      );

      p5.line(
        MAJOR_SECOND_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 10,
        MAJOR_SECOND_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 20,
      );

      p5.line(
        MINOR_MINUTE_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 10,
        MINOR_MINUTE_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 20,
      );

      p5.line(
        MAJOR_MINUTE_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 10,
        MAJOR_MINUTE_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 20,
      );

      p5.line(
        MINOR_HOUR_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 10,
        MINOR_HOUR_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 20,
      );

      p5.line(
        MAJOR_HOUR_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 10,
        MAJOR_HOUR_TICK_POSITION,
        PAGE_CONTENT_WIDTH / 4 - 20,
      );

      p5.strokeWeight(INNER_TICK_SIZE);

      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const millis = now.getMilliseconds();

      const minorSecondsPassed = seconds % MINOR_SECOND_TICK_NUMBER;
      const majorSecondsPassed = Math.floor(seconds / MINOR_SECOND_TICK_NUMBER);

      const minorMinutesPassed = minutes % MINOR_MINUTES_TICK_NUMBER;
      const majorMinutesPassed = Math.floor(
        minutes / MINOR_MINUTES_TICK_NUMBER,
      );

      const minorHoursPassed = hours % MINOR_HOURS_TICK_NUMBER;
      const majorHoursPassed = Math.floor(hours / MINOR_HOURS_TICK_NUMBER);

      const minorSecondsReset = minorSecondsPassed === 0 && millis <= 400;
      const majorSecondsReset = majorSecondsPassed === 0 && minorSecondsReset;

      const minorMinutesReset = minorMinutesPassed === 0 && majorSecondsReset;
      const majorMinutesReset = majorMinutesPassed === 0 && minorMinutesReset;

      const minorHoursReset = minorHoursPassed === 0 && majorMinutesReset;
      const majorHoursReset = majorHoursPassed === 0 && minorHoursReset;

      // minor seconds
      forEach(range(0, MINOR_SECOND_TICK_NUMBER), (i) => {
        const offsetIndex = MINOR_SECOND_TICK_NUMBER / 2 - i;
        let offsetX = 0;
        let offsetY = (INNER_TICK_SIZE + INNER_TICK_MARGIN) * offsetIndex;

        if (minorSecondsReset) {
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
        } else if (minorSecondsPassed >= i) {
          if (minorSecondsPassed === i) {
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

        p5.point(MINOR_SECOND_TICK_POSITION + offsetX, CENTER / 4 + offsetY);
      });

      // major seconds
      forEach(range(0, MAJOR_SECOND_TICK_NUMBER), (i) => {
        const offsetIndex = MAJOR_SECOND_TICK_NUMBER / 2 - i;
        let offsetX = 0;
        let offsetY = (INNER_TICK_SIZE + INNER_TICK_MARGIN) * offsetIndex;

        if (majorSecondsReset) {
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
        } else if (majorSecondsPassed >= i) {
          if (majorSecondsPassed === i && minorSecondsPassed === 0) {
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

        p5.point(MAJOR_SECOND_TICK_POSITION + offsetX, CENTER / 4 + offsetY);
      });

      // minor minutes
      forEach(range(0, MINOR_MINUTES_TICK_NUMBER), (i) => {
        const offsetIndex = MINOR_MINUTES_TICK_NUMBER / 2 - i;
        let offsetX = 0;
        let offsetY = (INNER_TICK_SIZE + INNER_TICK_MARGIN) * offsetIndex;

        if (minorMinutesReset) {
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
        } else if (minorMinutesPassed >= i) {
          if (
            minorMinutesPassed === i &&
            majorSecondsPassed === 0 &&
            minorSecondsPassed === 0
          ) {
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

        p5.point(MINOR_MINUTE_TICK_POSITION + offsetX, CENTER / 4 + offsetY);
      });

      // major minutes
      forEach(range(0, MAJOR_MINUTE_TICK_NUMBER), (i) => {
        const offsetIndex = MAJOR_MINUTE_TICK_NUMBER / 2 - i;
        let offsetX = 0;
        let offsetY = (INNER_TICK_SIZE + INNER_TICK_MARGIN) * offsetIndex;

        if (majorMinutesReset) {
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
        } else if (majorMinutesPassed >= i) {
          if (
            majorMinutesPassed === i &&
            minorMinutesPassed === 0 &&
            majorSecondsPassed === 0 &&
            minorSecondsPassed === 0
          ) {
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

        p5.point(MAJOR_MINUTE_TICK_POSITION + offsetX, CENTER / 4 + offsetY);
      });

      // minor hours
      forEach(range(0, MINOR_HOURS_TICK_NUMBER), (i) => {
        const offsetIndex = MINOR_HOURS_TICK_NUMBER / 2 - i;
        let offsetX = 0;
        let offsetY = (INNER_TICK_SIZE + INNER_TICK_MARGIN) * offsetIndex;

        if (minorHoursReset) {
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
        } else if (minorHoursPassed >= i) {
          if (
            minorHoursPassed === i &&
            majorMinutesPassed === 0 &&
            minorMinutesPassed === 0 &&
            majorSecondsPassed === 0 &&
            minorSecondsPassed === 0
          ) {
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

        p5.point(MINOR_HOUR_TICK_POSITION + offsetX, CENTER / 4 + offsetY);
      });

      // major hours
      forEach(range(0, MAJOR_HOURS_TICK_NUMBER), (i) => {
        const offsetIndex = MAJOR_HOURS_TICK_NUMBER / 2 - i;
        let offsetX = 0;
        let offsetY = (INNER_TICK_SIZE + INNER_TICK_MARGIN) * offsetIndex;

        if (majorHoursReset) {
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
        } else if (majorHoursPassed >= i) {
          if (
            majorHoursPassed === i &&
            minorHoursPassed === 0 &&
            majorMinutesPassed === 0 &&
            minorMinutesPassed === 0 &&
            majorSecondsPassed === 0 &&
            minorSecondsPassed === 0
          ) {
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

        p5.point(MAJOR_HOUR_TICK_POSITION + offsetX, CENTER / 4 + offsetY);
      });
    },
    [
      MAJOR_HOUR_TICK_POSITION,
      MAJOR_MINUTE_TICK_POSITION,
      MAJOR_SECOND_TICK_POSITION,
      MINOR_HOUR_TICK_POSITION,
      MINOR_MINUTE_TICK_POSITION,
      MINOR_SECOND_TICK_POSITION,
    ],
  );

  return <ResponsiveSketch setup={setup} draw={draw} />;
});
