import { getIdFromToken } from "@/helpers/getIdFromToken";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const userId = await getIdFromToken(request);

    return NextResponse.json({ userId: userId, success: true, status: 200 });
  } catch (error: any) {
    return NextResponse.json({ message: error.message, status: 500 });
  }
}
