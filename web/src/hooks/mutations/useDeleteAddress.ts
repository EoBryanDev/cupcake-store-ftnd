import { deleteUserAddress } from "@/src/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getUserAddressQueryKey } from "../queries/useUserAddress";

export const deleteAddressMutationKey = () => ["delete-address"] as const;

export const useDeleteAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: deleteAddressMutationKey(),
    mutationFn: async (address_id: string) => {
      return deleteUserAddress(address_id);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserAddressQueryKey() });

    },
    onError: (error) => {
      queryClient.invalidateQueries({ queryKey: getUserAddressQueryKey() });

      return `Address Error: ${error.message}`
    },
  });
};