import { LogInSchema } from "../components/AuthDialog/components/LogIn/LogIn";
import { SignUpSchema } from "../components/AuthDialog/components/SignUp/SignUp";
import axios, { AxiosRequestConfig } from "axios";
import { z, ZodSchema } from "zod";

const UserSchema = z.object({
  name: z.string(),
  email: z.string(),
  favorites: z.array(z.string()),
});

export type TUser = z.infer<typeof UserSchema>;

const pfaClient = axios.create({
  baseURL: `${import.meta.env.VITE_API}`,
  withCredentials: true,
});

export const getUser = async () => {
  return await handleRequest<TUser>(
    { url: "/api/v1/authenticate" },
    UserSchema
  );
};

export const getUserWithGoogle = async (googleToken: string) => {
  return await handleRequest(
    {
      url: "/api/v1/googleAuth",
      method: "POST",
      headers: {
        Authorization: `Bearer ${googleToken}`,
      },
    },
    UserSchema
  );
};

export const logIn = async (formData: LogInSchema) => {
  const { email, password } = formData;
  return await handleRequest(
    { url: "/api/v1/login", method: "POST", data: { email, password } },
    UserSchema
  );
};

export const signUp = async (formData: SignUpSchema) => {
  const { name, email, password } = formData;
  return await handleRequest(
    { url: "/api/v1/signup", method: "POST", data: { name, email, password } },
    UserSchema
  );
};

export const updateFavorites = async (id: number, action: string) => {
  return await handleRequest(
    {
      url: `/api/v1/updateFavorites/${action}`,
      method: "PATCH",
      data: { favorite: id.toString() },
    },
    UserSchema
  );
};

export const logout = async () => {
  return await handleRequest({ url: "/api/v1/logout" }, UserSchema);
};

const handleRequest = async <ResponseType>(
  config: AxiosRequestConfig,
  schema: ZodSchema<ResponseType>
) => {
  try {
    const res = await pfaClient(config);
    return schema.parse(res.data);
  } catch (err) {
    console.log(err);
    throw err;
  }
};
