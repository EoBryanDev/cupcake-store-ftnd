import { TSignInSchema } from "@/src/schemas/sign-in-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "../../useSession";
import { ILogin } from "@/src/interface/ILogin";
import { loginAdmin } from "@/src/services/(admin)/userAdmin.service";
import { getUseAdminOrderListQueryKey } from "../../queries/(admin)/useAdminOrderListQuery";
import { adminOrderApproval, adminOrderStatus } from "@/src/services/(admin)/orderAdmin.service";

export const adminOrderStatusKey = () => ["order-change-status"] as const;

interface IAdminOrderStatusParams {
  orderId: string;
  status: string;
}

export const useAdminOrderStatusMutation = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  return useMutation({
    mutationKey: adminOrderStatusKey(),
    mutationFn: async ({ orderId, status }: IAdminOrderStatusParams) => {
      return adminOrderStatus(orderId, status);
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: getUseAdminOrderListQueryKey(page) });
    },
    onError: (error) => {
      return `Order Status Error: ${error.message}`;
    },
  });
};