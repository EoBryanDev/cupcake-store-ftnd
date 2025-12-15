"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

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

import { useQueryClient } from "@tanstack/react-query";
import { format } from "date-fns";
import { useRegister } from "@/src/hooks/mutations/useRegister";
import { cn } from "@/src/lib/utils";
import { CalendarIcon } from "lucide-react";
import { cpfMask, phoneMask } from "@/src/helpers/masks";

const SignUpForm = () => {
  const { t } = useTranslation("auth");
  const router = useRouter();
  const queryClient = useQueryClient();
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
      await register.mutateAsync(values, {
        onSuccess: () => {
          queryClient.invalidateQueries({ queryKey: ["session"] });
        },
      });
      toast.success(t("signUp.success"));

      sign_up_form.reset();
    } catch (error: any) {
      toast.error(error.message || t("signUp.error"));
    }
  };
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>{t("signUp.title")}</CardTitle>
          <CardDescription>{t("signUp.description")}</CardDescription>
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
                    <FormLabel>{t("signUp.firstName")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("signUp.firstNamePlaceholder")} {...field} />
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
                    <FormLabel>{t("signUp.lastName")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("signUp.lastNamePlaceholder")} {...field} />
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
                    <FormLabel>{t("signUp.phone")}</FormLabel>
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
                    <FormLabel>{t("signUp.legalId")}</FormLabel>
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
                    <FormLabel>{t("signUp.birthDate")}</FormLabel>
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
                              <span>{t("signUp.pickDate")}</span>
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
                    <FormLabel>{t("signIn.emailLabel")}</FormLabel>
                    <FormControl>
                      <Input placeholder={t("signIn.emailPlaceholder")} {...field} />
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
              <FormField
                control={sign_up_form.control}
                name="passwordConfirmation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t("signUp.confirmPassword")}</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={t("signUp.confirmPasswordPlaceholder")}
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
                {t("signUp.submit")}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </>
  );
};

export default SignUpForm;
