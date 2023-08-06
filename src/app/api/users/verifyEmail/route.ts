import { connect } from "@/dbconfig/dbconfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const { key } = reqBody;
    const user = await User.findOne({ verifyEmailToken: key });

    console.log("User:", user);

    const token = user.verifyEmailToken;
    const expiry = user.verifyEmailTokenExpiry;

    if (Date.now() > expiry) {
      user.verifyEmailToken = undefined;
      user.verifyEmailTokenExpiry = undefined;
      await user.save();
      console.log("Token expired");
      return NextResponse.json({
        message: "Token expired. Please request a new one",
        status: 400,
      });
    }
    if (token === key) {
      user.isVerified = true;
      await user.save();
      console.log("Email verified");
      return NextResponse.json({
        status: 200,
        success: true,
        body: {
          message: "Email verified",
        },
      });
    }
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({
      message: "Something went wrong",
      status: 500,
    });
  }
}
