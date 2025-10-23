// Tipo para a variante do produto
interface IProductVariant {
  productVariantId: string;
  productId: string;
  name: string;
  slug: string;
  description: string;
  color: string | null;
  weight: string | null;
  width: string | null;
  height: string | null;
  size: string | null;
  priceInCents: number;
  rawMaterial: string | null;
  imageUrl: string | null;
  active: boolean;
  createdAt: string;
  createdBy: string;
};

// Tipo para a categoria
interface ICategory {
  categoryId: string;
  name: string;
  description: string;
  slug: string;
  createdAt: string;
  createdBy: string | null;
};

// Tipo para o produto
interface IProduct {
  productId: string;
  categoryId: string;
  name: string;
  slug: string;
  description: string;
  unit: string | null;
  active: boolean;
  createdAt: string;
  createdBy: string;
  category: ICategory;
  variants: IProductVariant[];
};

// Tipo para a paginação
interface IPagination {
  offset: number;
  limit: number;
  totalItems: number;
  totalPages: number;
};

// Tipo para os dados internos (com produtos e paginação)

// Tipo para a resposta completa da API
interface IProductResponse {
  data: IProduct[];
  total: null;
  error: string;
};

interface IProductVariantBySlugResponse {
  data: IProduct;
  total: null;
  error: string;
};

interface IProductVariantBySlugCategoryResponse {
  data: IProduct[];
  total: null;
  error: string;
};

export type {
  IProductVariant,
  ICategory,
  IProduct,
  IPagination,
  IProductResponse,
  IProductVariantBySlugResponse,
  IProductVariantBySlugCategoryResponse
}