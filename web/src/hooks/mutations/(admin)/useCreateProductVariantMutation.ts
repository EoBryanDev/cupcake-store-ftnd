import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { createProductVariant } from "@/src/services/(admin)/productVariantAdmin.service";
import { TNewProductVariantSchema } from "@/src/components/dialogs/new-product-variant-schema";
import { getProductVariantOnlyQueryKey } from "../../queries/useProductVariantsOnly";

export const postCreateProductVariantMutationKey = () => ["create-product-variant"] as const;

export const useCreateProductVariantMutation = () => {

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const queryClient = useQueryClient();
  const pagination = paginationDefault()

  return useMutation({
    mutationKey: postCreateProductVariantMutationKey(),
    mutationFn: async (productVariantPayload: TNewProductVariantSchema) => {
      return createProductVariant(productVariantPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProductVariantOnlyQueryKey({ ...pagination, currentPage: Number(page) }) });
    },
    onError: (error) => {
      return `Create Product Variant Error: ${error.message}`
    },
  });
};