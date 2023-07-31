import { connect } from "@/dbconfig/dbconfig";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import User from "@/models/userModel";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody: { email: string; password: string } = await request.json();
    const { email, password } = reqBody;

    const existingUser = await User.findOne({ email: email });

    if (!existingUser)
      return NextResponse.json({ message: "User does not exist", status: 400 });

    const passMatch = await bcryptjs.compare(password, existingUser.password);

    if (!passMatch)
      return NextResponse.json({ message: "Invalid credentials", status: 400 });

    const token = await jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET!,
      {
        expiresIn: "1d",
      }
    );

    const response = NextResponse.json({
      message: "User logged in successfully",
      success: true,
      username: existingUser.username,
    });
    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
