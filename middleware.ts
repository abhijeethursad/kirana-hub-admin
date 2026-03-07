import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  
  // Define public paths (Landing Page and Login)
  const isPublicPath = path === '/login' || path === '/' ;

  // 1. Get the token from the cookie
  const token = request.cookies.get('token')?.value || '';

  // 2. Verify the Token
  const secret = new TextEncoder().encode(
    process.env.JWT_SECRET || 'default_secret_key'
  );

  let isValid = false;
  if (token) {
    try {
      // jose checks the signature and expiration time automatically
      await jwtVerify(token, secret);
      isValid = true;
    } catch (error) {
      isValid = false;
    }
  }

  // 3. Logic: Protect Private Routes
  if (!isPublicPath && !isValid) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // 4. Logic: Redirect Logged-In Users away from Login page
  if (path === '/login' && isValid) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// 5. Matcher Configuration
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ]
}