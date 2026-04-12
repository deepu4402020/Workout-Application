import type { NormalizedLandmark } from '@mediapipe/pose';

export type ExerciseFormId = 'bench-press' | 'dumbbell-curl' | 'squat';

export interface FormFeedback {
  isCorrect: boolean;
  errors: string[];
  score: number; // 0-100
}

// Calculate angle between three points
function calculateAngle(a: NormalizedLandmark, b: NormalizedLandmark, c: NormalizedLandmark): number {
  const radians = Math.atan2(c.y - b.y, c.x - b.x) - 
                  Math.atan2(a.y - b.y, a.x - b.x);
  let angle = Math.abs(radians * 180.0 / Math.PI);
  if (angle > 180.0) angle = 360 - angle;
  return angle;
}

// Bench Press validation
function validateBenchPress(landmarks: NormalizedLandmark[]): FormFeedback {
  const errors: string[] = [];
  let score = 100;

  // Key landmarks for bench press
  const leftShoulder = landmarks[11];
  const rightShoulder = landmarks[12];
  const leftElbow = landmarks[13];
  const rightElbow = landmarks[14];
  const leftWrist = landmarks[15];
  const rightWrist = landmarks[16];

  // Check elbow angle (should be ~90° at bottom)
  const leftElbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
  const rightElbowAngle = calculateAngle(rightShoulder, rightElbow, rightWrist);

  if (leftElbowAngle < 70 || leftElbowAngle > 110) {
    errors.push('Left elbow angle incorrect');
    score -= 20;
  }

  if (rightElbowAngle < 70 || rightElbowAngle > 110) {
    errors.push('Right elbow angle incorrect');
    score -= 20;
  }

  // Check wrist alignment (should be above elbows)
  if (leftWrist.y > leftElbow.y) {
    errors.push('Left wrist too low');
    score -= 15;
  }

  if (rightWrist.y > rightElbow.y) {
    errors.push('Right wrist too low');
    score -= 15;
  }

  // Check shoulder symmetry
  const shoulderDiff = Math.abs(leftShoulder.y - rightShoulder.y);
  if (shoulderDiff > 0.05) {
    errors.push('Uneven shoulders - keep balanced');
    score -= 10;
  }

  return {
    isCorrect: errors.length === 0,
    errors,
    score: Math.max(0, score),
  };
}

// Dumbbell Curl validation
function validateDumbbellCurl(landmarks: NormalizedLandmark[]): FormFeedback {
  const errors: string[] = [];
  let score = 100;

  const leftShoulder = landmarks[11];
  const leftElbow = landmarks[13];
  const leftWrist = landmarks[15];
  const leftHip = landmarks[23];

  // Elbow should stay close to torso
  const elbowToHipDistance = Math.abs(leftElbow.x - leftHip.x);
  if (elbowToHipDistance > 0.15) {
    errors.push('Keep elbow close to body');
    score -= 25;
  }

  // Check curl angle
  const elbowAngle = calculateAngle(leftShoulder, leftElbow, leftWrist);
  
  // Full curl: ~30-50°, Starting position: ~160-180°
  if (elbowAngle < 30 || elbowAngle > 180) {
    errors.push('Maintain controlled range of motion');
    score -= 20;
  }

  // Shoulder should remain stable
  const shoulderMovement = Math.abs(leftShoulder.y - 0.3); // Assuming ~0.3 is normal
  if (shoulderMovement > 0.1) {
    errors.push('Avoid shoulder movement - isolate bicep');
    score -= 15;
  }

  return {
    isCorrect: errors.length === 0,
    errors,
    score: Math.max(0, score),
  };
}

function validateSquat(landmarks: NormalizedLandmark[]): FormFeedback {
  const errors: string[] = [];
  let score = 100;

  const leftHip = landmarks[23];
  const rightHip = landmarks[24];
  const leftKnee = landmarks[25];
  const rightKnee = landmarks[26];
  const leftAnkle = landmarks[27];
  const rightAnkle = landmarks[28];

  const leftKneeAngle = calculateAngle(leftHip, leftKnee, leftAnkle);
  const rightKneeAngle = calculateAngle(rightHip, rightKnee, rightAnkle);

  // Deep squat roughly 70–100° at knee; too shallow if > 120° when tracking “form”
  if (leftKneeAngle > 130 || leftKneeAngle < 60) {
    errors.push('Adjust left leg depth — aim for stable knee bend');
    score -= 18;
  }
  if (rightKneeAngle > 130 || rightKneeAngle < 60) {
    errors.push('Adjust right leg depth — aim for stable knee bend');
    score -= 18;
  }

  const kneeTrackL = Math.abs(leftKnee.x - leftAnkle.x);
  const kneeTrackR = Math.abs(rightKnee.x - rightAnkle.x);
  if (kneeTrackL > 0.08) {
    errors.push('Keep left knee aligned over foot');
    score -= 15;
  }
  if (kneeTrackR > 0.08) {
    errors.push('Keep right knee aligned over foot');
    score -= 15;
  }

  const hipLevel = Math.abs(leftHip.y - rightHip.y);
  if (hipLevel > 0.06) {
    errors.push('Level your hips');
    score -= 12;
  }

  return {
    isCorrect: errors.length === 0,
    errors,
    score: Math.max(0, score),
  };
}

export function validateExerciseForm(
  landmarks: NormalizedLandmark[],
  exercise: ExerciseFormId
): FormFeedback {
  switch (exercise) {
    case 'bench-press':
      return validateBenchPress(landmarks);
    case 'dumbbell-curl':
      return validateDumbbellCurl(landmarks);
    case 'squat':
      return validateSquat(landmarks);
    default:
      return { isCorrect: true, errors: [], score: 100 };
  }
}