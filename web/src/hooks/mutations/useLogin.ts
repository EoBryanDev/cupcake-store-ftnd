import { TSignInSchema } from "@/src/schemas/sign-in-schema";
import { login } from "@/src/services/user.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const postUserLoginMutationKey = () => ["user-login"] as const;

export const useLogin = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: postUserLoginMutationKey(),
    mutationFn: async (loginPayload: TSignInSchema) => {
      return login(loginPayload);
    },
    onSuccess: () => {
      setTimeout(() => {
        router.push('/');
      }, 3000);
    },
    onError: (error) => {
      console.error('Erro no login:', error.message);
    },
  });
};