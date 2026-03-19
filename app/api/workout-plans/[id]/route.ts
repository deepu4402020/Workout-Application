import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import WorkoutPlanModel from "@/models/workoutPlans";
import { connectDB } from "@/lib/db";
import { getUserFromRequest } from "@/lib/auth";
import { validateWorkoutPlanPayload } from "@/lib/validators";

interface RouteParams {
  params: { id: string };
}

function invalidIdResponse() {
  return NextResponse.json({ message: "Invalid workout plan id" }, { status: 400 });
}

function handleAuthError(error: unknown) {
  if (error instanceof Error && error.message.includes("Authorization")) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  return NextResponse.json({ message: "Internal server error" }, { status: 500 });
}


export async function GET(request: NextRequest, context: { params: Promise<{ id: string }> }) {
  try {
    await connectDB();

    const { id } = await context.params; // Await the params

    const workoutPlan = await WorkoutPlanModel.findById(id);
    if (!workoutPlan) {
      return NextResponse.json({ message: "Workout plan not found" }, { status: 404 });
    }

    return NextResponse.json(workoutPlan);
  } catch (error) {
    console.error("Error fetching workout plan:", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: RouteParams) {
  try {
    if (!params?.id || !Types.ObjectId.isValid(params.id)) {
      return invalidIdResponse();
    }

    await connectDB();
    const authUser = getUserFromRequest(request);

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const validation = validateWorkoutPlanPayload(body, { partial: true });
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    const updatedPlan = await WorkoutPlanModel.findOneAndUpdate(
      { _id: params.id, userId: authUser.userId },
      validation.data,
      { new: true }
    ).lean();

    if (!updatedPlan) {
      return NextResponse.json({ message: "Workout plan not found" }, { status: 404 });
    }

    return NextResponse.json(updatedPlan);
  } catch (error) {
    console.error("Update workout plan error", error);
    return handleAuthError(error);
  }
}

export async function DELETE(request: NextRequest, { params }: RouteParams) {
  try {
    if (!params?.id || !Types.ObjectId.isValid(params.id)) {
      return invalidIdResponse();
    }

    await connectDB();
    const authUser = getUserFromRequest(request);

    const deletedPlan = await WorkoutPlanModel.findOneAndDelete({
      _id: params.id,
      userId: authUser.userId,
    }).lean();

    if (!deletedPlan) {
      return NextResponse.json({ message: "Workout plan not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Workout plan deleted successfully" });
  } catch (error) {
    console.error("Delete workout plan error", error);
    return handleAuthError(error);
  }
}
