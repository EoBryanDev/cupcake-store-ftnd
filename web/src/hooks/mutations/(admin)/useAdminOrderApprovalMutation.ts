import { TSignInSchema } from "@/src/schemas/sign-in-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "../../useSession";
import { ILogin } from "@/src/interface/ILogin";
import { loginAdmin } from "@/src/services/(admin)/userAdmin.service";
import { getUseAdminOrderListQueryKey } from "../../queries/(admin)/useAdminOrderListQuery";
import { adminOrderApproval } from "@/src/services/(admin)/orderAdmin.service";

export const adminOrderApprovalKey = () => ["order-approval"] as const;

interface IAdminOrderApprovalParams {
  orderId: string;
  approval: string;
}

export const useAdminOrderApprovalMutation = () => {
  const queryClient = useQueryClient();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";

  return useMutation({
    mutationKey: adminOrderApprovalKey(),
    mutationFn: async ({ orderId, approval }: IAdminOrderApprovalParams) => {
      return adminOrderApproval(orderId, approval);
    },
    onSuccess: (_data) => {
      queryClient.invalidateQueries({ queryKey: getUseAdminOrderListQueryKey(page) });
    },
    onError: (error) => {
      return `Order Approval Error: ${error.message}`;
    },
  });
};