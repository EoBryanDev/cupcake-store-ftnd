
import { IProductVariantBySlugCategoryResponse, IProductVariantBySlugResponse } from "@/src/interface/IProductVariant";
import { getProductVariantBySlug, getProductVariantBySlugCategory } from "@/src/services/product-variant.service";
import { useQuery } from "@tanstack/react-query";

const getProductVariantByCategoryQueryKey = (slug: string) => [`product-variants-category-${slug}`] as const;

const useProductVariantByCategoryQuery = (slug: string) => {
  return useQuery<IProductVariantBySlugCategoryResponse | null, Error>({
    queryKey: getProductVariantByCategoryQueryKey(slug),
    queryFn: async () => {

      const response: IProductVariantBySlugCategoryResponse = await getProductVariantBySlugCategory(slug);

      if (response) {
        return response;
      }

      return null

    }
  });
};

export { getProductVariantByCategoryQueryKey, useProductVariantByCategoryQuery }