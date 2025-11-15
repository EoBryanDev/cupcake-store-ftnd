import { NextRequest, NextResponse } from "next/server";

const API_BACKEND_URL = process.env.NEXT_ENVIROMENT === 'DEV' ?
  process.env.NEXT_PUBLIC_WS_DEV : process.env.NEXT_PUBLIC_WS_PROD;

const TOKEN_KEY_ADMIN = process.env.TOKEN_ADMIN_KEY || 'token';


export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    const response = await fetch(`${API_BACKEND_URL}/admin/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data: {
      data: {
        access_token: string;
        expires_in: number;
        expires_at: string;
      },
      error: string
    } = await response.json();


    const { access_token, expires_in } = data.data;

    const res = NextResponse.json(data, { status: response.status });

    res.cookies.set(TOKEN_KEY_ADMIN, access_token, {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      maxAge: expires_in,
      path: '/',
    });

    return res
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Falha no login. Verifique suas credenciais.' },
      { status: 401 }
    );
  }
}