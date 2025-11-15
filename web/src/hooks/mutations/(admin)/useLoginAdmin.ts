import { TSignInSchema } from "@/src/schemas/sign-in-schema";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useSession } from "../../useSession";
import { ILogin } from "@/src/interface/ILogin";
import { loginAdmin } from "@/src/services/(admin)/userAdmin.service";

export const postUserLoginAdminMutationKey = () => ["user-login-admin"] as const;

export const useLoginAdmin = () => {
  const router = useRouter();
  return useMutation({
    mutationKey: postUserLoginAdminMutationKey(),
    mutationFn: async (loginPayload: TSignInSchema) => {
      return loginAdmin(loginPayload);
    },
    onSuccess: (data: ILogin) => {
      const userAdminSession = useSession('user-admin');

      userAdminSession.remove();
      userAdminSession.set({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
      })

      setTimeout(() => {
        router.push('/admin/dashboard');
      }, 3000);
    },
    onError: (error) => {
      return `Login Error: ${error.message}`
    },
  });
};