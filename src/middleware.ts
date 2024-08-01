import { auth } from "@/auth"
import { NextResponse } from "next/server";

export default auth((req) => {
  console.log("Middleware", req.nextUrl.pathname)
  console.log("Middleware", req.auth)
  if (!req.auth && req.nextUrl.pathname !== "/hello") {
    const newUrl = new URL("/hello", req.nextUrl.origin)
    return Response.redirect(newUrl)
  }
  return NextResponse.next()
})

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
