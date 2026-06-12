import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { pathname } = req.nextUrl;
  const isCrmRoute = pathname.startsWith("/crm");
  const isLoginPage = pathname === "/crm/login";
  const isApiRoute = pathname.startsWith("/crm/api");

  if (!isCrmRoute || isApiRoute) return NextResponse.next();

  const isLoggedIn = !!req.auth;

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL("/crm/login", req.url));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL("/crm/dashboard", req.url));
  }
});

export const config = {
  matcher: ["/crm/:path*"],
};
