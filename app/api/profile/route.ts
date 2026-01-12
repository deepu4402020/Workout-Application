import { NextRequest, NextResponse } from "next/server";
import ProfileModel from "@/models/profile";
import { connectDB } from "@/lib/db";
import { comparePassword, getUserFromRequest, hashPassword } from "@/lib/auth";
import { validateProfileUpdatePayload } from "@/lib/validators";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();

    const authUser = getUserFromRequest(request);

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const validation = validateProfileUpdatePayload(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, currentPassword, newPassword } = validation.data;

    const user = await ProfileModel.findById(authUser.userId);
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    if (email) {
      const existingUser = await ProfileModel.findOne({ email, _id: { $ne: user._id } });
      if (existingUser) {
        return NextResponse.json({ message: "Email already exists" }, { status: 409 });
      }
      user.email = email;
    }

    if (name) {
      user.name = name;
    }

    if (currentPassword && newPassword) {
      const isPasswordValid = await comparePassword(currentPassword, user.password);
      if (!isPasswordValid) {
        return NextResponse.json({ message: "Current password is incorrect" }, { status: 401 });
      }
      user.password = await hashPassword(newPassword);
    }

    await user.save();

    return NextResponse.json({
      message: "Profile updated successfully",
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Profile update error", error);
    const status = error instanceof Error && error.message.includes("Authorization") ? 401 : 500;
    return NextResponse.json({ message: status === 401 ? "Unauthorized" : "Internal server error" }, { status });
  }
}
