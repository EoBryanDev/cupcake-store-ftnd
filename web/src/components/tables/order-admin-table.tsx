"use client";

import { formatCentsToBRL } from "@/src/helpers/format-cents-brlformated";
import { formatWithTimeZone } from "@/src/helpers/formatWithTimeZone";
import { CheckIcon, XIcon, ChevronsUpDown } from "lucide-react";
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

const ORDER_STATUSES = [
  { value: "PENDING", label: "Pending", variant: "secondary" },
  { value: "PAID", label: "Paid", variant: "default" },
  { value: "SHIPPED", label: "Shipped", variant: "default" },
  { value: "DELIVERED", label: "Delivered", variant: "default" },
  { value: "CANCELLED", label: "Cancelled", variant: "destructive" },
  { value: "FAILED", label: "Failed", variant: "destructive" },
] as const;

const OrderTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const [pagination, setPagination] =
    useState<IPaginationDefault>(paginationDefault());
  const { data: orderData, isLoading: isOrderLoading } =
    useAdminOrderListQuery(pagination);

  useEffect(() => {
    const currentPage = parseInt(page);
    const limit = pagination.limit;
    const offset = (currentPage - 1) * limit + 1;
    setPagination((prev) => ({ ...prev, currentPage, offset }));
  }, [page, pagination.limit]);

  const orderApprovalMutation = useAdminOrderApprovalMutation();
  const orderStatusMutation = useAdminOrderStatusMutation();

  const handleApprovalClick = async (orderId: string, approval: string) => {
    try {
      await orderApprovalMutation.mutateAsync({ orderId, approval });
      toast.success(`Order ${orderId} was ${approval} successfully`);
    } catch (error) {
      toast.error(`Order ${orderId} WAS NOT ${approval} successfully`);
    }
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await orderStatusMutation.mutateAsync({ orderId, status: newStatus });
      toast.success(`Order status updated to ${newStatus}`);
    } catch (error) {
      toast.error(`Failed to update order status`);
    }
  };

  if (isOrderLoading) {
    return <MainContainer>Loading...</MainContainer>;
  }

  return (
    <div className="overflow-hidden rounded-lg border">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted">
            <tr>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Address
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Total
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Payment Type
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Approval
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Status
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
            {isOrderLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {orderData?.data?.map((item) => (
              <tr key={item.orderId} className="hover:bg-muted/50">
                <td className="px-4 py-3 text-sm">{`${item.street} - ${item.number} - ${item.neighborhood} - ${item.city} - ${item.state} - ${item.country}`}</td>
                <td className="px-4 py-3 text-sm">
                  {formatCentsToBRL(item.totalPriceInCents)}
                </td>
                <td className="px-4 py-3 text-sm">{item.paymentType}</td>
                <td className="px-4 py-3 text-sm">
                  <Badge>{item.approval}</Badge>
                </td>

                {/* Coluna de Status com Select */}
                <td className="px-4 py-3 text-sm">
                  {(item.approval === "APPROVED" && (
                    <Select
                      value={item.status}
                      onValueChange={(value) =>
                        handleStatusChange(item.orderId!, value)
                      }
                      disabled={orderStatusMutation.isPending}
                    >
                      <SelectTrigger className="h-8 w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {ORDER_STATUSES.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )) || (
                    <div className="flex items-center justify-center">
                      {" - "}
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 text-sm">
                  {formatWithTimeZone(item.createdAt || "")}
                </td>

                {/* Coluna de Actions - apenas Approval */}
                <td className="px-4 py-3">
                  {item.approval === "PENDING" && (
                    <div className="flex gap-2">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 cursor-pointer bg-transparent p-0"
                              onClick={() =>
                                handleApprovalClick(item.orderId!, "APPROVED")
                              }
                              disabled={orderApprovalMutation.isPending}
                            >
                              <CheckIcon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Approve</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 cursor-pointer bg-transparent p-0"
                              onClick={() =>
                                handleApprovalClick(item.orderId!, "REJECTED")
                              }
                              disabled={orderApprovalMutation.isPending}
                            >
                              <XIcon className="h-4 w-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Reject</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="my-6">
        {orderData && orderData.pagination && (
          <ProductGridPagination
            totalPages={orderData.pagination.totalPages}
            currentPage={pagination.currentPage}
          />
        )}
      </footer>
    </div>
  );
};

export { OrderTable };
