import { ICategoryResponse } from "../interface/ICategory";
import { IPaginationDefault } from "../interface/IPaginationDefault";

const API_INTERNAL_URL = process.env.NEXT_PUBLIC_API_URL;

async function getCategoryList(paginationParams: IPaginationDefault) {
  const query = new URLSearchParams();


  if (paginationParams.offset) query.set("offset", String(paginationParams.offset));
  if (paginationParams.limit) query.set("limit", String(paginationParams.limit));
  if (paginationParams.order) query.set("order", paginationParams.order);
  if (paginationParams.orderBy) query.set("orderBy", paginationParams.orderBy);
  if (paginationParams.currentPage) query.set("currentPage", String(paginationParams.currentPage));
  if (paginationParams.searchType) query.set("searchType", paginationParams.searchType);



  const response = await fetch(`${API_INTERNAL_URL}/categories?${query.toString()}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    const error = await response.json();
    return error
  }

  const data: ICategoryResponse = await response.json();

  if (!data || !data.data) {
    throw new Error('Invalid response format');
  }

  return data;
}

export { getCategoryList }