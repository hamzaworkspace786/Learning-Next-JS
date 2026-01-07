import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const themePreference = request.cookies.get("theme");

  if(!themePreference) {
    response.cookies.set("theme", "dark");
  }
  return response;



  // return NextResponse.redirect(new URL('/', request.url));
  // if (request.nextUrl.pathname === "/profile") {
    // return NextResponse.redirect(new URL("/time", request.url));
    // return NextResponse.rewrite(new URL("/time", request.url));
  // }
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



// To understand this, we first need to clarify what headers and cookies actually are in the context of a web request.

// * **Headers:** These are invisible "notes" stuck to every request and response. They tell the server things like "I am using an iPhone" or "I accept JSON data."
// * **Cookies:** These are small text files stored in your browser that the server reads to remember you (e.g., "User is logged in").

// ### The Difference: Normal Flow vs. Middleware Flow

// #### 1. The Normal Way (Without Middleware)

// Normally, your application has to do a lot of work before it can touch headers or cookies.

// 1. **Request:** The user asks for `/dashboard`.
// 2. **Processing:** The server starts up, loads the database, runs your page logic (`page.tsx`), fetches user data, and renders the HTML.
// 3. **Result:** *Only then*, at the very end, does the server attach headers or set cookies in the response back to the user.

// * **The Problem:** If you wanted to block a user or change a header, you wasted time loading the database and rendering the page first.

// #### 2. The Middleware Way (The Interception)

// Middleware sits **between** the user and your page logic. It intercepts the request **before** it reaches your `page.tsx`.

// 1. **Request:** The user asks for `/dashboard`.
// 2. **Middleware Intercepts:** The middleware stops the request instantly at the "edge" (network border).
// 3. **Modification:** You can now read the cookies, add a custom header (like `x-user-id: 123`), or check permissions.
// 4. **Forwarding:** The modified request *then* goes to your `page.tsx`.

// ### Why is this useful? (The Advantages)

// Here are the key reasons why modifying headers/cookies *at this specific stage* is powerful:

// **1. Passing Data to the Backend (Request Headers)**
// You can decrypt a user's session token in middleware and attach their User ID as a header.

// * **Benefit:** Your actual page code doesn't need to decrypt tokens or look up sessions. It just reads the header `x-user-id`. It simplifies your backend logic significantly.

// **2. Global Security (Response Headers)**
// You can force security rules on every single page instantly.

// * **Benefit:** You can add headers like `X-Frame-Options: DENY` (which stops other sites from embedding your site) in one place. You don't have to add it to every single API route manually.

// **3. Personalization without "Flicker" (Cookies)**
// If you want to run an A/B test (showing a new design to 50% of users), you can check for a cookie in Middleware.

// * **Benefit:** If the cookie isn't there, you set it *before* the page renders. This ensures the server renders the correct version (A or B) immediately. If you did this inside the page, the user might see Version A flash for a second before it switches to Version B.

// ### Code Example: How to do it

// Here is a practical example. We will do two things:

// 1. **Request Header:** Add a custom header so our backend knows where the user is from.
// 2. **Response Cookie:** Set a "visited" cookie so we know they've been here before.

// ```typescript
// import { NextResponse } from 'next/server';
// import type { NextRequest } from 'next/server';

// export function middleware(request: NextRequest) {
  
//   // 1. Capture the existing request headers
//   const requestHeaders = new Headers(request.headers);
  
//   // 2. Modify Request Header: Add a custom tag "x-hello"
//   // The 'page.tsx' can now read this header!
//   requestHeaders.set('x-hello', 'from-middleware');

//   // 3. Prepare the response (passing the new headers forward)
//   const response = NextResponse.next({
//     request: {
//       headers: requestHeaders,
//     },
//   });

//   // 4. Modify Response Cookie: Set a cookie on the user's browser
//   response.cookies.set('visited', 'true');

//   return response;
// }

// ```
