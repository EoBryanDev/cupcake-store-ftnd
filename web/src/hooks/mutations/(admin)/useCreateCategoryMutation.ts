import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { TNewCategorySchema } from "@/src/components/dialogs/new-category-schema";
import { getCategoryQueryKey } from "../../queries/(admin)/useCategoryQuery";
import { createCategory } from "@/src/services/(admin)/categoryAdmin.service";

export const postCreateCategoryMutationKey = () => ["create-category"] as const;

export const useCreateCategoryMutation = () => {

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const queryClient = useQueryClient();
  const pagination = paginationDefault()

  return useMutation({
    mutationKey: postCreateCategoryMutationKey(),
    mutationFn: async (categoryPayload: TNewCategorySchema) => {
      return createCategory(categoryPayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCategoryQueryKey({ ...pagination, currentPage: Number(page) }) });
    },
    onError: (error) => {
      return `Create Catergory Error: ${error.message}`
    },
  });
};