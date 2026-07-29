import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse, type NextRequest } from "next/server";

const isAdminRoute = createRouteMatcher(["/admin(.*)", "/api/admin(.*)"]);

// Treat placeholder values (like the ones in .env.example) as "not configured" too —
// not just an empty string — so this stays off until a real key is pasted in.
const rawKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY || "";
const clerkConfigured = rawKey.length > 0 && !rawKey.includes("xxxx");

export default clerkConfigured
  ? clerkMiddleware(async (auth, req) => {
      if (isAdminRoute(req)) {
        await (await auth()).protect();
      }
    })
  : (req: NextRequest) => {
      if (isAdminRoute(req)) {
        return NextResponse.redirect(new URL("/", req.url));
      }
      return NextResponse.next();
    };

export const config = {
  matcher: ["/((?!_next|.*\\..*).*)", "/(api|trpc)(.*)"],
};
