"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { signUpSchema, TSignUpSchema } from "@/src/schemas/sign-up-schema";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

import { format } from "date-fns";
import { useRegister } from "@/src/hooks/mutations/useRegister";
import { cn } from "@/src/lib/utils";
import { CalendarIcon } from "lucide-react";
import { cpfMask, phoneMask } from "@/src/helpers/masks";

const SignUpForm = () => {
  const router = useRouter();
  const register = useRegister();
  const sign_up_form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      legalId: "",
      birthDate: undefined,
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  const onSubmit = async (values: TSignUpSchema) => {
    try {
      await register.mutateAsync(values);
      toast.success("Registered successfully! Wait to be redirected!");

      sign_up_form.reset;
    } catch (error: any) {
      toast.error(error.message || "There was not possible register!");
    }
  };
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Create an account to continue</CardDescription>
        </CardHeader>
        <Form {...sign_up_form}>
          <form
            onSubmit={sign_up_form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CardContent className="grid gap-6">
              <FormField
                control={sign_up_form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your first name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_up_form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your last name" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_up_form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="(xx) xxxxx-xxxx"
                        {...field}
                        onChange={(e) =>
                          field.onChange(phoneMask(e.target.value))
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_up_form.control}
                name="legalId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Legal ID</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="xxx.xxx.xxx-xx"
                        {...field}
                        onChange={(e) =>
                          field.onChange(cpfMask(e.target.value))
                        }
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_up_form.control}
                name="birthDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Birth Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground",
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date > new Date()}
                          captionLayout="dropdown"
                          fromYear={1900}
                          toYear={new Date().getFullYear()}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_up_form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your e-mail" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_up_form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your password"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_up_form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm your Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Type your password again"
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
