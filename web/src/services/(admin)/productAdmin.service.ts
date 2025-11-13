import { TNewProductSchema } from "@/src/components/dialogs/new-product-schema";
import { TUpdateProductSchema } from "@/src/components/dialogs/update-product-schema";
import { IProductResponse } from "@/src/interface/IProductVariant";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

async function createProduct(productPayload: TNewProductSchema): Promise<IProductResponse> {

  const response = await fetch(`${API_INTERNAL_URL}/admin/product`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productPayload),
  });


  if (!response.ok) {
    const errorResp = await response.text();
    const { error } = JSON.parse(errorResp);

    throw new Error(error || 'Fail to register user');
  }

  return response.json();
}

async function updateProduct(productPayload: TUpdateProductSchema): Promise<IProductResponse> {
  const product_id = productPayload.productId
  const response = await fetch(`${API_INTERNAL_URL}/admin/product/${product_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productPayload),
  });

  if (!response.ok) {
    const errorResp = await response.text();
    const { error } = JSON.parse(errorResp);

    throw new Error(error || 'Fail to update product');
  }

  return response.json();
}

export { createProduct, updateProduct }