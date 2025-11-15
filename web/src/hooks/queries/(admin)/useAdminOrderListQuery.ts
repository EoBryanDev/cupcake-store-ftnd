import { IOrderResponse } from "@/src/interface/IOrder";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { getOrderAdminListByUser } from "@/src/services/(admin)/orderAdmin.service";
import { useQuery } from "@tanstack/react-query";

const getUseAdminOrderListQueryKey = (currentPage: string) => [`admin-orders-${currentPage}`] as const;

const useAdminOrderListQuery = (paginationParams: IPaginationDefault) => {
  return useQuery<IOrderResponse | null, Error>({
    queryKey: getUseAdminOrderListQueryKey(paginationParams.currentPage.toString()),
    queryFn: async () => {
      const response: IOrderResponse = await getOrderAdminListByUser(paginationParams);

      if (response) {
        return response;
      }

      return null

    },

  },);
};

export { getUseAdminOrderListQueryKey, useAdminOrderListQuery }