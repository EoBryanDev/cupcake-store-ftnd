import { TSignUpSchema } from '@/src/schemas/sign-up-schema';
import { createUser } from '@/src/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from "next/navigation";

export const userRegisterMutationKey = () => ["user-register"] as const;

export function useRegister() {
  const router = useRouter();
  return useMutation({
    mutationKey: userRegisterMutationKey(),
    mutationFn: async (userData: TSignUpSchema) => {
      return createUser(userData);
    },
    onSuccess: () => {
      setTimeout(() => {
        router.push('/');
      }, 3000);
    },
    onError: (error) => {

      return `Registration error: ${error.message}`;
    },
  });
}