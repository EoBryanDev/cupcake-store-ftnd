"use client";
import { EditIcon, PlusIcon } from "lucide-react";
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
import {
  TUpdateProductSchema,
  updateProductSchema,
} from "./update-product-schema";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import { useState } from "react";
import { toast } from "sonner";
import { useUpdateProductMutation } from "@/src/hooks/mutations/(admin)/useUpdateProductMutation";

interface IUpdateProductDialogProps {
  productId: string;
}

const UpdateProductDialog = ({ productId }: IUpdateProductDialogProps) => {
  const [open, setOpen] = useState(false);
  const updateProductForm = useForm<TUpdateProductSchema>({
    resolver: zodResolver(updateProductSchema),
    defaultValues: {
      categoryId: "",
      name: "",
      slug: "",
      description: "",
      unit: "",
      active: true,
    },
  });

  const updateProductMutation = useUpdateProductMutation();
  const onSubmit = async (values: TUpdateProductSchema) => {
    try {
      const resp = await updateProductMutation.mutateAsync(values);

      setOpen(false);
      updateProductForm.reset();
      toast.success(`Product '${resp.data[0].name}'edited successfully`);
    } catch (error) {
      console.log(error);
      toast.error("Error editing product");
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
            <Form {...updateProductForm}>
              <form
                onSubmit={updateProductForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <DialogHeader>
                  <DialogTitle>Edit Product</DialogTitle>
                  <hr />
                  <DialogDescription>Edit your product</DialogDescription>
                </DialogHeader>

                <Card className="w-full">
                  <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
                    {/* Category - ocupa 2 colunas */}
                    <div className="md:col-span-2">
                      <FormField
                        control={updateProductForm.control}
                        name="categoryId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category</FormLabel>
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
                                <SelectItem value="tecnologia">
                                  Tecnologia
                                </SelectItem>
                                <SelectItem value="design">Design</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>

                    {/* Name - 1 coluna */}
                    <FormField
                      control={updateProductForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type product's name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Slug - 1 coluna */}
                    <FormField
                      control={updateProductForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Slug</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type product's slug"
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
                        control={updateProductForm.control}
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
                        control={updateProductForm.control}
                        name="unit"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Product Unit</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Type product's unit"
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
                      onClick={() => updateProductForm.reset()}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Edit Product</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </Tooltip>
    </TooltipProvider>
  );
};

export { UpdateProductDialog };
