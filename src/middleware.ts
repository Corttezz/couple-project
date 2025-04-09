import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import {
  type NextFetchEvent,
  type NextRequest,
  NextResponse,
} from 'next/server';
import createMiddleware from 'next-intl/middleware';

import { AllLocales, AppConfig } from './utils/AppConfig';

const intlMiddleware = createMiddleware({
  locales: AllLocales,
  localePrefix: AppConfig.localePrefix,
  defaultLocale: AppConfig.defaultLocale,
});

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/:locale/dashboard(.*)',
  '/onboarding(.*)',
  '/:locale/onboarding(.*)',
  '/api/users(.*)',
  '/:locale/api(.*)',
]);

export default function middleware(
  request: NextRequest,
  event: NextFetchEvent,
) {
  // Permitir acesso público à rota /api/hello
  if (request.nextUrl.pathname === '/api/hello') {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/api/page') {
    return NextResponse.next();
  }

  if (request.nextUrl.pathname === '/api/page/getPage') {
    return NextResponse.next();
  }
  // eslint-disable-next-line no-console
  console.log('request.nextUrl.pathname', request);

  if (
    request.nextUrl.pathname.includes('/sign-in')
    || request.nextUrl.pathname.includes('/sign-up')
    || isProtectedRoute(request)
  ) {
    return clerkMiddleware((auth, req) => {
      const authObj = auth();
      
      const isAuthenticated = authObj.userId !== null;

      if (isProtectedRoute(req)) {
        if (request.nextUrl.pathname === '/api/hello-auth') {
          if (!isAuthenticated) {
            return new NextResponse(
              JSON.stringify({ error: 'Não autorizado' }),
              { status: 401 }
            );
          }
          return NextResponse.next();
        }
        if (request.nextUrl.pathname.startsWith('/api/users')) {
          if (!isAuthenticated) {
            return new NextResponse(
              JSON.stringify({ error: 'Não autorizado' }),
              { status: 401 }
            );
          }
          return NextResponse.next();
        }

        if (request.nextUrl.pathname === '/api/users/sync') {
          if (!isAuthenticated) {
            return new NextResponse(
              JSON.stringify({ error: 'Não autorizado' }),
              { status: 401 }
            );
          }
          return NextResponse.next();
        }

        const locale = req.nextUrl.pathname.match(/(\/.*)\/dashboard/)?.at(1) ?? '';
        const signInUrl = new URL(`${locale}/sign-in`, req.url);

        authObj.protect({
          unauthenticatedUrl: signInUrl.toString(),
        });
      }

      if (
        authObj.userId
        && req.nextUrl.pathname.includes('/dashboard')
        && !req.nextUrl.pathname.endsWith('/organization-selection')
      ) {
        return intlMiddleware(req);
      }

      return intlMiddleware(req);
    })(request, event);
  }

  return intlMiddleware(request);
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next|monitoring).*)', '/', '/(api|trpc)(.*)'],
};
