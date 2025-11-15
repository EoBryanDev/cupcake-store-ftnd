import { TNewProductSchema } from "@/src/components/dialogs/new-product-schema";
import { TNewProductVariantSchema } from "@/src/components/dialogs/new-product-variant-schema";
import { TUpdateProductSchema } from "@/src/components/dialogs/update-product-schema";
import { TUpdateProductVariantSchema } from "@/src/components/dialogs/update-product-variant-schema";
import { IProductResponse, IProductVariantResponse } from "@/src/interface/IProductVariant";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

async function createProductVariant(productVariantPayload: TNewProductVariantSchema): Promise<IProductVariantResponse> {

  const response = await fetch(`${API_INTERNAL_URL}/admin/products/variants`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productVariantPayload),
  });


  if (!response.ok) {
    const errorResp = await response.text();
    const { error } = JSON.parse(errorResp);

    throw new Error(error || 'Fail to register user');
  }

  return response.json();
}

async function updateProductVariant(productVariantPayload: TUpdateProductVariantSchema): Promise<IProductVariantResponse> {
  const product_variant_id = productVariantPayload.productVariantId
  const response = await fetch(`${API_INTERNAL_URL}/admin/products/variants/${product_variant_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(productVariantPayload),
  });

  if (!response.ok) {
    const errorResp = await response.text();
    const { error } = JSON.parse(errorResp);

    throw new Error(error || 'Fail to update product');
  }

  return response.json();
}

export { createProductVariant, updateProductVariant }