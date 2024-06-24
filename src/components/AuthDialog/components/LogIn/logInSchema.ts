import { z } from "zod";
export const logInSchema = z.object({
  email: z.string().email().min(1, "Email is required"),
  password: z.string().min(1, "Password is required"),
});

export type TLogInSchema = z.infer<typeof logInSchema>;
