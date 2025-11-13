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

import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { toast } from "sonner";
import { newCategorySchema, TNewCategorySchema } from "./new-category-schema";
import { useCreateCategoryMutation } from "@/src/hooks/mutations/(admin)/useCreateCategoryMutation";

const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false);
  const newCategoryForm = useForm<TNewCategorySchema>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: {
      name: "",
      slug: "",
      description: "",
    },
  });

  const createCategoryMutation = useCreateCategoryMutation();
  const onSubmit = async (values: TNewCategorySchema) => {
    try {
      const resp = await createCategoryMutation.mutateAsync(values);

      setOpen(false);
      newCategoryForm.reset();
      toast.success(`Category '${resp.data[0].name}'created successfully`);
    } catch (error) {
      console.log(error);
      toast.error("Error creating category");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusIcon className="h-4 w-4" /> Create New Category
        </Button>
      </DialogTrigger>

      <DialogContent>
        <Form {...newCategoryForm}>
          <form
            onSubmit={newCategoryForm.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <DialogHeader>
              <DialogTitle>New Category</DialogTitle>
              <hr />
              <DialogDescription>Create a new category</DialogDescription>
            </DialogHeader>

            <Card className="w-full">
              <CardContent className="grid grid-cols-1 gap-6 pt-6 md:grid-cols-2">
                <FormField
                  control={newCategoryForm.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category</FormLabel>
                      <FormControl>
                        <Input placeholder="Type category's name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={newCategoryForm.control}
                  name="slug"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Category Slug</FormLabel>
                      <FormControl>
                        <Input placeholder="Type category's slug" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="md:col-span-2">
                  <FormField
                    control={newCategoryForm.control}
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
                  onClick={() => newCategoryForm.reset()}
                >
                  Cancel
                </Button>
              </DialogClose>
              <Button type="submit">New Category</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export { CreateCategoryDialog };
