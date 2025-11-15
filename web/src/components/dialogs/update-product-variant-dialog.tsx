"use client";
import { EditIcon } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Card, CardContent } from "../ui/card";
import { Input } from "../ui/input";

import { Textarea } from "../ui/textarea";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { IPaginationDefault } from "@/src/interface/IPaginationDefault";
import { paginationDefault } from "@/src/helpers/pagination-default";

import { useUpdateProductVariantMutation } from "@/src/hooks/mutations/(admin)/useUpdateProductVariantMutation";
import { useProductVariantOnlyQuery } from "@/src/hooks/queries/useProductVariantsOnly";
import { TUpdateCategorySchema } from "./update-category-schema";
import {
  TUpdateProductVariantSchema,
  updateProductVariantSchema,
} from "./update-product-variant-schema";

interface IUpdateCategoryDialogProps {
  productVariantId: string;
}

const UpdateProductVariantDialog = ({
  productVariantId,
}: IUpdateCategoryDialogProps) => {
  const [pagination] = useState<IPaginationDefault>(paginationDefault());
  const { data: productVariantOnlyData } =
    useProductVariantOnlyQuery(pagination);

  const editingProductVariantOnly = productVariantOnlyData?.data?.find(
    (productVariant) => productVariant.productVariantId === productVariantId,
  );

  const [open, setOpen] = useState(false);
  const updateProductVariantForm = useForm<TUpdateProductVariantSchema>({
    resolver: zodResolver(updateProductVariantSchema),
    defaultValues: {
      productId: "",
      name: "",
      slug: "",
      description: "",
      color: "",
      weight: undefined,
      width: undefined,
      height: undefined,
      size: "",
      priceInCents: undefined,
      rawMaterial: "",
      imageUrl: "",
      active: true,
    },
  });

  // Atualiza o form quando os dados chegarem ou quando o dialog abrir
  useEffect(() => {
    if (editingProductVariantOnly && open) {
      updateProductVariantForm.reset({
        productId: editingProductVariantOnly.productId || "",
        name: editingProductVariantOnly.name || "",
        slug: editingProductVariantOnly.slug || "",
        description: editingProductVariantOnly.description || "",
        color: editingProductVariantOnly.color || "",
        weight: editingProductVariantOnly.weight ?? undefined,
        width: editingProductVariantOnly.width ?? undefined,
        height: editingProductVariantOnly.height ?? undefined,
        size: editingProductVariantOnly.size || "",
        priceInCents: editingProductVariantOnly.priceInCents ?? undefined,
        rawMaterial: editingProductVariantOnly.rawMaterial || "",
        imageUrl: editingProductVariantOnly.imageUrl || "",
        active: editingProductVariantOnly.active ?? true,
      });
    }
  }, [editingProductVariantOnly, open, updateProductVariantForm]);

  const updateProductVariantMutation = useUpdateProductVariantMutation();
  const onSubmit = async (values: TUpdateProductVariantSchema) => {
    try {
      const resp = await updateProductVariantMutation.mutateAsync({
        ...values,
        productVariantId: productVariantId,
      });

      setOpen(false);
      updateProductVariantForm.reset();
      toast.success(
        `Product Variant '${resp.data[0].name}' edited successfully`,
      );
    } catch (error) {
      toast.error("Error editing product variant");
    }
  };
  return (
    <TooltipProvider>
      <Tooltip>
        <Dialog open={open} onOpenChange={setOpen}>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="outline">
                <EditIcon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Edit</p>
          </TooltipContent>

          <DialogContent>
            <Form {...updateProductVariantForm}>
              <form
                onSubmit={updateProductVariantForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <DialogHeader>
                  <DialogTitle>Edit Product Variant</DialogTitle>
                  <hr />
                  <DialogDescription>
                    Edit your product variant
                  </DialogDescription>
                </DialogHeader>

                <Card className="w-full">
                  <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
                    {/* Name - 1 coluna */}
                    <FormField
                      control={updateProductVariantForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Variant</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type product variant's name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Slug - 1 coluna */}
                    <FormField
                      control={updateProductVariantForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Variant Slug</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type product variant's slug"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Description - ocupa 2 colunas */}
                    <div className="md:col-span-2">
                      <FormField
                        control={updateProductVariantForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Variant Description</FormLabel>
                            <FormControl>
                              <Textarea
                                className="resize-none"
                                placeholder="Type product variant's description"
                                rows={2}
                                maxLength={255}
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Color */}
                    <FormField
                      control={updateProductVariantForm.control}
                      name="color"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Red" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Size */}
                    <FormField
                      control={updateProductVariantForm.control}
                      name="size"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g., Medium" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Price In Cents */}
                    <FormField
                      control={updateProductVariantForm.control}
                      name="priceInCents"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price (in cents)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 1999"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : parseInt(e.target.value, 10),
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Weight */}
                    <FormField
                      control={updateProductVariantForm.control}
                      name="weight"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Weight (grams)</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              placeholder="e.g., 150"
                              {...field}
                              onChange={(e) =>
                                field.onChange(
                                  e.target.value === ""
                                    ? undefined
                                    : parseFloat(e.target.value),
                                )
                              }
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Image URL */}
                    <div className="md:col-span-2">
                      <FormField
                        control={updateProductVariantForm.control}
                        name="imageUrl"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image URL</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="https://example.com/image.png"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => updateProductVariantForm.reset()}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Edit Product Variant</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </Tooltip>
    </TooltipProvider>
  );
};

export { UpdateProductVariantDialog };
