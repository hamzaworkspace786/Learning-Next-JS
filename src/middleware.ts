import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // return NextResponse.redirect(new URL('/', request.url));
  if (request.nextUrl.pathname === "/profile") {
    // return NextResponse.redirect(new URL("/time", request.url));
    return NextResponse.rewrite(new URL("/time", request.url));
  }
};

// export const config = {
//   matcher: '/profile',
// };


// Middleware is code that runs **before** a request is completed.

// Think of it like a **Security Guard** standing at the entrance of a building.

// * **Without Middleware:** Anyone walks straight into the CEO's office (the server/page).
// * **With Middleware:** The guard stops everyone at the door. He checks their ID badge. If they have one, they pass. If not, he sends them to the lobby (redirects them).

// In Next.js, middleware allows you to run code *before* a request is processed by your page or API route. Based on the incoming request, you can modify the response by rewriting, redirecting, modifying the request or response headers, or responding directly.

// ### Top 6 Benefits of Using Middleware

// #### 1. Authentication & Route Protection (Most Common)

// Instead of checking if a user is logged in on *every single page*, you check it once in the middleware. If they aren't logged in, you stop them at the door and redirect them to the login page.

// * *Benefit:* Centralized security. You can't "forget" to protect a page.

// #### 2. Redirection based on Conditions

// You can redirect users based on specific logic that isn't just a static path.

// * **Geolocation:** If a user visits from France, redirect them to `/fr/home`.
// * **Device:** If a user is on a phone, redirect to a mobile-specific view.
// * **Maintenance:** If your database is down, redirect all traffic to a "Under Maintenance" page instantly.

// #### 3. A/B Testing

// You can show different versions of your site to different users to see which one performs better.

// * *Benefit:* The middleware assigns the user to "Group A" or "Group B" silently in the background using cookies, without the URL changing or the page flickering.

// #### 4. modifying Headers & Cookies

// You can read or set cookies and headers before the page even loads.

// * *Example:* Adding a custom header like `x-version: 1.0` to every response for debugging, or managing strict security headers (CORS) globally.

// #### 5. Logging and Analytics

// You can capture data about every request that hits your server.

// * *Benefit:* You can track page views, API usage, or detect bot attacks before they actually stress your database.

// #### 6. Performance (Edge Runtime)

// In Next.js, Middleware runs on the **Edge Runtime**. This means it doesn't run on a slow, central server. It runs on distributed servers all over the world, very close to the user.

// * *Benefit:* It is incredibly fast. The check happens in milliseconds, so the user doesn't feel a delay.

// ### Practical Code Example: Protecting a Dashboard

// Here is the most classic use case: Keeping people out of the `/dashboard` if they don't have a cookie.

// ```typescript
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'
 
// export function middleware(request: NextRequest) {
//   // 1. Check for a session cookie
//   const token = request.cookies.get('auth-token')
 
//   // 2. If no token exists, kick them to login
//   if (!token) {
//     return NextResponse.redirect(new URL('/login', request.url))
//   }
 
//   // 3. If token exists, let them pass!
//   return NextResponse.next()
// }
 
// // Only run this check on dashboard pages
// export const config = {
//   matcher: '/dashboard/:path*',
// }

// ```
