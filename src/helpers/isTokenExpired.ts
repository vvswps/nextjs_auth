import jwt from "jsonwebtoken";

export default async function isTokenExpired(token: string) {
  try {
    const decodedToken: any = jwt.decode(token);
    const exp = decodedToken?.exp;
    if (exp && Date.now() > exp * 1000) {
      console.log("Token expired");
      return true;
    }
    console.log("Token not expired");
    return false;
  } catch (error) {
    console.error("Error decoding token:", error);
    return true;
  }
}
