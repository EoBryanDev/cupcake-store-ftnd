import { type NextRequest, type MiddlewareConfig, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';

const TOKEN_KEY = process.env.TOKEN_KEY || 'token';
const TOKEN_KEY_ADMIN = process.env.TOKEN_ADMIN_KEY || 'token-admin';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);
const JWT_SECRET_ADMIN = new TextEncoder().encode(process.env.JWT_SECRET_ADMIN || process.env.JWT_SECRET);

const publicRoutes: { path: string | RegExp; whenAuthenticated: 'redirect' | 'next' }[] = [
  { path: '/', whenAuthenticated: 'next' },
  { path: '/login', whenAuthenticated: 'redirect' },
  { path: '/admin/login', whenAuthenticated: 'redirect' },
  // Rotas sempre públicas (autenticado ou não)
  { path: /^\/products\/[^/]+\/variants\/[^/]+$/, whenAuthenticated: 'next' },
  { path: /^\/search/, whenAuthenticated: 'next' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login';
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = '/';

const ADMIN_REDIRECT_WHEN_NOT_AUTHENTICATED = '/admin/login';
const ADMIN_REDIRECT_WHEN_AUTHENTICATED = '/admin/dashboard';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isAdminRoute = path.startsWith('/admin');

  const tokenKey = isAdminRoute ? TOKEN_KEY_ADMIN : TOKEN_KEY;
  const jwtSecret = isAdminRoute ? JWT_SECRET_ADMIN : JWT_SECRET;
  const authToken = request.cookies.get(tokenKey);

  const publicRoute = publicRoutes.find(route => {
    if (typeof route.path === 'string') {
      return route.path === path;
    } else {
      return route.path.test(path);
    }
  });

  let isValidToken = false;
  let tokenExpired = false;

  if (authToken) {
    try {
      await jwtVerify(authToken.value, jwtSecret);
      isValidToken = true;
    } catch (error: any) {
      if (error.code === 'ERR_JWT_EXPIRED' || error.message?.includes('expired')) {
        tokenExpired = true;
      }
    }
  }

  if (publicRoute) {
    if (isValidToken && publicRoute.whenAuthenticated === 'redirect') {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = isAdminRoute
        ? ADMIN_REDIRECT_WHEN_AUTHENTICATED
        : REDIRECT_WHEN_AUTHENTICATED_ROUTE;
      return NextResponse.redirect(redirectUrl);
    }

    if (tokenExpired) {
      const response = NextResponse.next();
      response.cookies.delete(tokenKey);
      return response;
    }

    // Permite acesso à rota pública
    return NextResponse.next();
  }

  if (!isValidToken || tokenExpired) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = isAdminRoute
      ? ADMIN_REDIRECT_WHEN_NOT_AUTHENTICATED
      : REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    const response = NextResponse.redirect(redirectUrl);

    if (authToken) {
      response.cookies.delete(TOKEN_KEY);
    }

    return response;
  }

  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};