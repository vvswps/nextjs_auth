import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import sendEmail from "@/helpers/sendEmail";

connect();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    // Check if user already exists
    const user = await User.findOne({ email: email });

    if (user) {
      return NextResponse.json({ message: "User already exists", status: 400 });
    }

    // hash password
    const hashedPassword = await bcryptjs.hash(password, 10);

    // create user
    const newUser = await User.create({
      username: username,
      password: hashedPassword,
      email: email,
    });

    // send verification email
    const token = await bcryptjs.hash(newUser.username.toString(), 10);
    newUser.verifyEmailToken = token;
    newUser.verifyEmailTokenExpiry = Date.now() + 3600000;

    sendEmail(newUser.email, token, "Verify your email");

    const savedUser = await newUser.save();

    if (!savedUser) {
      return NextResponse.json({
        message: "User could not be created",
        success: false,
        status: 400,
      });
    }
    return NextResponse.json({
      message: "User created successfully",
      success: true,
      status: 201,
    });
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
