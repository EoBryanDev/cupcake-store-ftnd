import z from "zod";
const signUpSchema = z
  .object({
    firstName: z.string("Invalid First Name").trim().min(2, "Invalid First Name"),
    lastName: z.string("Invalid Last Name").trim().min(2, "Invalid Last Name"),
    phoneNumber: z.string(),
    legalId: z.string("Invalid Legal Id"),
    birthDate: z.date("Invalid Date"),
    email: z.email("Invalid E-mail"),
    password: z.string("Invalid Password"),
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