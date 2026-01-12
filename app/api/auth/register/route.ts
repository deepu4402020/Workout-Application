import { NextRequest, NextResponse } from "next/server";
import ProfileModel from "@/models/profile";
import { connectDB } from "@/lib/db";
import { hashPassword, signAuthToken } from "@/lib/auth";
import { validateRegisterPayload } from "@/lib/validators";

export async function POST(request: NextRequest) {
  try {
    await connectDB();

    const body = await request.json().catch(() => null);
    if (!body) {
      return NextResponse.json({ message: "Invalid request body" }, { status: 400 });
    }

    const validation = validateRegisterPayload(body);
    if (!validation.success) {
      return NextResponse.json(
        { message: "Validation failed", errors: validation.errors },
        { status: 400 }
      );
    }

    const { name, email, password } = validation.data;

    const existingUser = await ProfileModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: "Email already exists" }, { status: 409 });
    }

    const hashedPassword = await hashPassword(password);

    const user = await ProfileModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = signAuthToken({
      userId: user._id.toString(),
      name: user.name,
      email: user.email,
    });

    return NextResponse.json(
      {
        message: "You are signed in",
        token,
        user: {
          name: user.name,
          email: user.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Register endpoint error", error);
    return NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
