import { IOrder, IOrderResponse } from "../interface/IOrder";
import { IPaginationDefault } from "../interface/IPaginationDefault";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

async function createOrder(orderPayload: IOrder) {
  console.log('here');

  const response = await fetch(`${API_INTERNAL_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(orderPayload),
  });


  if (!response.ok) {
    const errorResp = await response.text();
    const { error } = JSON.parse(errorResp);

    throw new Error(error || 'Fail to register user');
  }

  return response.json();
}

async function getOrderListByUser(paginationParams: IPaginationDefault) {
  const query = new URLSearchParams();


  if (paginationParams.offset) query.set("offset", String(paginationParams.offset));
  if (paginationParams.limit) query.set("limit", String(paginationParams.limit));
  if (paginationParams.order) query.set("order", paginationParams.order);
  if (paginationParams.orderBy) query.set("orderBy", paginationParams.orderBy);
  if (paginationParams.currentPage) query.set("currentPage", String(paginationParams.currentPage));
  if (paginationParams.searchType) query.set("searchType", paginationParams.searchType);



  const response = await fetch(`${API_INTERNAL_URL}/orders-user?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error
  }

  const data: IOrderResponse = await response.json();

  if (!data || !data.data) {
    throw new Error('Invalid response format');
  }

  return data;
}


export {
  createOrder,
  getOrderListByUser
}