"use client";

import { formatCentsToBRL } from "@/src/helpers/format-cents-brlformated";
import { formatWithTimeZone } from "@/src/helpers/formatWithTimeZone";
import { CheckIcon, XIcon, ChevronsUpDown, EditIcon } from "lucide-react";
import { useAdminOrderListQuery } from "@/src/hooks/queries/(admin)/useAdminOrderListQuery";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { Badge } from "../ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { Button } from "../ui/button";
import { useSearchParams } from "next/navigation";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { useEffect, useState } from "react";
import { MainContainer } from "../containers/main-container";
import { ProductGridPagination } from "../paginations/product-grid-pagination";
import { toast } from "sonner";
import { useAdminOrderApprovalMutation } from "@/src/hooks/mutations/(admin)/useAdminOrderApprovalMutation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAdminOrderStatusMutation } from "@/src/hooks/mutations/(admin)/useAdminOrderStatusMutation";
import { useProductVariantQuery } from "@/src/hooks/queries/useProductVariants";
import { UpdateProductDialog } from "../dialogs/update-product-dialog";

const PRODUCT_STATUS = [
  { value: "ACTIVE", label: "Active", variant: "default" },
  { value: "INACTIVE", label: "Inative", variant: "destructive" },
] as const;

const ProductTable = () => {
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

  const createProductMutation = useAdminOrderApprovalMutation();
  const updateProductsMutation = useAdminOrderStatusMutation();

  const handleApprovalClick = async (orderId: string, approval: string) => {
    try {
      await createProductMutation.mutateAsync({ orderId, approval });
      toast.success(`Order ${orderId} was ${approval} successfully`);
    } catch (error) {
      toast.error(`Order ${orderId} WAS NOT ${approval} successfully`);
    }
  };

  // const handleStatusChange = async (orderId: string, newStatus: string) => {
  //   try {
  //     await orderStatusMutation.mutateAsync({ orderId, status: newStatus });
  //     toast.success(`Order status updated to ${newStatus}`);
  //   } catch (error) {
  //     toast.error(`Failed to update order status`);
  //   }
  // };

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
                  {formatWithTimeZone(item.createdAt || "")}
                </td>

                <td className="px-4 py-3">
                  <div className="flex gap-2">
                    <UpdateProductDialog productId={item.productId} />

                    {/* <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 cursor-pointer bg-transparent p-0"
                              // onClick={() =>
                              //   handleApprovalClick(item.orderId!, "REJECTED")
                              // }
                              // disabled={orderApprovalMutation.isPending}
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Reject</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider> */}
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
