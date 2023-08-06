import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = NextResponse.json({
      message: "User logged out successfully",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    console.log("User logged out successfully");
    return response;
  } catch (error: any) {
    console.log("There was some error: ", error);
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
