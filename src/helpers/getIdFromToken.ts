import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getIdFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string;
    };
    return decodedToken.id;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
