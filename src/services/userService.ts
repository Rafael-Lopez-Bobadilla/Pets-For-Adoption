import { TLogInSchema } from "../components/AuthForm/LogIn/logInSchema";
import { TSignUpSchema } from "../components/AuthForm/SignUp/signUpSchema";
import axios from "axios";
import { z } from "zod";

export const UserSchema = z
  .object({
    name: z.string(),
    email: z.string(),
    favorites: z.array(z.string()),
  })
  .strict();

const userClient = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  withCredentials: true,
});

export const authenticate = async () => {
  const res = await userClient.get("/api/v1/authenticate");
  return UserSchema.parse(res.data);
};

export const AuthWithGoogle = async (googleToken: string) => {
  const res = await userClient.post(
    "/api/v1/googleAuth",
    {},
    {
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },
    }
  );
  return UserSchema.parse(res.data);
};

export const logIn = async (formData: TLogInSchema) => {
  const { email, password } = formData;
  const res = await userClient.post("/api/v1/login", { email, password });
  return UserSchema.parse(res.data);
};

export const signUp = async (formData: TSignUpSchema) => {
  const { name, email, password } = formData;
  const res = await userClient.post("/api/v1/signup", {
    name,
    email,
    password,
  });
  return UserSchema.parse(res.data);
};

export const updateFavorites = async (id: number, action: string) => {
  const res = await userClient.patch(`/api/v1/updateFavorites/${action}`, {
    favorite: id.toString(),
  });
  return UserSchema.parse(res.data);
};

export const logout = async () => {
  return await userClient.get("/api/v1/logout");
};
