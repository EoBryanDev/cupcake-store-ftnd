import { IPagination } from "./IProductVariant";

interface ICategory {
  categoryId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  createdBy: string | null;
};

interface ICategoryResponse {
  data: ICategory[];
  pagination: IPagination;
  error: string;
};

export type {
  ICategory,
  ICategoryResponse

}