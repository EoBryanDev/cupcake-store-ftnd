import { IOrderResponse } from "@/src/interface/IOrder";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

async function getOrderAdminListByUser(paginationParams: IPaginationDefault) {
  const query = new URLSearchParams();


  if (paginationParams.offset) query.set("offset", String(paginationParams.offset));
  if (paginationParams.limit) query.set("limit", String(paginationParams.limit));
  if (paginationParams.order) query.set("order", paginationParams.order);
  if (paginationParams.orderBy) query.set("orderBy", paginationParams.orderBy);
  if (paginationParams.currentPage) query.set("currentPage", String(paginationParams.currentPage));
  if (paginationParams.searchType) query.set("searchType", paginationParams.searchType);



  const response = await fetch(`${API_INTERNAL_URL}/admin/orders?${query.toString()}`, {
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

async function adminOrderApproval(orderId: string, approval: string): Promise<IOrderResponse> {
  const orders_id = orderId
  const response = await fetch(`${API_INTERNAL_URL}/admin/orders/${orders_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId, approval, status: 'PENDING' }),
  });

  if (!response.ok) {
    const errorResp = await response.text();
    const { error } = JSON.parse(errorResp);

    throw new Error(error || 'Fail to register user');
  }

  return response.json();
}
async function adminOrderStatus(orderId: string, status: string): Promise<IOrderResponse> {
  const orders_id = orderId
  const response = await fetch(`${API_INTERNAL_URL}/admin/orders/${orders_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ orderId, status }),
  });

  if (!response.ok) {
    const errorResp = await response.text();
    const { error } = JSON.parse(errorResp);

    throw new Error(error || 'Fail to register user');
  }

  return response.json();
}

export {
  adminOrderStatus,
  getOrderAdminListByUser,
  adminOrderApproval
}