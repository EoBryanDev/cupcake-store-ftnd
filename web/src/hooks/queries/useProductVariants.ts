import { IFilters } from "@/src/components/menus/category-nav";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { IProductResponse } from "@/src/interface/IProductVariant";
import { getProductVariant } from "@/src/services/product-variant.service";
import { useQuery } from "@tanstack/react-query";

const getProductVariantQueryKey = (params: IPaginationDefault, filters: IFilters) => [`product-variants`, params, filters] as const;

const useProductVariantQuery = (paginationParams: IPaginationDefault, filters: IFilters) => {
  return useQuery<IProductResponse | null, Error>({
    queryKey: getProductVariantQueryKey(paginationParams, filters),
    queryFn: async () => {
      const response: IProductResponse = await getProductVariant(paginationParams, filters);

      if (response) {
        return response;
      }

      return null

    },

  },);
};

export { getProductVariantQueryKey, useProductVariantQuery }