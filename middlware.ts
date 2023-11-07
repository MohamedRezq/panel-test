export { default } from "next-auth/middleware";

// import type { NextRequest } from "next/server";
// export function middleware(request: NextRequest) {
//   if (request.nextUrl.pathname.startsWith("/dashboard")) {
//     // Add /dashboard specific logics
//   }
// }

export const config = {
  matcher: ["/dashboard/:path*"],
};
