import { getAuthTokenServer } from "@/src/helpers/auth-server";
import { IOrderResponse } from "@/src/interface/IOrder";
import { NextRequest, NextResponse } from "next/server";

const API_BACKEND_URL = process.env.NEXT_ENVIROMENT === 'DEV' ?
  process.env.NEXT_PUBLIC_WS_DEV : process.env.NEXT_PUBLIC_WS_PROD;


export async function GET(request: NextRequest) {
  try {
    const token = await getAuthTokenServer()

    if (!token) {

      return NextResponse.json(
        { message: 'Auth token was not found!' },
        { status: 401 }
      );
    }
    const searchParams = request.nextUrl.searchParams;
    const searchType = searchParams.get('searchType');

    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');
    const order = searchParams.get('order');
    const orderBy = searchParams.get('orderBy');
    const currentPage = searchParams.get('currentPage');

    const query = new URLSearchParams();

    if (searchType) query.set('searchType', searchType);
    if (offset) query.set('offset', offset);
    if (limit) query.set('limit', limit);
    if (order) query.set('order', order);
    if (orderBy) query.set('orderBy', orderBy);
    if (currentPage) query.set('currentPage', currentPage);

    const url = `${API_BACKEND_URL}/orders-user?${query.toString()}`;

    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    const data: IOrderResponse = await response.json();


    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add service to job.' },
      { status: 500 }
    );
  }
}