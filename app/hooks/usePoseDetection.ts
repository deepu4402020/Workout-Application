'use client';

import { useEffect, useRef, useState } from 'react';
import {
  validateExerciseForm,
  type ExerciseFormId,
  type FormFeedback,
} from '@/app/utlis/formValidation';
import { ensureMediapipeLoaded } from '@/app/hooks/mediapipeLoader';
import type { NormalizedLandmark } from '@mediapipe/pose';

const CANVAS_W = 640;
const CANVAS_H = 480;

type UsePoseOptions = {
  exercise: ExerciseFormId;
  onFeedback: (feedback: FormFeedback) => void;
};

type PoseResults = {
  image: CanvasImageSource;
  poseLandmarks?: NormalizedLandmark[];
};

type PoseInstance = {
  setOptions: (options: Record<string, unknown>) => void;
  onResults: (cb: (results: PoseResults) => void) => void;
  send: (input: { image: HTMLVideoElement }) => Promise<void>;
  close: () => void;
};

type CameraInstance = {
  start: () => Promise<void>;
  stop: () => Promise<void>;
};

type MediapipeWindow = Window & {
  Pose: new (config: { locateFile: (file: string) => string }) => PoseInstance;
  Camera: new (
    video: HTMLVideoElement,
    options: {
      onFrame: () => Promise<void>;
      width: number;
      height: number;
    }
  ) => CameraInstance;
  drawConnectors: (
    ctx: CanvasRenderingContext2D,
    landmarks: NormalizedLandmark[] | undefined,
    connections: [number, number][],
    style?: { color?: string; lineWidth?: number }
  ) => void;
  drawLandmarks: (
    ctx: CanvasRenderingContext2D,
    landmarks: NormalizedLandmark[] | undefined,
    style?: { color?: string; lineWidth?: number; radius?: number }
  ) => void;
  POSE_CONNECTIONS: [number, number][];
};

export function usePoseDetection({ exercise, onFeedback }: UsePoseOptions) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const optionsRef = useRef({ exercise, onFeedback });
  optionsRef.current = { exercise, onFeedback };

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;

    let camera: CameraInstance | null = null;
    let poseInstance: PoseInstance | null = null;
    let cancelled = false;

    const run = async () => {
      try {
        await ensureMediapipeLoaded();
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : 'Could not load pose libraries'
          );
          setIsLoading(false);
        }
        return;
      }

      if (cancelled) return;

      const w = window as unknown as MediapipeWindow;

      const onResults = (results: PoseResults) => {
        if (cancelled) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        setIsLoading(false);

        ctx.save();
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(results.image, 0, 0, canvas.width, canvas.height);

        const { exercise: ex, onFeedback: notify } = optionsRef.current;

        if (results.poseLandmarks) {
          w.drawConnectors(
            ctx,
            results.poseLandmarks,
            w.POSE_CONNECTIONS,
            { color: '#a78bfa', lineWidth: 3 }
          );
          w.drawLandmarks(ctx, results.poseLandmarks, {
            color: '#7c3aed',
            lineWidth: 1,
            radius: 3,
          });
          notify(validateExerciseForm(results.poseLandmarks, ex));
        } else {
          notify({
            isCorrect: false,
            errors: ['No pose detected — stay fully in frame'],
            score: 0,
          });
        }

        ctx.restore();
      };

      poseInstance = new w.Pose({
        locateFile: (file) =>
          `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
      });

      poseInstance.setOptions({
        modelComplexity: 1,
        smoothLandmarks: true,
        enableSegmentation: false,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });

      poseInstance.onResults(onResults);

      camera = new w.Camera(video, {
        onFrame: async () => {
          if (video && poseInstance && !cancelled) {
            await poseInstance.send({ image: video });
          }
        },
        width: CANVAS_W,
        height: CANVAS_H,
      });

      try {
        await camera.start();
      } catch (e) {
        if (!cancelled) {
          setError(
            e instanceof Error ? e.message : 'Camera could not be started'
          );
          setIsLoading(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
      void camera?.stop();
      poseInstance?.close();
    };
  }, []);

  return { videoRef, canvasRef, isLoading, error };
}
