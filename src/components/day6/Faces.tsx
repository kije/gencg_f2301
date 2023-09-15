import { ResponsiveSketch } from "@/components/ResponsiveSketch";
import { PAGE_CONTENT_WIDTH } from "@/utils/consts";
import { ease } from "@/utils/easings";
import { clampBackwardsForwards, Point } from "@/utils/helpers";
import type { FaceLandmarker, FilesetResolver } from "@mediapipe/tasks-vision";
import { forEach, range, map, clamp } from "lodash";
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

  console.log(modelAsset);

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

export const Faces: FC = memo(() => {
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
    p5.image(
      cam.current!,
      0,
      0,
      PAGE_CONTENT_WIDTH,
      (PAGE_CONTENT_WIDTH * (cam.current! as any).height) /
        (cam.current! as any).width,
    );

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

    const mouthLow = s?.find((shape) => shape.categoryName === "mouthClose");
    const mouthLeft = s?.find((shape) => shape.categoryName === "mouthLeft");
    const mouthRight = s?.find((shape) => shape.categoryName === "mouthRight");
  }, []);

  return <ResponsiveSketch setup={setup} draw={draw} />;
});
