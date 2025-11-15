import { getAuthTokenServer } from "@/src/helpers/auth-server";
import { IAddressResponse } from "@/src/interface/IAddress";
import { NextRequest, NextResponse } from "next/server";

const API_BACKEND_URL = process.env.NEXT_ENVIROMENT === 'DEV' ?
  process.env.NEXT_PUBLIC_WS_DEV : process.env.NEXT_PUBLIC_WS_PROD;

export async function DELETE(_request: NextRequest, { params }: { params: Promise<{ address_id: string }> }) {
  try {
    const { address_id } = await params;
    const token = await getAuthTokenServer();

    if (!token) {

      return NextResponse.json(
        { message: 'Auth token was not found!' },
        { status: 401 }
      );
    }

    const url = `${API_BACKEND_URL}/addresses/${address_id}`;

    const response = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data: { data: null, error: string } = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add service to job.' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ address_id: string }> }) {
  try {
    const { address_id } = await params;
    const token = await getAuthTokenServer()


    if (!token) {

      return NextResponse.json(
        { message: 'Auth token was not found!' },
        { status: 401 }
      );
    }

    const url = `${API_BACKEND_URL}/addresses/${address_id}`;

    const groupPayload = await request.json();

    const response = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(groupPayload)
    });

    const data: IAddressResponse = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add service to job.' },
      { status: 500 }
    );
  }

}