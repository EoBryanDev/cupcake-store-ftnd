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
import { newProductSchema, TNewProductSchema } from "./new-product-schema";
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
import { useCreateProductMutation } from "@/src/hooks/mutations/(admin)/useCreateProductMutation";
import { useCategoryQuery } from "@/src/hooks/queries/(admin)/useCategoryQuery";

const CreateProductDialog = () => {
  const [open, setOpen] = useState(false);
  const newProductForm = useForm<TNewProductSchema>({
    resolver: zodResolver(newProductSchema),
    defaultValues: {
      categoryId: "",
      name: "",
      slug: "",
      description: "",
      unit: "",
      active: true,
    },
  });
  const { data: categoryData, isLoading: isCategoryLoading } = useCategoryQuery(
    {
      offset: 1,
      limit: 60,
      order: "asc",
      orderBy: "name",
      currentPage: 1,
      searchType: "default",
    },
  );

  const createProductMutation = useCreateProductMutation();
  const onSubmit = async (values: TNewProductSchema) => {
    try {
      const resp = await createProductMutation.mutateAsync(values);

      setOpen(false);
      newProductForm.reset();
      toast.success(`Product '${resp.data[0].name}' created successfully`);
    } catch (error) {
      console.log(error);
      toast.error("Error creating product");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4" /> Create new Product
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...newProductForm}>
          <form
            onSubmit={newProductForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <DialogHeader>
              <DialogTitle>New Product</DialogTitle>
              <hr />
              <DialogDescription>Create a new product</DialogDescription>
            </DialogHeader>

            <Card className="w-full">
              <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
                {/* Category - ocupa 2 colunas */}
                <div className="md:col-span-2">
                  <FormField
                    control={newProductForm.control}
                    name="categoryId"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        {isCategoryLoading && <div>Loading...</div>}
                        {(categoryData && (
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>

                            <SelectContent>
                              {categoryData?.data?.map((item) => (
                                <SelectItem
                                  key={item.categoryId}
                                  value={item.categoryId}
                                >
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        )) || <div>No categories found</div>}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Name - 1 coluna */}
                <FormField
                  control={newProductForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product</FormLabel>
                      <FormControl>
                        <Input placeholder="Type product's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Slug - 1 coluna */}
                <FormField
                  control={newProductForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Type product's slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Description - ocupa 2 colunas */}
                <div className="md:col-span-2">
                  <FormField
                    control={newProductForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Description</FormLabel>
                        <FormControl>
                          <Textarea
                            className="resize-none"
                            placeholder="Type product's description"
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

                {/* Unit - ocupa 2 colunas */}
                <div className="md:col-span-2">
                  <FormField
                    control={newProductForm.control}
                    name="unit"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Product Unit</FormLabel>
                        <FormControl>
                          <Input placeholder="Type product's unit" {...field} />
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
                  onClick={() => newProductForm.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">New Product</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateProductDialog };
