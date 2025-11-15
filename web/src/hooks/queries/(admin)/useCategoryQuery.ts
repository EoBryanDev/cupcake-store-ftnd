import { IFilters } from "@/src/components/menus/category-nav";
import { ICategoryResponse } from "@/src/interface/ICategory";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { getCategoryList } from "@/src/services/category.service";
import { useQuery } from "@tanstack/react-query";

const getCategoryQueryKey = (params: IPaginationDefault) => [`categories`, params] as const;

const useCategoryQuery = (paginationParams: IPaginationDefault) => {
  return useQuery<ICategoryResponse | null, Error>({
    queryKey: getCategoryQueryKey(paginationParams),
    queryFn: async () => {
      const response: ICategoryResponse = await getCategoryList(paginationParams);

      if (response) {
        return response;
      }

      return null

    },

  },);
};

export { getCategoryQueryKey, useCategoryQuery }