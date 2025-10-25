import { IFilters } from "@/src/components/menus/category-nav";
import { IProductFiltersCategory } from "@/src/interface/IProductFilters";
import { getProductFilters } from "@/src/services/product-variant.service";
import { useQuery } from "@tanstack/react-query";

const getProductFiltersQueryKey = () => [`product-filters`] as const;

const useProductFiltersQuery = () => {
  return useQuery<IProductFiltersCategory | null, Error>({
    queryKey: getProductFiltersQueryKey(),
    queryFn: async () => {
      const response: IProductFiltersCategory = await getProductFilters();

      if (response) {
        return response;
      }

      return null

    },

  },);
};

export { getProductFiltersQueryKey, useProductFiltersQuery }