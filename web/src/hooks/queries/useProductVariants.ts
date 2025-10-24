import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { IProductResponse } from "@/src/interface/IProductVariant";
import { getProductVariant } from "@/src/services/product-variant.service";
import { useQuery } from "@tanstack/react-query";

const getProductVariantQueryKey = (params: IPaginationDefault) => [`product-variants`, params] as const;

const useProductVariantQuery = (paginationParams: IPaginationDefault) => {
  return useQuery<IProductResponse | null, Error>({
    queryKey: getProductVariantQueryKey(paginationParams),
    queryFn: async () => {
      const response: IProductResponse = await getProductVariant(paginationParams);

      if (response) {
        return response;
      }

      return null

    },

  },);
};

export { getProductVariantQueryKey, useProductVariantQuery }