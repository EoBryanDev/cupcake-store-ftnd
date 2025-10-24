import { IProductResponse } from "@/src/interface/IProductVariant";
import { getProductVariantPreview } from "@/src/services/product-variant.service";
import { useQuery } from "@tanstack/react-query";

const getProductVariantPopularQueryKey = () => [`product-variants-popular`] as const;

const useProductVariantPopularQuery = () => {
  return useQuery<IProductResponse | null, Error>({
    queryKey: getProductVariantPopularQueryKey(),
    queryFn: async () => {
      const response: IProductResponse = await getProductVariantPreview({
        searchType: 'most-popular',
        order: 'desc',
        orderBy: 'createdAt'
      });

      if (response) {
        return response;
      }

      return null

    },

  },);
};

export { getProductVariantPopularQueryKey, useProductVariantPopularQuery }