import { IProductResponse } from "@/src/interface/IProductVariant";
import { getProductVariantPreview } from "@/src/services/product-variant.service";
import { useQuery } from "@tanstack/react-query";

const getProductVariantNewestQueryKey = () => [`product-variants-newest`] as const;

const useProductVariantNewestQuery = () => {
  return useQuery<IProductResponse | null, Error>({
    queryKey: getProductVariantNewestQueryKey(),
    queryFn: async () => {
      const response: IProductResponse = await getProductVariantPreview({
        searchType: 'newest',
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

export { getProductVariantNewestQueryKey, useProductVariantNewestQuery }