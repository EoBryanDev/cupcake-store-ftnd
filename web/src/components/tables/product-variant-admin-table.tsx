"use client";

import { ImageIcon } from "lucide-react";
import { formatWithTimeZone } from "@/src/helpers/formatWithTimeZone";
import { paginationDefault } from "@/src/helpers/pagination-default";
import { Badge } from "../ui/badge";
import { Tooltip, TooltipContent, TooltipProvider } from "../ui/tooltip";
import { Button } from "../ui/button";
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
import { useProductVariantOnlyQuery } from "@/src/hooks/queries/useProductVariantsOnly";
import { UpdateProductVariantDialog } from "../dialogs/update-product-variant-dialog";
import { formatCentsToBRL } from "@/src/helpers/format-cents-brlformated";
import { useCreateProductVariantMutation } from "@/src/hooks/mutations/(admin)/useCreateProductVariantMutation";
import { useUpdateProductVariantMutation } from "@/src/hooks/mutations/(admin)/useUpdateProductVariantMutation";
import { toast } from "sonner";

const PRODUCT_STATUS = [
  { value: "ACTIVE", label: "Active", variant: "default" },
  { value: "INACTIVE", label: "Inative", variant: "destructive" },
] as const;

const ProductVariantTable = () => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page") ?? "1";
  const [pagination, setPagination] =
    useState<IPaginationDefault>(paginationDefault());
  const { data: productVariantData, isLoading: isProductVariantLoading } =
    useProductVariantOnlyQuery(pagination);
  const updateProductVariantMutation = useUpdateProductVariantMutation();

  useEffect(() => {
    const currentPage = parseInt(page);
    const limit = pagination.limit;
    const offset = (currentPage - 1) * limit + 1;
    setPagination((prev) => ({ ...prev, currentPage, offset }));
  }, [page, pagination.limit]);

  if (isProductVariantLoading) {
    return <MainContainer>Loading...</MainContainer>;
  }

  const handleStatusChange = async (
    productVariantId: string,
    active: boolean,
  ) => {
    try {
      const resp = await updateProductVariantMutation.mutateAsync({
        productVariantId,
        active,
      });

      toast.success(
        `Product Variant ${resp.data[0].name} was successfully updated`,
      );
    } catch (error) {
      toast.error(`Failed to update product variant`);
    }
  };

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
                Image
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Product Variant
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Slug
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Description
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Color
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Weight
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Width
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Height
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Size
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Price
              </th>
              <th className="text-muted-foreground px-4 py-3 text-left text-sm font-medium">
                Raw Material
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
            {isProductVariantLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-3 text-center">
                  Loading...
                </td>
              </tr>
            )}
            {productVariantData?.data?.map((item) => (
              <tr key={item.productVariantId} className="hover:bg-muted/50">
                <td className="px-4 py-3 text-sm">{item.product.name}</td>
                <td className="px-4 py-3 text-sm">
                  {item.imageUrl ? (
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-10 w-10 rounded-md object-cover"
                    />
                  ) : (
                    <div className="bg-muted flex h-10 w-10 items-center justify-center rounded-md border">
                      <ImageIcon className="text-muted-foreground h-5 w-5" />
                    </div>
                  )}
                </td>

                <td className="px-4 py-3 text-sm">{item.name}</td>
                <td className="px-4 py-3 text-sm">{item.slug}</td>
                <td className="px-4 py-3 text-sm">{item.description}</td>
                <td className="px-4 py-3 text-sm">{item.color}</td>
                <td className="px-4 py-3 text-sm">{item.weight}</td>
                <td className="px-4 py-3 text-sm">{item.width}</td>
                <td className="px-4 py-3 text-sm">{item.height}</td>
                <td className="px-4 py-3 text-sm">{item.size}</td>
                <td className="px-4 py-3 text-sm">
                  {formatCentsToBRL(item.priceInCents)}
                </td>
                <td className="px-4 py-3 text-sm">{item.rawMaterial}</td>

                {/* Coluna de Status com Select */}
                <td className="px-4 py-3 text-sm">
                  <Select
                    value={item.active ? "ACTIVE" : "INACTIVE"}
                    onValueChange={(value) =>
                      handleStatusChange(
                        item.productVariantId!,
                        value === "ACTIVE" ? true : false,
                      )
                    }
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
                    <UpdateProductVariantDialog
                      productVariantId={item.productVariantId}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <footer className="my-6">
        {productVariantData && productVariantData.pagination && (
          <ProductGridPagination
            totalPages={productVariantData.pagination.totalPages}
            currentPage={pagination.currentPage}
          />
        )}
      </footer>
    </div>
  );
};

export { ProductVariantTable };
