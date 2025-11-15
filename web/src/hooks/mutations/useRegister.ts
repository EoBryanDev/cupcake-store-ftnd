import { TSignUpSchema } from '@/src/schemas/sign-up-schema';
import { createUser } from '@/src/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { useSession } from '../useSession';
import { ILogin } from '@/src/interface/ILogin';

export const userRegisterMutationKey = () => ["user-register"] as const;

export function useRegister() {

  return useMutation({
    mutationKey: userRegisterMutationKey(),
    mutationFn: async (userData: TSignUpSchema) => {
      return createUser(userData);
    },
    onSuccess: async (data: ILogin) => {
      const userSession = useSession('user');

      userSession.remove();
      userSession.set({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
      });


      setTimeout(() => {
        window.location.href = '/'; // ← NOVA LINHA (hard navigation)
      }, 3000);

    },
    onError: (error) => {
      return `Registration error: ${error.message}`;
    },
  });
}