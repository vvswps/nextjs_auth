import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const reqBody = await req.json();
    const id = reqBody.id;

    const user = await User.findOne({ id: id });

    if (user.isVerified === false) {
      return NextResponse.json({
        message: "Email not verified",
        status: 400,
      });
    } else {
      return NextResponse.json({
        message: "Email verified",
        status: 200,
      });
    }
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
