
import { getAuthAdminTokenServer } from "@/src/helpers/auth-admin-server";
import { ICategoryResponse } from "@/src/interface/ICategory";
import { NextRequest, NextResponse } from "next/server";

const API_BACKEND_URL = process.env.NEXT_ENVIROMENT === 'DEV' ?
  process.env.NEXT_PUBLIC_WS_DEV : process.env.NEXT_PUBLIC_WS_PROD;

export async function PUT(request: NextRequest, { params }: { params: Promise<{ category_id: string }> }) {
  try {
    const { category_id } = await params;
    const token = await getAuthAdminTokenServer()


    if (!token) {

      return NextResponse.json(
        { message: 'Auth token was not found!' },
        { status: 401 }
      );
    }

    const url = `${API_BACKEND_URL}/admin/categories/${category_id}`;

    const categoryPayload = await request.json();

    const response = await fetch(url, {
      method: 'PUT',
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
      { success: false, error: 'Failed to update category ' },
      { status: 500 }
    );
  }

}