import { TSignInSchema } from "@/src/schemas/sign-in-schema";
import { login } from "@/src/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "../useSession";
import { ILogin } from "@/src/interface/ILogin";

export const postUserLoginMutationKey = () => ["user-login"] as const;

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: postUserLoginMutationKey(),
    mutationFn: async (loginPayload: TSignInSchema) => {
      return login(loginPayload);
    },
    onSuccess: (data: ILogin) => {
      const userSession = useSession('user');

      userSession.remove();
      userSession.set({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
      })

      setTimeout(() => {
        router.push('/');
      }, 3000);
    },
    onError: (error) => {
      return `Login Error: ${error.message}`
    },
  });
};