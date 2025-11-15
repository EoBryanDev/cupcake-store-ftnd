import { TNewCategorySchema } from "@/src/components/dialogs/new-category-schema";
import { TUpdateCategorySchema } from "@/src/components/dialogs/update-category-schema";
import { ICategoryResponse } from "@/src/interface/ICategory";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

async function createCategory(productPayload: TNewCategorySchema): Promise<ICategoryResponse> {

  const response = await fetch(`${API_INTERNAL_URL}/admin/categories`, {
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

async function updateCategory(categoryPayload: TUpdateCategorySchema): Promise<ICategoryResponse> {
  const category_id = categoryPayload.categoryId
  const response = await fetch(`${API_INTERNAL_URL}/admin/categories/${category_id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(categoryPayload),
  });

  if (!response.ok) {
    const errorResp = await response.text();
    const { error } = JSON.parse(errorResp);

    throw new Error(error || 'Fail to update product');
  }

  return response.json();
}

export { createCategory, updateCategory }