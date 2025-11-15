"use client";
import { formatWithTimeZone } from "@/src/helpers/formatWithTimeZone";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { useSearchParams } from "next/navigation";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { useEffect, useState } from "react";
import { MainContainer } from "../containers/main-container";
import { ProductGridPagination } from "../paginations/product-grid-pagination";
import { UpdateCategoryDialog } from "../dialogs/update-category-dialog";
import { useCategoryQuery } from "@/src/hooks/queries/(admin)/useCategoryQuery";

const CategoryTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const [pagination, setPagination] =
    useState<IPaginationDefault>(paginationDefault());
  const { data: categoryData, isLoading: isCategoryLoading } =
    useCategoryQuery(pagination);

  useEffect(() => {
    const currentPage = parseInt(page);
    const limit = pagination.limit;
    const offset = (currentPage - 1) * limit + 1;
    setPagination((prev) => ({ ...prev, currentPage, offset }));
  }, [page, pagination.limit]);

  if (isCategoryLoading) {
    return <MainContainer>Loading...</MainContainer>;
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Category
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Slug
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Description
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Created At
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {isCategoryLoading && (
              <tr>
                <td colSpan={4} className="px-4 py-3 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {categoryData?.data?.map((item) => (
              <tr key={item.categoryId} className="hover:bg-muted/50">
                <td className="px-4 py-3 text-sm">{item.name}</td>
                <td className="px-4 py-3 text-sm">{item.slug}</td>
                <td className="px-4 py-3 text-sm">{item.description}</td>

                <td className="px-4 py-3 text-sm">
                  {formatWithTimeZone(item.createdAt || "")}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <UpdateCategoryDialog categoryId={item.categoryId} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="my-6">
        {categoryData && categoryData.pagination && (
          <ProductGridPagination
            totalPages={categoryData.pagination.totalPages}
            currentPage={pagination.currentPage}
          />
        )}
      </footer>
    </div>
  );
};

export { CategoryTable };
