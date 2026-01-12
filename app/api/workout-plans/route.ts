import { NextRequest, NextResponse } from "next/server";
import WorkoutPlanModel from "@/models/workoutPlans";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { validateWorkoutPlanPayload } from "@/lib/validators";

function handleAuthError(error: unknown) {
  if (error instanceof Error && error.message.includes("Authorization")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ message: "Internal server error" }, { status: 500 });
}

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    const authUser = getUserFromRequest(request);

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const validation = validateWorkoutPlanPayload(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    const plan = await WorkoutPlanModel.create({
      userId: authUser.userId,
      ...validation.data,
    });

    return NextResponse.json(plan.toObject(), { status: 201 });
  } catch (error) {
    console.error("Create workout plan error", error);
    return handleAuthError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    const authUser = getUserFromRequest(request);

    const workoutPlans = await WorkoutPlanModel.find({ userId: authUser.userId }).lean();
    return NextResponse.json(workoutPlans);
  } catch (error) {
    console.error("List workout plans error", error);
    return handleAuthError(error);
  }
}
