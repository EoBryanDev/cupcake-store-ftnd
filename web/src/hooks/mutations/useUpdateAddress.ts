import { createUserAddress, login, updateUserAddress } from "@/src/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAddressSchema } from "@/src/components/adresses/schemas";
import { getUserAddressQueryKey } from "../queries/useUserAddress";

export const updateUpdateAddressMutationKey = () => ["update-address"] as const;

export const useUpdateAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: updateUpdateAddressMutationKey(),
    mutationFn: async (addressPayload: IAddressSchema) => {
      return updateUserAddress(addressPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserAddressQueryKey() });


    },
    onError: (error) => {
      return `Login Error: ${error.message}`
    },
  });
};