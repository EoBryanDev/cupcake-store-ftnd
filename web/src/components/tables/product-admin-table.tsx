"use client";

import { formatWithTimeZone } from "@/src/helpers/formatWithTimeZone";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { useSearchParams } from "next/navigation";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { useEffect, useState } from "react";
import { MainContainer } from "../containers/main-container";
import { ProductGridPagination } from "../paginations/product-grid-pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useProductVariantQuery } from "@/src/hooks/queries/useProductVariants";
import { UpdateProductDialog } from "../dialogs/update-product-dialog";
import { formatDateToUserLocale } from "@/src/helpers/format-date-to-user-locate";
import { formatTimeToUserLocale } from "@/src/helpers/format-time-to-user-locate";
import { getTimeSeparator } from "@/src/helpers/get-time-separator-user-locate-based";

const PRODUCT_STATUS = [
  { value: "ACTIVE", label: "Active", variant: "default" },
  { value: "INACTIVE", label: "Inative", variant: "destructive" },
] as const;

const ProductTable = () => {
  const timeSeparator = getTimeSeparator();
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const [pagination, setPagination] =
    useState<IPaginationDefault>(paginationDefault());
  const { data: productData, isLoading: isProductLoading } =
    useProductVariantQuery(pagination);

  useEffect(() => {
    const currentPage = parseInt(page);
    const limit = pagination.limit;
    const offset = (currentPage - 1) * limit + 1;
    setPagination((prev) => ({ ...prev, currentPage, offset }));
  }, [page, pagination.limit]);

  if (isProductLoading) {
    return <MainContainer>Loading...</MainContainer>;
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Product
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Slug
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Description
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Unit
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Category
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Active
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
            {isProductLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {productData?.data?.map((item) => (
              <tr key={item.productId} className="hover:bg-muted/50">
                <td className="px-4 py-3 text-sm">{item.name}</td>
                <td className="px-4 py-3 text-sm">{item.slug}</td>
                <td className="px-4 py-3 text-sm">{item.description}</td>
                <td className="px-4 py-3 text-sm">{item.unit}</td>
                <td className="px-4 py-3 text-sm">{item.category.name}</td>

                {/* Coluna de Status com Select */}
                <td className="px-4 py-3 text-sm">
                  <Select
                    value={item.active ? "ACTIVE" : "INACTIVE"}
                    // onValueChange={
                    // (value) =>
                    // handleStatusChange(item.orderId!, value)
                    // }
                    // disabled={orderStatusMutation.isPending}
                  >
                    <SelectTrigger className="h-8 w-[140px]">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {PRODUCT_STATUS.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </td>

                <td className="px-4 py-3 text-sm">
                  {formatDateToUserLocale(item.createdAt || "")} {timeSeparator}{" "}
                  {formatTimeToUserLocale(item.createdAt || "")}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <UpdateProductDialog productId={item.productId} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="my-6">
        {productData && productData.pagination && (
          <ProductGridPagination
            totalPages={productData.pagination.totalPages}
            currentPage={pagination.currentPage}
          />
        )}
      </footer>
    </div>
  );
};

export { ProductTable };
