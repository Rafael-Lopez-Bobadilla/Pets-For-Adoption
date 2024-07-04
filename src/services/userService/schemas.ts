import { z } from "zod";
export const userSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    favorites: z.array(z.string()),
  })
  .strict();

export const logInSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});
export const signUpSchema = logInSchema
  .extend({
    name: z.string().min(1, "Username is required"),
    confirm: z.string().min(1, "Password confirmation is required"),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "Passwords do not match",
  });

export type TSignUpSchema = z.infer<typeof signUpSchema>;
export type TLogInSchema = z.infer<typeof logInSchema>;
export type TUserSchema = z.infer<typeof userSchema>;
