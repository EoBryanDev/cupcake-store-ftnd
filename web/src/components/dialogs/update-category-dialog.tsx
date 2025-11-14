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
import {
  TUpdateCategorySchema,
  updateCategorySchema,
} from "./update-category-schema";
import { useCategoryQuery } from "@/src/hooks/queries/(admin)/useCategoryQuery";
import { useUpdateCategoryMutation } from "@/src/hooks/mutations/(admin)/useUpdateCategoryMutation";

interface IUpdateCategoryDialogProps {
  categoryId: string;
}

const UpdateCategoryDialog = ({ categoryId }: IUpdateCategoryDialogProps) => {
  const [pagination] = useState<IPaginationDefault>(paginationDefault());
  const { data: categoryData } = useCategoryQuery(pagination);

  const editingCategory = categoryData?.data?.find(
    (category) => category.categoryId === categoryId,
  );

  const [open, setOpen] = useState(false);
  const updateCategoryForm = useForm<TUpdateCategorySchema>({
    resolver: zodResolver(updateCategorySchema),
    defaultValues: {
      categoryId: "",
      name: "",
      slug: "",
      description: "",
    },
  });

  // Atualiza o form quando os dados chegarem ou quando o dialog abrir
  useEffect(() => {
    if (editingCategory && open) {
      updateCategoryForm.reset({
        categoryId: editingCategory.categoryId,
        name: editingCategory.name,
        slug: editingCategory.slug,
        description: editingCategory.description ?? "",
      });
    }
  }, [editingCategory, open, updateCategoryForm]);

  const updateCategoryMutation = useUpdateCategoryMutation();
  const onSubmit = async (values: TUpdateCategorySchema) => {
    try {
      const resp = await updateCategoryMutation.mutateAsync({
        ...values,
        categoryId: categoryId,
      });

      setOpen(false);
      updateCategoryForm.reset();
      toast.success(`Category '${resp.data[0].name}'edited successfully`);
    } catch (error) {
      console.log(error);
      toast.error("Error editing category");
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
            <Form {...updateCategoryForm}>
              <form
                onSubmit={updateCategoryForm.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <DialogHeader>
                  <DialogTitle>Edit Category</DialogTitle>
                  <hr />
                  <DialogDescription>Edit your category</DialogDescription>
                </DialogHeader>

                <Card className="w-full">
                  <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
                    {/* Name - 1 coluna */}
                    <FormField
                      control={updateCategoryForm.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type category's name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Slug - 1 coluna */}
                    <FormField
                      control={updateCategoryForm.control}
                      name="slug"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category Slug</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Type category's slug"
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
                        control={updateCategoryForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Category Description</FormLabel>
                            <FormControl>
                              <Textarea
                                className="resize-none"
                                placeholder="Type category's description"
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
                  </CardContent>
                </Card>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button
                      variant="outline"
                      onClick={() => updateCategoryForm.reset()}
                    >
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type="submit">Edit Category</Button>
                </DialogFooter>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </Tooltip>
    </TooltipProvider>
  );
};

export { UpdateCategoryDialog };
