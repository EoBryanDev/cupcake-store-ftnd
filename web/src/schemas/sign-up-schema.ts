import z from "zod";
const signUpSchema = z
  .object({
    username: z.string("Invalid Name").trim().min(2, "Invalid Name"),
    email: z.email("Invalid E-mail"),
    password: z.string("Invalid Password").min(8, "Invalid Password"),
    passwordConfirmation: z.string("Invalid Password"),
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirmation;
    },
    {
      error: "Passwords does not match",
      path: ["passwordConfirmation"],
    },
  );

type TSignUpSchema = z.infer<typeof signUpSchema>;

export type { TSignUpSchema };
export { signUpSchema };