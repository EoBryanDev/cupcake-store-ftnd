import { TSignUpSchema } from '@/src/schemas/sign-up-schema';
import { createUser } from '@/src/services/user.service';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from "next/navigation";
import { useSession } from '../useSession';
import { ILogin } from '@/src/interface/ILogin';

export const userRegisterMutationKey = () => ["user-register"] as const;

export function useRegister() {
  const router = useRouter();
  return useMutation({
    mutationKey: userRegisterMutationKey(),
    mutationFn: async (userData: TSignUpSchema) => {
      return createUser(userData);
    },
    onSuccess: (data: ILogin) => {
      console.log(data);

      const userSession = useSession('user');

      userSession.remove();
      userSession.set({
        firstName: data.data.firstName,
        lastName: data.data.lastName,
        email: data.data.email,
      })
      // const { } = data;

      // userSession.set(data)
      // newUserSession()

      setTimeout(() => {
        router.push('/');
      }, 3000);
    },
    onError: (error) => {

      return `Registration error: ${error.message}`;
    },
  });
}