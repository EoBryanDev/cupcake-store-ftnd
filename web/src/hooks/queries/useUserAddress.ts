import { IAddressResponse } from "@/src/interface/IAddress";
import { getUserAddress } from "@/src/services/user.service";
import { useQuery } from "@tanstack/react-query";

const getUserAddressQueryKey = () => [`user-addresses`] as const;

const useUserAddressQuery = () => {
  return useQuery<IAddressResponse | null, Error>({
    queryKey: getUserAddressQueryKey(),
    queryFn: async () => {
      const response: IAddressResponse = await getUserAddress();

      if (response) {
        return response;
      }

      return null

    },

  },);
};

export { getUserAddressQueryKey, useUserAddressQuery }