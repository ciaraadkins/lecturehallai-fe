import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname

  // Define protected paths that require authentication
  const isProtectedPath = path.startsWith("/student") || path.startsWith("/teacher")

  // Specific redirects for index paths
  if (path === "/student") {
    return NextResponse.redirect(new URL("/student/ai-assistant", request.url))
  }
  
  if (path === "/teacher") {
    return NextResponse.redirect(new URL("/teacher/dashboard", request.url))
  }

  // Define public paths that don't require authentication
  const isPublicPath =
    path === "/" ||
    path === "/login" ||
    path.startsWith("/_next") ||
    path.startsWith("/api") ||
    path.includes("favicon") ||
    path.includes(".png") ||
    path.includes(".jpg") ||
    path.includes(".svg")

  // Only check auth for protected paths
  if (isProtectedPath) {
    const token = request.cookies.get("auth-token")?.value

    if (!token) {
      // Redirect to login if no auth token is found
      return NextResponse.redirect(new URL("/login", request.url))
    }

    // Optional: Check if token is for the correct role (student vs teacher)
    const [, role] = token.split(":")

    if (path.startsWith("/student") && role !== "student") {
      return NextResponse.redirect(new URL("/login?switch=true", request.url))
    }

    if (path.startsWith("/teacher") && role !== "teacher") {
      return NextResponse.redirect(new URL("/login?switch=true", request.url))
    }
  }

  // Allow the request to proceed
  return NextResponse.next()
}

// Configure the middleware to run only on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
