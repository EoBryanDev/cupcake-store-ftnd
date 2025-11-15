import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { getCategoryQueryKey } from "../../queries/(admin)/useCategoryQuery";
import { TUpdateCategorySchema } from "@/src/components/dialogs/update-category-schema";
import { updateCategory } from "@/src/services/(admin)/categoryAdmin.service";

export const postUpdateCategoryMutationKey = () => ["update-category"] as const;

export const useUpdateCategoryMutation = () => {

  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const queryClient = useQueryClient();
  const pagination = paginationDefault()

  return useMutation({
    mutationKey: postUpdateCategoryMutationKey(),
    mutationFn: async (updatePayload: TUpdateCategorySchema) => {
      return updateCategory(updatePayload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: getCategoryQueryKey({ ...pagination, currentPage: Number(page) }) });
    },
    onError: (error) => {
      return `Update Catergory Error: ${error.message}`
    },
  });
};