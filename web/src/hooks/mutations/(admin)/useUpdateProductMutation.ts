
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductVariantQueryKey } from "../../queries/useProductVariants";
import { useSearchParams } from "next/navigation";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { TUpdateProductSchema } from "@/src/components/dialogs/update-product-schema";
import { updateProduct } from "@/src/services/(admin)/productAdmin.service";

export const postUpdateProductMutationKey = () => ["update-product"] as const;

export const useUpdateProductMutation = () => {

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const queryClient = useQueryClient();
  const pagination = paginationDefault()

  return useMutation({
    mutationKey: postUpdateProductMutationKey(),
    mutationFn: async (productPayload: TUpdateProductSchema) => {
      return updateProduct(productPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProductVariantQueryKey({ ...pagination, currentPage: Number(page) }) });
    },
    onError: (error) => {
      return `Update Product Error: ${error.message}`
    },
  });
};