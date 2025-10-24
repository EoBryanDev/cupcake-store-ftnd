import { IProductResponse } from "@/src/interface/IProductVariant";
import { NextRequest, NextResponse } from "next/server";

const API_BACKEND_URL = process.env.NEXT_ENVIROMENT === 'DEV' ?
  process.env.NEXT_PUBLIC_WS_DEV : process.env.NEXT_PUBLIC_WS_PROD;

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const searchType = searchParams.get('searchType');

    const offset = searchParams.get('offset');
    const limit = searchParams.get('limit');
    const order = searchParams.get('order');
    const orderBy = searchParams.get('orderBy');
    const currentPage = searchParams.get('currentPage');

    const url = `${API_BACKEND_URL}/products/variants?searchType=${searchType}&offset=${offset}&limit=${limit}&order=${order}&orderBy=${orderBy}&currentPage=${currentPage}`;

    // Faz a requisição diretamente para o backend real, com o token
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data: IProductResponse = await response.json();
    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to add service to job.' },
      { status: 500 }
    );
  }
}