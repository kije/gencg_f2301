import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { drawNestedBox } from "@/utils/boxes";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { ease } from "@/utils/easings";
import { clampBackwardsForwards, Point } from "@/utils/helpers";
import type { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { forEach, range, map, clamp, meanBy, zip, tail } from "lodash";
import dynamic from "next/dynamic";
import { Element as P5Element } from "p5";
import { FC, memo, useCallback, useMemo, useRef, useState } from "react";
import { SketchProps } from "react-p5";
import { easing } from "ts-easing";

import modelAsset from "@/assets/day6/face_landmarker.task";

const MEDIAPIPE_FACE_CONFIG = {
  maxFaces: 1,
  refineLandmarks: true,
  triangulateMesh: true,
  boundingBox: true,
};

async function createDetector() {
  if (typeof window === "undefined") {
    return null;
  }

  const mediapipe_vision = await import("@mediapipe/tasks-vision");

  let modelAssetBuffer = new Uint8Array(modelAsset.length);
  for (let i = 0; i < modelAsset.length; i++) {
    modelAssetBuffer[i] = modelAsset.charCodeAt(i);
  }

  return await mediapipe_vision.FaceLandmarker.createFromOptions(
    await mediapipe_vision.FilesetResolver.forVisionTasks("/"),
    {
      baseOptions: {
        modelAssetBuffer,
        delegate: "GPU",
      },
      runningMode: "IMAGE",
      outputFaceBlendshapes: true,
      numFaces: MEDIAPIPE_FACE_CONFIG.maxFaces,
    },
  );
}

const CENTER = PAGE_CONTENT_WIDTH / 2;

export const Faces1: FC = memo(() => {
  const cam = useRef<P5Element | null>(null);
  const detector = useRef<FaceLandmarker | null>(null);

  const setup = useCallback<SketchProps["setup"]>(
    async (p5, canvasParentRef) => {
      p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH).parent(
        canvasParentRef,
      );
      cam.current = p5.createCapture(p5.VIDEO);
      cam.current!.hide();
      console.log(cam.current);

      detector.current = await createDetector();
    },
    [],
  );

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    // p5.image(
    //   cam.current!,
    //   0,
    //   0,
    //   PAGE_CONTENT_WIDTH,
    //   (PAGE_CONTENT_WIDTH * (cam.current! as any).height) /
    //     (cam.current! as any).width,
    // );

    p5.stroke(128 + 128 * Math.random());

    if (p5.frameCount % 140 === 0) {
      p5.clear();
    }

    if (!detector.current) {
      return;
    }

    if (!cam.current?.elt) {
      return;
    }

    const video: HTMLVideoElement = cam.current.elt;

    if (video.readyState < 3) {
      return;
    }

    const faceLandmarkerResult = detector.current?.detect(video);

    const s = faceLandmarkerResult?.faceBlendshapes
      .flatMap((c) => c.categories)
      .filter((shape) => {
        return ["mouthClose", "mouthLeft", "mouthRight"].includes(
          shape.categoryName,
        );
      });

    faceLandmarkerResult?.faceLandmarks.flat().map((landmark) => {
      p5.circle(
        landmark.x * PAGE_CONTENT_WIDTH,
        landmark.y * PAGE_CONTENT_WIDTH,
        1,
      );
    });

    const mouthLow = s?.find((shape) => shape.categoryName === "mouthClose");
    const mouthLeft = s?.find((shape) => shape.categoryName === "mouthLeft");
    const mouthRight = s?.find((shape) => shape.categoryName === "mouthRight");
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
});

export const Faces2: FC = memo(() => {
  const cam = useRef<P5Element | null>(null);
  const detector = useRef<FaceLandmarker | null>(null);

  const setup = useCallback<SketchProps["setup"]>(
    async (p5, canvasParentRef) => {
      p5.createCanvas(PAGE_CONTENT_WIDTH, PAGE_CONTENT_WIDTH).parent(
        canvasParentRef,
      );
      cam.current = p5.createCapture(p5.VIDEO);
      cam.current!.hide();
      console.log(cam.current);

      detector.current = await createDetector();
    },
    [],
  );

  const draw = useCallback<NonNullable<SketchProps["draw"]>>((p5) => {
    // p5.image(
    //   cam.current!,
    //   0,
    //   0,
    //   PAGE_CONTENT_WIDTH,
    //   (PAGE_CONTENT_WIDTH * (cam.current! as any).height) /
    //     (cam.current! as any).width,
    // );

    p5.clear();
    p5.noFill();

    p5.stroke(220);
    p5.strokeWeight(0.5);

    if (!detector.current) {
      return;
    }

    if (!cam.current?.elt) {
      return;
    }

    const video: HTMLVideoElement = cam.current.elt;

    if (video.readyState < 3) {
      return;
    }

    const faceLandmarkerResult = detector.current?.detect(video);

    const s = faceLandmarkerResult?.faceBlendshapes
      .flatMap((c) => c.categories)
      .filter((shape) => {
        return ["mouthClose", "mouthLeft", "mouthRight"].includes(
          shape.categoryName,
        );
      });

    let meanDistance = meanBy(
      zip(
        faceLandmarkerResult?.faceLandmarks.flat(),
        tail(faceLandmarkerResult?.faceLandmarks.flat()),
      ),
      ([l1, l2]) => {
        if (!l1 || !l2) {
          return 0;
        }

        const distance = Math.sqrt(
          Math.pow(l1.x - l2.x, 2) + Math.pow(l1.y - l2.y, 2),
        );

        return distance;
      },
    );

    faceLandmarkerResult?.faceLandmarks.flat().map((landmark) => {
      let angle2 = p5.map(p5.frameCount % 60, 0, 60, 0, p5.TWO_PI);

      // reset rotation & translation
      p5.resetMatrix();
      // remember: composing transformations is done by multiplying the matrices, thus operations need to be in reverse order
      p5.translate(
        landmark.x * PAGE_CONTENT_WIDTH,
        landmark.y * PAGE_CONTENT_WIDTH,
      );
      p5.rotate(angle2);

      drawNestedBox(0, 0, 10 * (meanDistance * 10), 3, p5);
    });
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
});
