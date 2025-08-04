import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { account } from '@/lib/appwrite/config';

// Routes that don't require authentication
const publicRoutes = [
  '/',
  '/login',
  '/register',
  '/verify',
  '/forgot-password',
  '/reset-password',
  '/help',
  '/api',
];

// Routes that require authentication
const authRoutes = [
  '/dashboard',
  '/profile',
  '/settings',
  '/messages',
  '/favorites',
  '/property',
  '/match',
  '/search',
];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the route is public
  if (publicRoutes.some(route => pathname.startsWith(route))) {
    return NextResponse.next();
  }

  // Check if the route requires authentication
  if (authRoutes.some(route => pathname.startsWith(route))) {
    try {
      // Try to get the current session
      const session = await account.get();
      
      // If we have a session, allow access
      if (session) {
        return NextResponse.next();
      }
    } catch (error) {
      // If there's no session, redirect to login
      const url = new URL('/login', request.url);
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }
  }

  // For any other routes, allow access
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|public/).*)',
  ],
}; 