
import { IProductVariantBySlugResponse } from "@/src/interface/IProductVariant";
import { getProductVariantBySlug } from "@/src/services/product-variant.service";
import { useQuery } from "@tanstack/react-query";

const getProductVariantByIdQueryKey = (slug: string) => [`product-variants-${slug}`] as const;

const useProductVariantByIdQuery = (slug: string) => {
  return useQuery<IProductVariantBySlugResponse | null, Error>({
    queryKey: getProductVariantByIdQueryKey(slug),
    queryFn: async () => {

      const response: IProductVariantBySlugResponse = await getProductVariantBySlug(slug);

      if (response) {
        return response;
      }

      return null

    }
  });
};

export { getProductVariantByIdQueryKey, useProductVariantByIdQuery }