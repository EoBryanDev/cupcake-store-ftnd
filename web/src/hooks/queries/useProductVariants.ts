import { IProductData, IProductResponse } from "@/src/interface/IProductVariant";
import { getProductVariant } from "@/src/services/product-variant.service";
import { useQuery } from "@tanstack/react-query";

const getProductVariantQueryKey = (view: string) => [`product-variants-${view}`] as const;

const useProductVariantQuery = (view: string, p0: { initialData: IProductData | null; }) => {
  return useQuery<IProductData | null, Error>({
    queryKey: getProductVariantQueryKey(view),
    queryFn: async () => {
      const response: IProductResponse = await getProductVariant(view);

      if (response) {
        return response.data;
      }

      return null

    }
  });
};

export { getProductVariantQueryKey, useProductVariantQuery }