
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { updateProductVariant } from "@/src/services/(admin)/productVariantAdmin.service";
import { TUpdateProductVariantSchema } from "@/src/components/dialogs/update-product-variant-schema";
import { getProductVariantOnlyQueryKey } from "../../queries/useProductVariantsOnly";

export const putUpdateProductVariantMutationKey = () => ["update-product-variant"] as const;

export const useUpdateProductVariantMutation = () => {

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const queryClient = useQueryClient();
  const pagination = paginationDefault()

  return useMutation({
    mutationKey: putUpdateProductVariantMutationKey(),
    mutationFn: async (productVariantPayload: TUpdateProductVariantSchema) => {

      return updateProductVariant(productVariantPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProductVariantOnlyQueryKey({ ...pagination, currentPage: Number(page) }) });
    },
    onError: (error) => {
      return `Update Product Variant Error: ${error.message}`
    },
  });
};