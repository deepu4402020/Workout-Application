export type ValidationResult<T> =
  | { success: true; data: T }
  | { success: false; errors: string[] };

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isNonEmptyString(value: unknown) {
  return typeof value === "string" && value.trim().length > 0;
}

export interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export function validateRegisterPayload(body: any): ValidationResult<RegisterPayload> {
  const errors: string[] = [];
  const name = typeof body?.name === "string" ? body.name.trim() : "";
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (name.length < 2) errors.push("Name must be at least 2 characters long");
  if (!emailRegex.test(email)) errors.push("A valid email address is required");
  if (password.length < 6) errors.push("Password must be at least 6 characters long");

  if (errors.length) return { success: false, errors };
  return { success: true, data: { name, email, password } };
}

export interface LoginPayload {
  email: string;
  password: string;
}

export function validateLoginPayload(body: any): ValidationResult<LoginPayload> {
  const errors: string[] = [];
  const email = typeof body?.email === "string" ? body.email.trim().toLowerCase() : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!emailRegex.test(email)) errors.push("A valid email address is required");
  if (!password) errors.push("Password is required");

  if (errors.length) return { success: false, errors };
  return { success: true, data: { email, password } };
}

export interface ProfileUpdatePayload {
  name?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
}

export function validateProfileUpdatePayload(body: any): ValidationResult<ProfileUpdatePayload> {
  const errors: string[] = [];
  const payload: ProfileUpdatePayload = {};

  if (isNonEmptyString(body?.name)) payload.name = body.name.trim();
  if (isNonEmptyString(body?.email)) {
    const email = body.email.trim().toLowerCase();
    if (!emailRegex.test(email)) {
      errors.push("Email is invalid");
    } else {
      payload.email = email;
    }
  }

  if (isNonEmptyString(body?.currentPassword)) payload.currentPassword = body.currentPassword;
  if (isNonEmptyString(body?.newPassword)) {
    if (body.newPassword.length < 6) {
      errors.push("New password must be at least 6 characters");
    } else {
      payload.newPassword = body.newPassword;
    }
  }

  if ((payload.currentPassword && !payload.newPassword) || (!payload.currentPassword && payload.newPassword)) {
    errors.push("Current and new password must both be provided to change the password");
  }

  if (!Object.keys(payload).length) {
    errors.push("At least one field must be provided");
  }

  if (errors.length) return { success: false, errors };
  return { success: true, data: payload };
}

const difficulties = new Set(["beginner", "intermediate", "advanced"]);

export interface WorkoutPlanExerciseInput {
  name: string;
  muscleGroup?: string;
  sets?: number;
  reps?: number;
  weight?: number;
  duration?: number;
  restTime?: number;
  notes?: string;
}

export interface WorkoutPlanDayInput {
  day: number;
  exercises: WorkoutPlanExerciseInput[];
  restDay?: boolean;
}

export interface WorkoutPlanPayload {
  name?: string;
  description?: string;
  duration?: number;
  difficulty?: "beginner" | "intermediate" | "advanced";
  muscleGroups?: string[];
  workoutDays?: WorkoutPlanDayInput[];
  isActive?: boolean;
}

export function validateWorkoutPlanPayload(
  body: any,
  options: { partial?: boolean } = {}
): ValidationResult<WorkoutPlanPayload> {
  const errors: string[] = [];
  const payload: WorkoutPlanPayload = {};
  let hasAtLeastOneField = false;

  const name = typeof body?.name === "string" ? body.name.trim() : "";
  if (name) {
    if (name.length < 3) {
      errors.push("Workout name must be at least 3 characters");
    } else {
      payload.name = name;
      hasAtLeastOneField = true;
    }
  } else if (!options.partial) {
    errors.push("Workout name is required");
  }

  if (isNonEmptyString(body?.description)) {
    payload.description = body.description.trim();
    hasAtLeastOneField = true;
  }

  if (typeof body?.duration === "number" && body.duration > 0) {
    payload.duration = body.duration;
    hasAtLeastOneField = true;
  }

  const difficulty = typeof body?.difficulty === "string" ? body.difficulty.toLowerCase() : undefined;
  if (difficulty) {
    if (!difficulties.has(difficulty)) {
      errors.push("Difficulty must be beginner, intermediate, or advanced");
    } else {
      payload.difficulty = difficulty as WorkoutPlanPayload["difficulty"];
      hasAtLeastOneField = true;
    }
  }

  if (Array.isArray(body?.muscleGroups)) {
    payload.muscleGroups = body.muscleGroups.filter((group: unknown) => typeof group === "string" && group.trim()).map((group: string) => group.trim());
    hasAtLeastOneField = true;
  }

  if (Array.isArray(body?.workoutDays)) {
    const days: WorkoutPlanDayInput[] = [];
    for (const day of body.workoutDays) {
      if (typeof day?.day !== "number") {
        errors.push("Each workout day must include a numeric day value");
        break;
      }
      const exercises: WorkoutPlanExerciseInput[] = Array.isArray(day.exercises)
        ? day.exercises
            .filter((exercise: any) => isNonEmptyString(exercise?.name))
            .map((exercise: WorkoutPlanExerciseInput) => ({
              name: exercise.name.trim(),
              muscleGroup: exercise.muscleGroup,
              sets: exercise.sets,
              reps: exercise.reps,
              weight: exercise.weight,
              duration: exercise.duration,
              restTime: exercise.restTime,
              notes: exercise.notes,
            }))
        : [];

      days.push({
        day: day.day,
        exercises,
        restDay: Boolean(day?.restDay),
      });
    }
    payload.workoutDays = days;
    hasAtLeastOneField = true;
  }

  if (typeof body?.isActive === "boolean") {
    payload.isActive = body.isActive;
    hasAtLeastOneField = true;
  }

  if (options.partial && !hasAtLeastOneField) {
    errors.push("At least one field must be provided");
  }

  if (errors.length) return { success: false, errors };
  return { success: true, data: payload };
}
