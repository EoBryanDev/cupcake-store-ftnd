import { useMutation, useQueryClient } from "@tanstack/react-query";
import { getProductVariantQueryKey } from "../../queries/useProductVariants";
import { useSearchParams } from "next/navigation";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { TNewProductSchema } from "@/src/components/dialogs/new-product-schema";
import { createProduct } from "@/src/services/(admin)/productAdmin.service";

export const postCreateProductMutationKey = () => ["create-product"] as const;

export const useCreateProductMutation = () => {

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const queryClient = useQueryClient();
  const pagination = paginationDefault()

  return useMutation({
    mutationKey: postCreateProductMutationKey(),
    mutationFn: async (productPayload: TNewProductSchema) => {
      return createProduct(productPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getProductVariantQueryKey({ ...pagination, currentPage: Number(page) }) });
    },
    onError: (error) => {
      return `Create Product Error: ${error.message}`
    },
  });
};