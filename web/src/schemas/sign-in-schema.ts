import z from "zod";
const signInSchema = z
  .object({
    email: z.email("Invalid E-mail"),
    password: z.string("Invalid Password"),

  })

type TSignInSchema = z.infer<typeof signInSchema>;

export type { TSignInSchema };
export { signInSchema };