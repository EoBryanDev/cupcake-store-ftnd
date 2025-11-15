import { TSignUpSchema } from '@/src/schemas/sign-up-schema';
import { createUser } from '@/src/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import { useSession } from '../useSession';
import { ILogin } from '@/src/interface/ILogin';
import { useLogin } from './useLogin';

export const userRegisterMutationKey = () => ["user-register"] as const;

export function useRegister() {
  const loginMutation = useLogin();

  return useMutation({
    mutationKey: userRegisterMutationKey(),
    mutationFn: async (userData: TSignUpSchema) => {
      return createUser(userData);
    },
    onSuccess: async (data: ILogin, variables) => {
      const userSession = useSession('user');

      userSession.remove();
      userSession.set({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
      });
      await loginMutation.mutateAsync({
        email: variables.email,
        password: variables.password
      });

    },
    onError: (error) => {
      return `Registration error: ${error.message}`;
    },
  });
}