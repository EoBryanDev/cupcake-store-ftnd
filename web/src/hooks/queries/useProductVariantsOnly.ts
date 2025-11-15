import { IFilters } from "@/src/components/menus/category-nav";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { IProductResponse, IProductVariantResponse } from "@/src/interface/IProductVariant";
import { getProductVariant, getProductVariantOnly } from "@/src/services/product-variant.service";
import { useQuery } from "@tanstack/react-query";

const getProductVariantOnlyQueryKey = (params: IPaginationDefault, filters?: IFilters) => [`product-variants-only`, params, filters] as const;

const useProductVariantOnlyQuery = (paginationParams: IPaginationDefault, filters?: IFilters) => {
  return useQuery<IProductVariantResponse | null, Error>({
    queryKey: getProductVariantOnlyQueryKey(paginationParams, filters),
    queryFn: async () => {
      const response: IProductVariantResponse = await getProductVariantOnly(paginationParams, filters);

      if (response) {
        return response;
      }

      return null

    },

  },);
};

export { getProductVariantOnlyQueryKey, useProductVariantOnlyQuery }