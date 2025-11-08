import { IOrder } from "../interface/IOrder";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

async function createOrder(orderPayload: IOrder) {
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


export {
  createOrder,
}