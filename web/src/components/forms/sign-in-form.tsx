"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
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
import { signInSchema, TSignInSchema } from "@/src/schemas/sign-in-schema";
import { toast } from "sonner";
import { useLogin } from "@/src/hooks/mutations/useLogin";

import { useTranslation } from "react-i18next";

const SignInForm = () => {
  const { t } = useTranslation("auth");
  // const router = useRouter();
  const userLogin = useLogin();
  const sign_in_form = useForm<any>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: TSignInSchema) => {
    try {
      await userLogin.mutateAsync(values);
      toast.success(t("signIn.success"));

      sign_in_form.reset;
    } catch (error) {
      toast.error(t("signIn.error"));
    }
  };

  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("signIn.title")}</CardTitle>
          <CardDescription>{t("signIn.description")}</CardDescription>
        </CardHeader>
        <Form {...sign_in_form}>
          <form
            onSubmit={sign_in_form.handleSubmit(onSubmit)}
            className="space-y-8"
          >
            <CardContent className="grid gap-6">
              <FormField
                control={sign_in_form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("signIn.emailLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("signIn.emailPlaceholder")} {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={sign_in_form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("signIn.passwordLabel")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("signIn.passwordPlaceholder")}
                        {...field}
                        type="password"
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="flex flex-col gap-2">
              <Button type="submit" className="w-full">
                {t("signIn.submit")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignInForm;
