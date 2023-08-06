import { NextRequest, NextResponse } from "next/server";
import { getIdFromToken } from "./helpers/getIdFromToken";
import isTokenExpired from "./helpers/isTokenExpired";

// TODO: Make it so that user can only visit their own profile
export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";
  // verify if the token is valid or expired
  // if (await isTokenExpired(token)) {
  //   console.log("Token expired");
  //   return NextResponse.redirect(new URL("/login", request.nextUrl));
  // }
  // const userId = getIdFromToken(request);
  // console.log("userId:", userId);

  // const profilePath =
  //   request.nextUrl.pathname.match(/profile\/(.*)/)?.toString() || "";

  // console.log("profilePath:", profilePath);

  if (isPublicPath && token) {
    // don't allow logged in users to visit login/signup
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  if (!isPublicPath && !token) {
    // don't allow logged out users to visit profile
    return NextResponse.redirect(new URL("/login", request.nextUrl));
  }

  // if (!isPublicPath && userId !== profilePath) {
  //   // don't allow users to visit other profiles
  //   return new Response("You are not authorized to access this profile.", {
  //     status: 403, // Forbidden
  //   });
  // }
}
export const config = {
  matcher: ["/", "/login", "/signup", "/profile/:path*"],
};
