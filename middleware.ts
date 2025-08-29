import { clerkMiddleware } from '@clerk/nextjs/server';

export default clerkMiddleware();

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search
    '/((?!_next|.*\..*).*)',
    // Always run for API routes
    '/(api|trpc)(.*)'
  ],
};
