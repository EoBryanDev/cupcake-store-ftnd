import { TSignUpSchema } from '@/src/schemas/sign-up-schema';
import { NextResponse, NextRequest } from 'next/server';


const API_BACKEND_URL = process.env.NEXT_ENVIROMENT === 'DEV' ?
  process.env.NEXT_PUBLIC_WS_DEV : process.env.NEXT_PUBLIC_WS_PROD;
const TOKEN_KEY = process.env.TOKEN_KEY || 'token';

export async function POST(request: NextRequest) {
  try {
    const userData: TSignUpSchema = await request.json();


    const response = await fetch(`${API_BACKEND_URL}/users`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });


    if (!response.ok) {

      const error = await response.json();

      return NextResponse.json(
        { success: false, error: error.message || 'Falha ao criar usuário' },
        { status: response.status }
      );
    }

    const data = await response.json();

    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      legalId,
      birthDate,
      createdAt,
      token,
      expires_in,
    } = data

    const res = NextResponse.json({
      success: true, data: {
        email,
        password,
        firstName,
        lastName,
        phoneNumber,
        legalId,
        birthDate,
        createdAt,
      }
    }, { status: 201 });

    res.cookies.set(TOKEN_KEY, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: expires_in,
      path: '/',
    });
    return res
  } catch (error) {

    return NextResponse.json(
      { success: false, error: 'Falha ao criar usuário.' },
      { status: 500 }
    );
  }
}