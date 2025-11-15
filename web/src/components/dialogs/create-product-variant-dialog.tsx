"use client";
import { PlusIcon } from "lucide-react";
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

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import {
  newProductVariantSchema,
  TNewProductVariantSchema,
} from "./new-product-variant-schema";
import { useCreateProductVariantMutation } from "@/src/hooks/mutations/(admin)/useCreateProductVariantMutation";
import { useProductVariantQuery } from "@/src/hooks/queries/useProductVariants";

const CreateProductVariantDialog = () => {
  const [open, setOpen] = useState(false);
  const newProductVariantForm = useForm<TNewProductVariantSchema>({
    resolver: zodResolver(newProductVariantSchema),
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

  const { data: productData, isLoading: isProductLoading } =
    useProductVariantQuery({
      offset: 1,
      limit: 100, // Adjust as needed
      order: "asc",
      orderBy: "name",
      currentPage: 1,
      searchType: "default",
    });

  const createProductVariantMutation = useCreateProductVariantMutation();
  const onSubmit = async (values: TNewProductVariantSchema) => {
    try {
      const resp = await createProductVariantMutation.mutateAsync(values);

      setOpen(false);
      newProductVariantForm.reset();
      toast.success(
        `Product Variant '${resp.data[0].name}' created successfully`,
      );
    } catch (error) {
      toast.error("Error creating product variant");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4" /> Create New Product Variant
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...newProductVariantForm}>
          <form
            onSubmit={newProductVariantForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <DialogHeader>
              <DialogTitle>New Product Variant</DialogTitle>
              <hr />
              <DialogDescription>
                Create a new product variant
              </DialogDescription>
            </DialogHeader>

            <Card className="w-full">
              <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
                {/* ProductId */}
                <div className="md:col-span-2">
                  <FormField
                    control={newProductVariantForm.control}
                    name="productId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product</FormLabel>
                        {isProductLoading && <div>Loading products...</div>}
                        {productData && (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a product" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {productData?.data?.map((product) => (
                                <SelectItem
                                  key={product.productId}
                                  value={product.productId}
                                >
                                  {product.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={newProductVariantForm.control}
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

                <FormField
                  control={newProductVariantForm.control}
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

                <div className="md:col-span-2">
                  <FormField
                    control={newProductVariantForm.control}
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
                  control={newProductVariantForm.control}
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
                  control={newProductVariantForm.control}
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
                  control={newProductVariantForm.control}
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
                  control={newProductVariantForm.control}
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

                {/* Raw Material */}
                <FormField
                  control={newProductVariantForm.control}
                  name="rawMaterial"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Raw Material</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Chocolate" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Image URL */}
                <FormField
                  control={newProductVariantForm.control}
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
              </CardContent>
            </Card>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  onClick={() => newProductVariantForm.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">New Product Variant</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateProductVariantDialog };
