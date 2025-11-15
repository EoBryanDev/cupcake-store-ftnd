import { createUserAddress, login } from "@/src/services/user.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { IAddressSchema } from "@/src/components/adresses/schemas";
import { IOrder } from "@/src/interface/IOrder";
import { createOrder } from "@/src/services/order.service";

export const postCreateOrderMutationKey = () => ["create-order"] as const;

export const useCreateOrderMutation = () => {
  // const queryClient = useQueryClient();
  return useMutation({
    mutationKey: postCreateOrderMutationKey(),
    mutationFn: async (orderPayload: IOrder) => {
      return createOrder(orderPayload);
    },
    onSuccess: (data) => {
      return data
    },
    onError: (error) => {
      return `Login Error: ${error.message}`
    },
  });
};