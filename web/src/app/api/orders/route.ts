import { getAuthTokenServer } from "@/src/helpers/auth-server";
import { IOrderResponse } from "@/src/interface/IOrder";
import { NextRequest, NextResponse } from "next/server";

const API_BACKEND_URL = process.env.NEXT_ENVIROMENT === 'DEV' ?
  process.env.NEXT_PUBLIC_WS_DEV : process.env.NEXT_PUBLIC_WS_PROD;

export async function POST(request: NextRequest) {
  try {
    const token = await getAuthTokenServer()

    if (!token) {

      return NextResponse.json(
        { message: 'Auth token was not found!' },
        { status: 401 }
      );
    }
    const url = `${API_BACKEND_URL}/orders`;

    const orderPayload = await request.json();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(orderPayload)
    });

    const data: IOrderResponse = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create order.' },
      { status: 500 }
    );
  }
}