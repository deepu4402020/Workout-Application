import { NextRequest, NextResponse } from "next/server";
import ProfileModel from "@/models/profile";
import { connectDB } from "@/lib/db";
import { comparePassword, signAuthToken } from "@/lib/auth";
import { validateLoginPayload } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const validation = validateLoginPayload(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;

    const user = await ProfileModel.findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const passwordValid = await comparePassword(password, user.password);
    if (!passwordValid) {
      return NextResponse.json({ message: "Wrong password" }, { status: 401 });
    }

    const token = signAuthToken({
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
    }, "1h");

    return NextResponse.json({
      message: "Login successful",
      token,
      user: {
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Login endpoint error", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
