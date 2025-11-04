import { createUserAddress, login } from "@/src/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAddressSchema } from "@/src/components/adresses/schemas";
import { getUserAddressQueryKey } from "../queries/useUserAddress";

export const postCreateAddressMutationKey = () => ["create-address"] as const;

export const useCreateAddressMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationKey: postCreateAddressMutationKey(),
    mutationFn: async (addressPayload: IAddressSchema) => {
      return createUserAddress(addressPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getUserAddressQueryKey() });
    },
    onError: (error) => {
      return `Login Error: ${error.message}`
    },
  });
};