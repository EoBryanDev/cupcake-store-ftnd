import { type NextRequest, type MiddlewareConfig, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';


const TOKEN_KEY = process.env.TOKEN_KEY || 'token';
const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET);

const publicRoutes: { path: string | RegExp; whenAuthenticated: 'redirect' | 'next' }[] = [
  { path: '/', whenAuthenticated: 'next' },
  { path: '/login', whenAuthenticated: 'redirect' },
  // Rotas sempre públicas (autenticado ou não)
  { path: /^\/products\/[^/]+\/variants\/[^/]+$/, whenAuthenticated: 'next' },
  { path: /^\/search/, whenAuthenticated: 'next' },
] as const;

const REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE = '/login';
const REDIRECT_WHEN_AUTHENTICATED_ROUTE = '/';

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const authToken = request.cookies.get(TOKEN_KEY);

  // Verifica se é uma rota pública
  const publicRoute = publicRoutes.find(route => {
    if (typeof route.path === 'string') {
      return route.path === path;
    } else {
      return route.path.test(path);
    }
  });

  let isValidToken = false;
  let tokenExpired = false;

  // Valida o token se existir
  if (authToken) {
    try {

      await jwtVerify(authToken.value, JWT_SECRET);
      isValidToken = true;
    } catch (error: any) {


      if (error.code === 'ERR_JWT_EXPIRED' || error.message?.includes('expired')) {
        tokenExpired = true;

      }
    }
  }

  // Se for rota pública
  if (publicRoute) {
    // PRIMEIRO: Se estiver autenticado e a rota exigir redirect quando autenticado
    if (isValidToken && publicRoute.whenAuthenticated === 'redirect') {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = REDIRECT_WHEN_AUTHENTICATED_ROUTE;
      return NextResponse.redirect(redirectUrl);
    }

    // SEGUNDO: Remove token expirado mas permite acesso à rota pública
    // (só executa se não retornou no bloco acima)
    if (tokenExpired) {
      const response = NextResponse.next();
      response.cookies.delete(TOKEN_KEY);

      return response;
    }

    // TERCEIRO: Permite acesso à rota pública
    return NextResponse.next();
  }

  // Se não for rota pública e não estiver autenticado, redireciona
  if (!isValidToken || tokenExpired) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = REDIRECT_WHEN_NOT_AUTHENTICATED_ROUTE;

    const response = NextResponse.redirect(redirectUrl);

    if (authToken) {
      response.cookies.delete(TOKEN_KEY);

    }

    return response;
  }

  // Usuário autenticado acessando rota protegida
  return NextResponse.next();
}

export const config: MiddlewareConfig = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};