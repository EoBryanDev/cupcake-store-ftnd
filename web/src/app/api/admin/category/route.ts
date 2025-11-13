import { getAuthAdminTokenServer } from "@/src/helpers/auth-admin-server";
import { ICategoryResponse } from "@/src/interface/ICategory";

import { NextRequest, NextResponse } from "next/server";

const API_BACKEND_URL = process.env.NEXT_ENVIROMENT === 'DEV' ?
  process.env.NEXT_PUBLIC_WS_DEV : process.env.NEXT_PUBLIC_WS_PROD;

export async function POST(request: NextRequest) {
  try {
    const token = await getAuthAdminTokenServer()


    if (!token) {

      return NextResponse.json(
        { message: 'Auth token was not found!' },
        { status: 401 }
      );
    }

    const url = `${API_BACKEND_URL}/admin/categories`;

    const categoryPayload = await request.json();

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ ...categoryPayload })
    });

    const data: ICategoryResponse = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to crete category' },
      { status: 500 }
    );
  }

}