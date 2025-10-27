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

const SignUpForm = () => {
  const router = useRouter();
  const sign_up_form = useForm<TSignUpSchema>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      passwordConfirmation: "",
    },
  });

  // const onSubmit = async (values: TSignUpSchema) => {
  //   await authClient.signUp.email({
  //     name: values.username,
  //     email: values.email,
  //     password: values.password,
  //     fetchOptions: {
  //       onSuccess: () => {
  //         //   toast.success("Conta criada com sucesso!");
  //         router.push("/");
  //       },
  //       onError: (error) => {
  //         if (error.error.code === "USER_ALREADY_EXISTS") {
  //           toast.error("E-mail já cadastrado");
  //           return sign_up_form.setError("email", {
  //             message: "E-mail já cadastrado",
  //           });
  //         }
  //         toast.error(error.error.message);
  //       },
  //     },
  //   });
  // };
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>Create an account to continue</CardDescription>
        </CardHeader>
        <Form {...sign_up_form}>
          <form
            // onSubmit={sign_up_form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CardContent className="grid gap-6">
              <FormField
                control={sign_up_form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Type your name" {...field} />
                    </FormControl>

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
