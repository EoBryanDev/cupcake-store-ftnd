import { IOrderResponse } from "@/src/interface/IOrder";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { getOrderListByUser } from "@/src/services/order.service";
import { useQuery } from "@tanstack/react-query";

const getUseOrderListQueryKey = (params: IPaginationDefault) => [`product-variants`, params] as const;

const useOrderListQuery = (paginationParams: IPaginationDefault) => {
  return useQuery<IOrderResponse | null, Error>({
    queryKey: getUseOrderListQueryKey(paginationParams),
    queryFn: async () => {
      const response: IOrderResponse = await getOrderListByUser(paginationParams);

      if (response) {
        return response;
      }

      return null

    },

  },);
};

export { getUseOrderListQueryKey, useOrderListQuery }